import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Make sure you are importing the useAuth hook
import "../css/Navbar.css";

function NavBar() {
  const { user } = useAuth(); // Get the user from context

  return (
    <nav className="my-navbar">
      <div className="my-navbar-brand">
        <Link to="/">Recipe App</Link>
      </div>
      <div className="my-navbar-links">
        {user && <Link to="/" className="my-nav-link">Home</Link>}
        {user && <Link to="/favorites" className="my-nav-link">Favorites</Link>}
        {user && <Link to="/profile" className="my-nav-link">{JSON.parse(localStorage.getItem("user")).username}'s Recipes</Link>}
      </div>
    </nav>
  );
}

export default NavBar;
