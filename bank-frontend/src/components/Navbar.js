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
    console.log('Called')
    const pw = prompt("Enter your password to delete your account:");
    if (!pw) return

    try {
      const response = await axios.delete("/closeacc", {
        data: { password: pw },withCredentials:true,
      });

      if (response.status === 200) {
        alert("Sorry to see you go :/");
        navigate("/");
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to delete account. Try again."
      );
    }
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
