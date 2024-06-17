import "./Navbar.scss";
import { assets } from "../../assets/assets";
import { TbBasketFilled } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <div className="navbar-menu">
        <Link
          to={"/"}
          className={menu === "home" ? "active" : ""}
          onClick={() => setMenu("home")}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          className={menu === "menu" ? "active" : ""}
          onClick={() => setMenu("menu")}
        >
          Menu
        </a>
        <a
          href="#app-download"
          className={menu === "mobile-app" ? "active" : ""}
          onClick={() => setMenu("mobile-app")}
        >
          App
        </a>
        <a
          href="#footer"
          className={menu === "contact-us" ? "active" : ""}
          onClick={() => setMenu("contact-us")}
        >
          Contact
        </a>
      </div>
      <div className="navbar-right">
        <FiSearch className="search-icon" color="#49557e" />
        <div className="navbar-basket-icon">
          <Link to="/cart">
            <TbBasketFilled className="basket-icon" color="#49557e" />
          </Link>
          <div className="dot"></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  );
}

export default Navbar;
