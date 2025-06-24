import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoriesList from "./product/CategoriesList";
import ProduitDetails from "./product/ProduitDetails";
import ProduitList from "./product/ProduitList"; 
import Register from "./auth/Register";
import Login from "./auth/Login";
import Profil from "./auth/Profil";
import Header from "./header/Header";
import Accueil from "./product/Accueil";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-4 w-full">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/categorie/:id" element={<ProduitList />} /> 
            <Route path="/produit/:id" element={<ProduitDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/categories" element={<CategoriesList />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

    
