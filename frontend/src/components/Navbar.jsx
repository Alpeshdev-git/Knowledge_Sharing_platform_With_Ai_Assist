import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../css/navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // add navigate

  const handleLogout = () => {
    logout();         // clear user/token
    navigate("/");    // redirect to Home page
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/create">Create</Link>
            <Link to="/dashboard">Dashboard</Link>
            {/* <Link to="/ai-summary">AI Summarizer</Link>
            <Link to="/ai-improve">AI Improve</Link> */}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;