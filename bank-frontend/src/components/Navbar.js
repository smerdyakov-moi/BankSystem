import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await axios.get("/logout");
    navigate("/");
  };

  const deleteAcc = async () => {
    await axios.delete("/closeacc");
    alert("Sorry to see you go :/");
    navigate("/");
  };

  return (
    <nav>
      <Link to="/details">Details</Link> | <Link to="/history">History</Link> |{" "}
      <Link to="/send">Send</Link> | <Link to="/deposit">Deposit</Link> |{" "}
      <Link to="/withdraw">Withdraw</Link> |{" "}
      <button onClick={logout}>Logout</button>
      <button onClick={deleteAcc}>Delete</button>
    </nav>
  );
}
