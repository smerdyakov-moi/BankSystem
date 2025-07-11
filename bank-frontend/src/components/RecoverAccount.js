import { useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

import '../styles/register.css'

export default function Recover() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/recoveracc", { email, password });
      alert(res.data || "Account successfully recovered");
      navigate("/login");
    } catch (err) {
      alert("Recovery failed");
    }
  };
  
  return (
    <form onSubmit ={handleSubmit} className="register-form">
        <h2>Recover</h2>
        <input placeholder = "Email" value ={email} onChange={e=>setEmail(e.target.value)}/>
        <input placeholder= "Password" type = "password" value ={password} onChange={e=>setPassword(e.target.value)}/>
        <button type ="submit">Recover Acc</button>
    </form>
  )
}
