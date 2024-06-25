import { AuthContext } from "../../contexts/AuthContext";
import "./Login.scss";
import { useContext, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { setToken } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/admin/login", data);
      if (response.data.success) {
        toast.success("You have logged in successfully!");
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
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
    <div className="login">
      <div className="title">
        <h1>Welcome to the Admin Panel of Tomato</h1>
        <p>You can manage the menu and orders here.</p>
        <p>Please login first.</p>
      </div>

      <form onSubmit={onSubmitHandler}>
        <h2>Login</h2>
        <div className="inputs">
          <input
            onChange={onChangeHandler}
            type="email"
            id="email"
            name="email"
            value={data.email}
            placeholder="Your email"
            required
          />
          <div className="password-wrapper">
            <input
              onChange={onChangeHandler}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="password"
              value={data.password}
              name="password"
              required
            />
            {showPassword ? (
              <FaEyeSlash className="pwd-icon" onClick={toggleShowPassword} />
            ) : (
              <FaEye className="pwd-icon" onClick={toggleShowPassword} />
            )}
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
