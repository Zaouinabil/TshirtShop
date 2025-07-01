import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  // Initialise les champs de saisie et l’état d’erreur
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fonction déclenchée lors de la soumission du formulaire de connexion
  // Elle envoie une requête POST au backend avec les identifiants
  // Si la connexion réussit, l'utilisateur est redirigé vers l’accueil
  // Sinon, un message d’erreur s’affiche
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/utilisateurs/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, motDePasse }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
        window.location.reload();
      } else {
        setError("Identifiants incorrects");
      }
    } catch (err) {
      console.error("Erreur serveur :", err);
      setError("Erreur de connexion au serveur");
    }
  };

  // Affiche le formulaire de connexion avec champs, bouton et message d’erreur
  // Inclut aussi un lien vers la page d’inscription
  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          required
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Se connecter</button>

        {/* Lien vers la page d’inscription */}
        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          Pas de compte ?{" "}
          <Link to="/register" style={{ fontWeight: "bold", color: "seagreen" }}>
            Inscrivez-vous
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
