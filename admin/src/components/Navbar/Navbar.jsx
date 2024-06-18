import "./Navbar.scss";
import { assets } from "../../assets/assets";
import { RxAvatar } from "react-icons/rx";

function Navbar() {
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      <RxAvatar className="profile" />
    </div>
  );
}

export default Navbar;
