import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Bank System</h1>
      <p>Welcome to the secure bank system</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}
