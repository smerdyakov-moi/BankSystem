import { useState } from "react";
import axios from "../api/axiosConfig";

import "../styles/transacs.css";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SendMoney() {
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/sendmoney", {
        accountNumber: Number(accountNumber),
        balance: Number(balance),
      });
      setBalance("");
      setAccountNumber("");
      alert(res.data);
    } catch (err) {
      alert("Transaction failed");
    }
  };

  return (
    <>
      <Navbar />

      <form onSubmit={handleSend} className="transaction-form">
        <h2>Send Money</h2>
        <input
          placeholder="Receiver Account #"
          type="number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <input
          placeholder="Amount"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <Footer />
    </>
  );
}
