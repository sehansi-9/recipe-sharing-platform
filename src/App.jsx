import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { RecipeProvider } from "./contexts/RecipeContext";
import NavBar from "./components/NavBar";
import RecipeDetail from './pages/RecipeDetail'; 
import AuthPage from "./pages/Login";

function App() {
  return (
    <RecipeProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </main>
    </RecipeProvider>
  );
}

export default App;
