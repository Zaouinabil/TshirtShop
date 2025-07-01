import React, { useState } from "react";
import "./ChangerMotDePasse.css";

function ChangerMotDePasse() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [ancienMotDePasse, setAncien] = useState("");
  const [nouveauMotDePasse, setNouveau] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nouveauMotDePasse !== confirmation) {
      setMessage("❌ La confirmation ne correspond pas.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/utilisateurs/${user.id}/changerMotDePasse`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ancienMotDePasse, nouveauMotDePasse }),
      });

      if (res.ok) {
        setMessage("✅ Mot de passe changé avec succès !");
        setAncien("");
        setNouveau("");
        setConfirmation("");
      } else {
        const msg = await res.text();
        setMessage(`❌ ${msg}`);
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      setMessage("❌ Problème de connexion avec le serveur.");
    }
  };

  return (
    <div className="changer-mdp-container">
      <h2>Changer le mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Ancien mot de passe"
          required
          value={ancienMotDePasse}
          onChange={(e) => setAncien(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          required
          value={nouveauMotDePasse}
          onChange={(e) => setNouveau(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmer le nouveau mot de passe"
          required
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
        />
        <button type="submit">Valider</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default ChangerMotDePasse;
