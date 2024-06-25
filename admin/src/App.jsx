import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Login from "./pages/Login/Login";
import { Navigate } from "react-router-dom";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        {token && <Sidebar />}
        <Routes>
          {token ? (
            <>
              <Route path="/add" element={<Add />} />
              <Route path="/list" element={<List />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="*" element={<Navigate replace to="/list" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
