import "./css/App.css"; 
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { RecipeProvider } from "./contexts/FavouriteContext";
import NavBar from "./components/NavBar";
import RecipeDetail from './pages/RecipeDetail'; 
import AuthPage from "./pages/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/recipe/:id" element={<PrivateRoute><RecipeDetail /></PrivateRoute>} />
          </Routes>
        </main>
      </RecipeProvider>
    </AuthProvider>
  );
}

// PrivateRoute component to protect routes
function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />;
  }
  return children; // If authenticated, render the children
}

export default App;
