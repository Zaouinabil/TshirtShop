import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    adresse: '',
    codePostal: '',
    ville: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Réinitialiser le message d'erreur au changement de champ
  };

  // ✅ Fonction de validation frontend
  const validerFormulaire = () => {
    const { nom, prenom, email, motDePasse, adresse, codePostal, ville } = form;

    // Vérifie si tous les champs sont remplis
    if (!nom || !prenom || !email || !motDePasse || !adresse || !codePostal || !ville) {
      return "Veuillez remplir tous les champs.";
    }

    // Email simple validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Adresse email invalide.";
    }

    // Vérifie mot de passe
    if (motDePasse.length < 6) {
      return "Le mot de passe doit contenir au moins 6 caractères.";
    }

    return null; // Pas d'erreur
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const erreurValidation = validerFormulaire();
    if (erreurValidation) {
      setError(erreurValidation);
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/utilisateurs/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
      } else {
        const msg = await res.text();
        setError(msg || "Erreur lors de l'inscription.");
      }
    } catch (err) {
      setError("Erreur réseau. Veuillez réessayer.");
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="register-container">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
        <input type="text" name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="motDePasse" placeholder="Mot de passe" value={form.motDePasse} onChange={handleChange} required />
        <input type="text" name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange} required />
        <input type="text" name="codePostal" placeholder="Code Postal" value={form.codePostal} onChange={handleChange} required />
        <input type="text" name="ville" placeholder="Ville" value={form.ville} onChange={handleChange} required />

        {error && <p className="error">{error}</p>}

        <div className="register-buttons">
          <button type="submit" className="btn-blue">S'inscrire</button>
          <button type="button" onClick={handleCancel} className="btn-red">Annuler</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
