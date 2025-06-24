import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", motDePasse: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/auth/login", form)
      .then(res => {
        localStorage.setItem("utilisateur", JSON.stringify(res.data));
        navigate("/");
      })
      .catch(() => setError("Email ou mot de passe incorrect."));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Se connecter</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded bg-white text-black" required />
        <input type="password" name="motDePasse" placeholder="Mot de passe" onChange={handleChange} className="w-full p-2 border rounded bg-white text-black" required />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Connexion</button>
      </form>
    </div>
  );
}

export default Login;
