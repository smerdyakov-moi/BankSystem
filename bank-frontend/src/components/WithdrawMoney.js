import { useState } from "react";
import axios from "../api/axiosConfig";

export default function WithdrawMoney() {
  const [balance, setBalance] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/withdrawmoney", { balance });
      alert(res.data);
    } catch (err) {
      alert("Failed to withdraw");
    }
  };

  return (
    <form onSubmit={handleWithdraw}>
      <h2>Withdraw</h2>
      <input
        placeholder="Amount"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
      />
      <button type="submit">Withdraw</button>
    </form>
  );
}
