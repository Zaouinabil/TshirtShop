import React, { useState, useEffect } from "react";
import "./Profil.css";

function Profil() {
  const [storedUser, setStoredUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    adresse: "",
    codePostal: "",
    ville: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (storedUser) {
      setForm({
        nom: storedUser.nom || "",
        prenom: storedUser.prenom || "",
        email: storedUser.email || "",
        motDePasse: storedUser.motDePasse || "",
        adresse: storedUser.adresse || "",
        codePostal: storedUser.codePostal || "",
        ville: storedUser.ville || "",
      });
    }
  }, [storedUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAnnuler = () => {
    setForm({ ...storedUser });
    setMessage("⛔ Modifications annulées.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storedUser?.id) {
      setMessage("❌ ID utilisateur manquant.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/utilisateurs/${storedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const updated = await res.json();
        localStorage.setItem("user", JSON.stringify(updated));
        setStoredUser(updated);
        setMessage("✅ Profil mis à jour !");
        window.dispatchEvent(new Event("userUpdated"));
      } else {
        const errorText = await res.text();
        console.error("Erreur serveur:", errorText);
        setMessage("❌ Erreur lors de la mise à jour.");
      }
    } catch (err) {
      setMessage("❌ Erreur réseau.");
      console.error(err);
    }
  };

  return (
    <div className="profil-container">
      <h2>Mon Profil</h2>
      <form onSubmit={handleSubmit}>
        <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" required />
        <input name="prenom" value={form.prenom} onChange={handleChange} placeholder="Prénom" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="adresse" value={form.adresse} onChange={handleChange} placeholder="Adresse" required />
        <input name="codePostal" value={form.codePostal} onChange={handleChange} placeholder="Code Postal" required />
        <input name="ville" value={form.ville} onChange={handleChange} placeholder="Ville" required />

        <button type="submit">Enregistrer</button>
        <button type="button" onClick={handleAnnuler}>Annuler</button>
      </form>

      {message && <p className="message">{message}</p>}

      <div className="changer-mdp-section">
        🔐 <a href="/changer-mot-de-passe">Changer mon mot de passe</a>
      </div>
    </div>
  );
}

export default Profil;
