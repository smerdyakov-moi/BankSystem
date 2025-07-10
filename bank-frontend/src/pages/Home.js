import { Link } from "react-router-dom";

import './home.css'

export default function Home() {
  return (
    <div style={{ textAlign: "center" }} className="home-container" >
      <h1>Dhanalakshmi Bank</h1>
      <p>Where Trust reigns supreme</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}
