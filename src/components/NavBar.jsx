import { Link } from "react-router-dom";
import "../css/Navbar.css"

function NavBar() {
    return <nav className="my-navbar">
        <div className="my-navbar-brand">
            <Link to="/">Recipe App</Link>
        </div>
        <div className="my-navbar-links">
            <Link to="/" className="my-nav-link">Home</Link>
            <Link to="/favorites" className="my-nav-link">Favorites</Link>
            <Link to="/profile" className="my-nav-link">My Recipes</Link>
        </div>
    </nav>
}

export default NavBar