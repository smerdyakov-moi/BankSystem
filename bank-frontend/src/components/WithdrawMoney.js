import { useState } from "react";
import axios from "../api/axiosConfig";

import '../styles/transacs.css'
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function WithdrawMoney() {
  const [balance, setBalance] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/withdrawmoney", { balance });
      alert(res.data);
      setBalance('')
    } catch (err) {
      alert("Failed to withdraw");
    }
  };

  return (
    <>
      <Navbar/>
      <form onSubmit={handleWithdraw} className="transaction-form">
      <h2>Withdraw</h2>
      <input
        placeholder="Amount"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
      />
      <button type="submit">Withdraw</button>
    </form>
    <Footer/>
    </>
  );
}
