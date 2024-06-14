import "./Navbar.scss";
import { assets } from "../../assets/assets";
import { TbBasketFilled } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

function Navbar() {
  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-menu">
        <li
          className={menu === "home" ? "active" : ""}
          onClick={() => setMenu("home")}
        >
          HOME
        </li>
        <li
          className={menu === "menu" ? "active" : ""}
          onClick={() => setMenu("menu")}
        >
          MENU
        </li>
        <li
          className={menu === "mobile-app" ? "active" : ""}
          onClick={() => setMenu("mobile-app")}
        >
          MOBILE-APP
        </li>
        <li
          className={menu === "contact-us" ? "active" : ""}
          onClick={() => setMenu("contact-us")}
        >
          CONTACT US
        </li>
      </ul>
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="" /> */}
        <FiSearch size="30px" color="#49557e" />
        <div className="navbar-basket-icon">
          <TbBasketFilled size="34px" color="#49557e" />
          {/* <img src={assets.basket_icon} alt="" /> */}
          <div className="dot"></div>
        </div>
        <button>SIGN IN</button>
      </div>
    </div>
  );
}

export default Navbar;
