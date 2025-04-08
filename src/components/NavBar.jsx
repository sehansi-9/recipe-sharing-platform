import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Ensure the useAuth hook is properly imported
import "../css/Navbar.css";

function NavBar() {
  const { user, logout } = useAuth(); // Get the user and logout function from context

  return (
    <nav className="my-navbar">
      <div className="my-navbar-brand">
        <Link to="/">Recipe Hub</Link>
      </div>
      <div className="my-navbar-links">
        {user && <Link to="/" className="my-nav-link">Home</Link>}
        {user && <Link to="/favorites" className="my-nav-link">Favorites</Link>}
        {user && <Link to="/profile" className="my-nav-link">{JSON.parse(localStorage.getItem("user")).username}'s Recipes</Link>}
        {user && (
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
