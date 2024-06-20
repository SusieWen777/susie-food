import "./Navbar.scss";
import { assets } from "../../assets/assets";
import { TbBasketFilled } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoBagCheck, IoLogOutOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

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
          {getTotalCartAmount() ? <div className="dot"></div> : null}
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <CgProfile className="profile-icon" />
            <ul className="nav-profile-dropdown">
              <li>
                <IoBagCheck className="dropdown-icon" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <IoLogOutOutline className="dropdown-icon" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
