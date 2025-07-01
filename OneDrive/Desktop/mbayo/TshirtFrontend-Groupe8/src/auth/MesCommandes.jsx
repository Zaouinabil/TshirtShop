import React, { useEffect, useState } from "react";

function MesCommandes() {
  // Initialise le tableau des commandes et récupère l'ID de l'utilisateur depuis le localStorage
  const [commandes, setCommandes] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  // Utilise useEffect pour charger les commandes de l’utilisateur à son premier rendu
  // Envoie une requête GET à l’API pour récupérer ses anciennes commandes
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/api/commandes/utilisateur/${userId}`)
        .then((res) => res.json())
        .then((data) => setCommandes(data))
        .catch((err) => console.error("Erreur:", err));
    }
  }, []); // tableau vide => exécute le fetch uniquement une fois au chargement

  // Affiche la liste des commandes avec détails des produits (image, nom, quantité, prix total)
  // Si aucune commande, affiche un message informatif
  return (
    <div className="container mt-4">
      <h2 className="mb-4">📦 Mes Commandes</h2>

      {commandes.length === 0 ? (
        <p>Vous n'avez passé aucune commande pour le moment.</p>
      ) : (
        commandes.map((cmd) => (
          <div key={cmd.id} className="card mb-3">
            <div className="card-header">
              Commande #{cmd.id} – {new Date(cmd.dateCommande).toLocaleString()}
            </div>
            <ul className="list-group list-group-flush">
              {cmd.lignes.map((ligne, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between">
                  <img
                    src={ligne.imageUrl}
                    alt={ligne.nom}
                    className="img-thumbnail"
                    style={{ width: "80px" }}
                  />
                  <div>
                    <strong>{ligne.nomProduit}</strong> – {ligne.marque}
                  </div>
                  <div>
                    {ligne.quantite} × {ligne.prix} € ={" "}
                    <strong>{(ligne.prix * ligne.quantite).toFixed(2)} €</strong>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default MesCommandes;
