import "./css/App.css"; 
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { RecipeProvider } from "./contexts/FavouriteContext";
import NavBar from "./components/NavBar";
import RecipeDetail from './pages/RecipeDetail'; 
import AuthPage from "./pages/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import RecipeForm from "./pages/RecipeForm";
import { MyRecipesProvider } from "./contexts/MyRecipesContext";
import MyRecipes from "./pages/MyRecipes";

function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
      <MyRecipesProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
            <Route path="/add" element={<PrivateRoute><RecipeForm /></PrivateRoute>} />
            <Route path="/update/:id" element={<PrivateRoute><RecipeForm /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><MyRecipes /></PrivateRoute>} />
            <Route path="/login" element={<AuthRedirect />}/>
            <Route path="/recipe/:id" element={<PrivateRoute><RecipeDetail /></PrivateRoute>} />

          </Routes>
        </main>
        </MyRecipesProvider>
      </RecipeProvider>
    </AuthProvider>
  );
}

// AuthRedirect component to redirect if the user is already logged in
function AuthRedirect() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }
  // If not logged in, show the login page
  return <AuthPage />;
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
