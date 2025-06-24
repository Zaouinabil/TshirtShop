// ProduitList.jsx
import "./ProduitList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ProduitList() {
  const { id } = useParams();
  const [produits, setProduits] = useState([]);
  const [currentCategoryName, setCurrentCategoryName] =
    useState("Nos T-Shirts");

  useEffect(() => {
    const url =
      id && id !== "all"
        ? `http://localhost:8080/api/produits/categorie/${id}`
        : "http://localhost:8080/api/produits";

    if (id && id !== "all") {
      axios
        .get(`http://localhost:8080/api/categories/${id}`)
        .then((res) => setCurrentCategoryName(res.data.nom))
        .catch(() => setCurrentCategoryName("Catégorie inconnue"));
    } else {
      setCurrentCategoryName("Nos T-Shirts");
    }

    axios
      .get(url)
      .then((res) => setProduits(res.data))
      .catch(() => setProduits([]));
  }, [id]);

  return (
    <div className="produits-container">
      <h2 className="produits-title">{currentCategoryName}</h2>

      <div className="produits-grid">
        {produits.map((prod) => (
          <Link
            key={prod.id}
            to={`/produit/${prod.id}`}
            className="product-card"
          >
            <img
              src={prod.image}
              alt={prod.nom}
              className="w-full h-48 object-contain bg-white rounded"
            />
            <h4>{prod.nom}</h4>
            <p className="brand">{prod.marque}</p>
            <p className="price">{prod.prix} €</p>
            <button>Ajouter au panier</button>
          </Link>
        ))}
      </div>

      {id && id !== "all" && (
        <div className="text-center mt-10">
          <Link
            to="/"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-full transition"
          >
            ⬅️ Retour à l'accueil
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProduitList;
