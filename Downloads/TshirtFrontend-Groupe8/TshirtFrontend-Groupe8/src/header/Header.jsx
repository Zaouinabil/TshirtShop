import { Link, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/categories")
      .then(response => {
        const allCategories = [{ id: "all", nom: "Accueil" }, ...response.data];
        setCategories(allCategories);
      })
      .catch(error => console.error("Erreur chargement catégories:", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("utilisateur");
    navigate("/login");
  };

  return (
    <header className="bg-green-700 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          TshirtShop <span className="text-3xl">👕</span>
        </Link>

        {/* NAV LINKS */}
        <nav className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <NavLink
              key={cat.id}
              to={cat.id === "all" ? "/" : `/categorie/${cat.id}`}
              className={({ isActive }) =>
                isActive ? "active-link" : "hover:text-green-300 transition"
              }
            >
              {cat.nom}
            </NavLink>
          ))}
        </nav>

        {/* UTILISATEUR + PANIER */}
        <div className="flex items-center gap-4 text-sm">
          <Link to="/panier" className="relative hover:text-green-300">
            🛒
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
          </Link>

          {utilisateur ? (
            <>
              <span className="text-green-200">👋 Bonjour, {utilisateur.nom}</span>
              <Link to="/profil" className="text-green-300 hover:underline">Profil</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-green-300 hover:underline">Connexion</Link>
              <Link to="/register" className="text-green-300 hover:underline">S'inscrire</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
