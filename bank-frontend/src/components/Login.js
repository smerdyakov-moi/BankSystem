import { useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const res = await axios.post('/login', { email, password })
    console.log("LOGIN SUCCESS:", res)
    alert('Login successful')
    navigate('/dashboard')
  } catch (err) {
    console.error("LOGIN ERROR:", err?.response?.data || err.message)
    alert('Login failed: ' + (err?.response?.data || err.message))
  }
}

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
