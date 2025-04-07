import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { RecipeProvider } from "./contexts/RecipeContext";


function App() {
  return (
    <RecipeProvider>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </RecipeProvider>
  );
}

export default App;
