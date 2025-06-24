import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Profil() {
  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
  const [message, setMessage] = useState("");

  // On ne stocke plus l’intégralité du form en state, juste le message
  // et on utilise les inputs en mode “uncontrolled” via ref HTML.
  const formRef = {};

  // Lors du submit, on lit directement les valeurs du DOM
  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      nom: e.target.nom.value,
      prenom: e.target.prenom.value,
      adresse: e.target.adresse.value,
      ville: e.target.ville.value,
      codePostal: e.target.codePostal.value,
      email: e.target.email.value,
      motDePasse: e.target.motDePasse.value,
    };

    axios
      .put(`http://localhost:8080/api/auth/utilisateurs/${utilisateur.id}`, updated)
      .then((res) => {
        localStorage.setItem("utilisateur", JSON.stringify(res.data));
        setMessage("Informations mises à jour !");
      })
      .catch(() => setMessage("Erreur lors de la mise à jour."));
  };

  if (!utilisateur) {
    return <p className="text-center mt-10 text-red-500">Connectez-vous d'abord.</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Mon profil</h2>

      {message && (
        <p className="text-center text-green-600 font-medium mb-4">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Fields “uncontrolled” with defaultValue */}
        <input
          name="nom"
          defaultValue={utilisateur.nom}
          placeholder="Nom"
          className="w-full p-2 border rounded bg-white text-black"
        />
        <input
          name="prenom"
          defaultValue={utilisateur.prenom}
          placeholder="Prénom"
          className="w-full p-2 border rounded bg-white text-black"
        />

        <input
          name="adresse"
          defaultValue={utilisateur.adresse ?? ""}
          placeholder="Adresse"
          className="w-full p-2 border rounded bg-white text-black"
        />

        <div className="flex gap-4">
          <input
            name="ville"
            defaultValue={utilisateur.ville ?? ""}
            placeholder="Ville"
            className="flex-1 p-2 border rounded bg-white text-black"
          />
          <input
            name="codePostal"
            defaultValue={utilisateur.codePostal ?? ""}
            placeholder="Code postal"
            className="w-32 p-2 border rounded bg-white text-black"
          />
        </div>

        <input
          name="email"
          type="email"
          defaultValue={utilisateur.email}
          placeholder="Adresse e-mail"
          className="w-full p-2 border rounded bg-white text-black"
        />
        <input
          name="motDePasse"
          type="password"
          defaultValue={utilisateur.motDePasse}
          placeholder="Mot de passe"
          className="w-full p-2 border rounded bg-white text-black"
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold transition"
        >
          Mettre à jour
        </button>
      </form>

      <Link
        to="/"
        className="block text-center mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        ← Retour aux catégories
      </Link>
    </div>
  );
}

export default Profil;
