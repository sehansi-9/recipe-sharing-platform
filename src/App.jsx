import "./css/App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { RecipeProvider } from "./contexts/RecipeContext";


function App() {
  return (
    <RecipeProvider>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          
        </Routes>
      </main>
    </RecipeProvider>
  );
}

export default App;
