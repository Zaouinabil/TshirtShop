import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [panierCont, setPanierCont] = useState(0);

  useEffect(() => {
    const syncUser = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    const syncPanier = () => {
      const count = parseInt(localStorage.getItem("panierCont")) || 0;
      setPanierCont(count);
    };

    window.addEventListener("userUpdated", syncUser);
    window.addEventListener("storage", syncUser);
    window.addEventListener("storage", syncPanier);
    window.addEventListener("panierUpdated", syncPanier);

    syncPanier();

    return () => {
      window.removeEventListener("userUpdated", syncUser);
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("storage", syncPanier);
      window.removeEventListener("panierUpdated", syncPanier);
    };
  }, []);

  const handleLogout = () => {
    if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
      localStorage.removeItem("user");
      setUser(null);
      alert("Déconnexion réussie !");
      navigate("/");
    }
  };

  return (
    <header className="header">
      <div className="left-section">
        <img src="/logo.avif" alt="Logo" />
        <span className="site-name"><strong>T-Shirt Shop</strong></span>
        {user && <span>Bienvenue, {user.prenom} 👋</span>}
      </div>

      <div>
        <input type="text" placeholder="Rechercher..." />
      </div>

      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contact">Contact</Link>

        <div className="panier-icon">
          <Link to="/panier">🛒</Link>
          {panierCont > 0 && (
            <span className="panier-badge">{panierCont}</span>
          )}
        </div>

        {user ? (
          <>
            <Link to="/profil">Mon Profil</Link>
            <Link to="/mes-commandes">Mes Commandes</Link>
            <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">Créer un compte</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
