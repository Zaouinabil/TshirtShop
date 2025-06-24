import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    adresse: "",
    codePostal: "",
    ville: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/auth/register", form)
      .then(() => {
        setMessage("Compte créé avec succès !");
        navigate("/login");
      })
      .catch(() => setMessage("Erreur lors de l'inscription. le compte  exist déja."));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Créer un compte</h2>
      {message && <p className="mb-3 text-sm text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="nom" placeholder="Nom" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="password" name="motDePasse" placeholder="Mot de passe" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="adresse" placeholder="adresse" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="codePostal" placeholder="codePostal" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="ville" placeholder="ville" onChange={handleChange} className="w-full p-2 border rounded" required />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;
