import "./ProduitDetails.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ProduitDetails() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/produits/${id}`)
      .then((res) => setProduit(res.data))
      .catch((err) => console.error("Erreur:", err));
  }, [id]);

  if (!produit) return <p>Chargement...</p>;

  return (
    <div className="product-details">
      <img
        src={produit.image}
        alt={produit.nom}
        className="w-full h-64 object-contain bg-white rounded mb-4"
      />

      <h2>{produit.nom}</h2>
      <p className="brand">Marque: {produit.marque}</p>
      <p className="price">{produit.prix} €</p>

      <Link to={`/categorie/${produit.categorie.id}`} className="retour">
        ← Retour à {produit.categorie.nom}
      </Link>
    </div>
  );
}

export default ProduitDetails;
