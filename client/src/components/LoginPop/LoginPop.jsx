import { useState } from "react";
import "./LoginPop.scss";
import { MdCancel } from "react-icons/md";

function LoginPop({ setShowLogin }) {
  const [currState, setCurrState] = useState("Login");
  return (
    <div className="login-pop">
      <form action="" className="login-pop-container">
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
            <input type="text" placeholder="Your name" required />
          )}
          <input type="email" placeholder="Your email" required />
          <input type="password" placeholder="Password" required />
        </div>
        <button>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
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
