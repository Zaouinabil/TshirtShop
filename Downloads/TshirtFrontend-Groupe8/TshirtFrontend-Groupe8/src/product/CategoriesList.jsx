import "./CategoriesList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";

function CategoriesList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Erreur:", err));
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 my-6">
      {/* Catégories en haut */}
      <div className="categories-container">
        {categories.map(cat => (
  <div key={cat.id} className="category-card">
    <NavLink
      to={`/categorie/${cat.id}`}
      className={({ isActive }) => isActive ? "active-link" : "category-link"}
    >
      <img
        src={`/${cat.image}`}
        alt={cat.nom}
        className="category-image"
      />
      <p>{cat.nom}</p>
    </NavLink>
  </div>
))}
      </div>

      {/* Retour en bas */}
      <Link to="/" className="back-home-btn">↩ Retour à l'accueil</Link>
    </div>
  );
}

export default CategoriesList;


