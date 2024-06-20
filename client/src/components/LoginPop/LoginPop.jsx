import { useContext, useState } from "react";
import "./LoginPop.scss";
import { MdCancel } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

function LoginPop({ setShowLogin }) {
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { setToken } = useContext(StoreContext);

  const onChangeHandler = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let url =
      currState === "Sign Up" ? "/api/user/register" : "/api/user/login";
    let message =
      currState === "Sign Up"
        ? "You have signed up successfully! Please login in to continue"
        : "You have logged in successfully!";
    try {
      const response = await axiosInstance.post(url, data);
      if (response.data.success) {
        toast.success(message);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div className="login-pop">
      <form onSubmit={onSubmitHandler} className="login-pop-container">
        <div className="login-pop-title">
          <h2>{currState}</h2>
          <MdCancel
            size="26px"
            color="tomato"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-pop-input">
          {currState === "Sign Up" && (
            <input
              onChange={onChangeHandler}
              value={data.name}
              name="name"
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            onChange={onChangeHandler}
            value={data.email}
            name="email"
            type="email"
            placeholder="Your email"
            required
          />
          <input
            onChange={onChangeHandler}
            name="password"
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-pop-condition">
          <input type="checkbox" required />
          <p>By continue, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here.</span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here.</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPop;
