import "./Navbar.scss";
import { IoLogOut } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const { token, setToken } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    // window.location.reload();
  };

  return (
    <div className="navbar">
      <img className="logo" src="/logo.png" alt="" />
      {token ? (
        <IoLogOut onClick={handleLogout} className="logout-icon" />
      ) : null}
    </div>
  );
}

export default Navbar;
