// src/product/Accueil.jsx
import "./Accueil.css";
import { Link } from "react-router-dom";

function Accueil() {
  return (
    <div className="accueil-wrapper">
      <div className="accueil-box">
        <h1>
          Bienvenue sur <span className="text-green-600 font-bold">TshirtShop 👕</span>
        </h1>
        <p>Découvrez notre sélection de t-shirts tendance pour tous les styles.</p>
        <Link to="/categories" className="cta-btn">
          Voir les Categories
        </Link>
      </div>
    </div>
  );
}

export default Accueil;
