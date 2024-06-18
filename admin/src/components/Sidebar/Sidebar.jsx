import "./Sidebar.scss";
import { IoAddCircleOutline, IoListCircleOutline } from "react-icons/io5";
import { GoChecklist } from "react-icons/go";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="./add" className="sidebar-option">
          <IoAddCircleOutline className="icon" />
          <p>Add items</p>
        </NavLink>
        <NavLink to="./list" className="sidebar-option">
          <IoListCircleOutline className="icon" />
          <p>List items</p>
        </NavLink>
        <NavLink to="./orders" className="sidebar-option">
          <GoChecklist className="icon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
