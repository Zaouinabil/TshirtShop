import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Panier.css";

function Panier() {
  // État local pour stocker le contenu du panier
  const [panier, setPanier] = useState([]);

  // Au chargement : récupère le panier depuis localStorage et met à jour le compteur
  useEffect(() => {
    const storedPanier = JSON.parse(localStorage.getItem("panier")) || [];
    setPanier(storedPanier);
    localStorage.setItem("panierCont", storedPanier.length);
    window.dispatchEvent(new Event("panierUpdated"));
  }, []);

  // Calcule le total global du panier
  const total = panier.reduce(
    (acc, produit) => acc + produit.prix * produit.quantite,
    0
  );

  // Modifie la quantité d’un produit (+1 ou -1)
  // Si la quantité atteint 0, le produit est supprimé
  const modifierQuantite = (index, delta) => {
    const updated = [...panier];
    updated[index].quantite += delta;

    if (updated[index].quantite <= 0) {
      updated.splice(index, 1);
    }

    setPanier(updated);
    localStorage.setItem("panier", JSON.stringify(updated));
    localStorage.setItem("panierCont", updated.length);
    window.dispatchEvent(new Event("panierUpdated"));
  };

  // Supprime un produit du panier par son index
  const supprimerProduit = (index) => {
    const updated = [...panier];
    updated.splice(index, 1);
    setPanier(updated);
    localStorage.setItem("panier", JSON.stringify(updated));
    localStorage.setItem("panierCont", updated.length);
    window.dispatchEvent(new Event("panierUpdated"));
  };

  // Vide tout le panier après confirmation
  const viderPanier = () => {
    if (window.confirm("Voulez-vous vraiment vider le panier ?")) {
      localStorage.removeItem("panier");
      localStorage.setItem("panierCont", "0");
      setPanier([]);
      window.dispatchEvent(new Event("panierUpdated"));
    }
  };

  // Affiche le contenu du panier ou un message s'il est vide
  return (
    <div className="container mt-4">
      <h2 className="titre-panier">🛒 Mon Panier</h2>
      {panier.length === 0 ? (
        <p className="texte-vide">Votre panier est vide.</p>
      ) : (
        <>
          {/* Tableau listant les produits ajoutés */}
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Produit</th>
                  <th>Marque</th>
                  <th>Quantité</th>
                  <th>Prix Unitaire</th>
                  <th>Total</th>
                  <th>🗑️</th>
                </tr>
              </thead>
              <tbody>
                {panier.map((produit, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={produit.imageUrl}
                        alt={produit.nom}
                        className="img-thumbnail"
                        style={{ width: "80px" }}
                      />
                    </td>
                    <td>
                      <Link to={`/produit/${produit.id}`}>{produit.nom}</Link>
                    </td>
                    <td>{produit.marque}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary me-1"
                        onClick={() => modifierQuantite(index, -1)}
                        disabled={produit.quantite === 1}
                      >
                        -
                      </button>
                      {produit.quantite}
                      <button
                        className="btn btn-sm btn-outline-secondary ms-1"
                        onClick={() => modifierQuantite(index, 1)}
                      >
                        +
                      </button>
                    </td>
                    <td>{produit.prix} €</td>
                    <td>{(produit.prix * produit.quantite).toFixed(2)} €</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => supprimerProduit(index)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="5" className="text-end fw-bold">
                    Total :
                  </td>
                  <td className="fw-bold">{total.toFixed(2)} €</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Bouton pour vider le panier */}
          <button className="btn btn-danger mt-3 me-2" onClick={viderPanier}>
            🗑️ Vider le panier
          </button>

          {/* Bouton pour passer commande */}
          <button
            className="btn btn-success mt-3"
            onClick={async () => {
              const user = JSON.parse(localStorage.getItem("user"));
              if (!user) {
                alert("Vous devez être connecté pour passer commande.");
                return;
              }

              if (panier.length === 0) {
                alert("Votre panier est vide.");
                return;
              }

              // Prépare les données de la commande à envoyer au backend
              const commande = {
                utilisateur: { id: user.id },
                lignes: panier.map((p) => ({
                  produitId: p.id,
                  nomProduit: p.nom,
                  imageUrl: p.imageUrl,
                  marque: p.marque,
                  prix: p.prix,
                  quantite: p.quantite,
                })),
              };

              // Envoie la commande à l’API
              try {
                const res = await fetch("http://localhost:8080/api/commandes", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(commande),
                });

                if (res.ok) {
                  alert("Commande passée avec succès !");
                  setPanier([]);
                  localStorage.removeItem("panier");
                  localStorage.setItem("panierCont", "0");
                  window.dispatchEvent(new Event("panierUpdated"));
                } else {
                  alert("Erreur lors de la commande.");
                }
              } catch (err) {
                alert("Erreur réseau : " + err.message);
              }
            }}
          >
            ✅ Passer la commande
          </button>
        </>
      )}

      {/* Lien pour revenir à la boutique */}
      <Link to="/" className="btn btn-secondary mt-3">
        ← Continuer les achats
      </Link>
    </div>
  );
}

export default Panier;
