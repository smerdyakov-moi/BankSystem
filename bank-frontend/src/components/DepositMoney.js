import { useState } from "react";
import axios from "../api/axiosConfig";

export default function DepositMoney() {
  const [balance, setBalance] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/depositmoney", { balance: Number(balance) });;
      alert(res.data);
    } catch (err) {
      alert("Failed to deposit");
    }
  };

  return (
    <form onSubmit={handleDeposit}>
      <h2>Deposit</h2>
      <input
        placeholder="Amount"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
      />
      <button type="submit">Deposit</button>
    </form>
  );
}
