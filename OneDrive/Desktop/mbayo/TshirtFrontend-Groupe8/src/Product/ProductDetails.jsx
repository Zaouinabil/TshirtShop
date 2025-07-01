import { useParams, Link } from "react-router-dom";
import useSWR from "swr";
import "./ProductDetails.css"; // ← fichier CSS spécifique à cette page

const fetcher = (url) => fetch(url).then((res) => res.json());

function ProductDetails() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const {
    data: produit,
    error,
    isLoading,
  } = useSWR(`http://localhost:8080/api/produits/${id}`, fetcher);

  if (isLoading) return <p className="text-center">Chargement du produit...</p>;
  if (error) return <p className="text-center text-danger">Erreur lors du chargement</p>;

  const ajouterAuPanier = (produit) => {
    if (!user) {
      alert("Veuillez vous connecter pour ajouter un produit au panier.");
      return;
    }

    const panierActuel = JSON.parse(localStorage.getItem("panier")) || [];
    const produitIndex = panierActuel.findIndex((p) => p.id === produit.id);

    if (produitIndex !== -1) {
      panierActuel[produitIndex].quantite += 1;
    } else {
      panierActuel.push({ ...produit, quantite: 1 });
    }

    localStorage.setItem("panier", JSON.stringify(panierActuel));
    alert("Produit ajouté au panier !");
  };

  return (
    <div className="container mt-5">
      <div className="product-details-container">
        {/* Partie gauche : image du produit */}
        <div className="product-image-section">
          <img src={produit.imageUrl} alt={produit.nom} className="product-image" />
        </div>

        {/* Partie droite : infos et actions */}
        <div className="product-info-section">
          <h2 className="mb-3">{produit.nom}</h2>
          <p><strong>Marque :</strong> {produit.marque}</p>
          <p>
            <strong>Prix :</strong>{" "}
            <span className="text-success fw-bold">{produit.prix} €</span>
          </p>
          <p><strong>Description :</strong> {produit.description}</p>

          {/* Boutons d’action */}
          <div className="action-buttons mt-4 d-flex flex-wrap gap-2">
            {/* ✅ Affiche bouton panier uniquement si ce n’est pas un admin */}
            {user?.role !== "ADMIN" && (
              <button className="btn btn-success" onClick={() => ajouterAuPanier(produit)}>
                🛒 Ajouter au panier
              </button>
            )}

            {/* ✅ Boutons visibles uniquement si ADMIN */}
            {user && user.role === "ADMIN" && (
              <>
                <Link to={`/produit/${produit.id}/edit`} className="btn btn-warning">
                  ✏️ Modifier
                </Link>
                <Link to="/produit/nouveau" className="btn btn-success">
                  ➕ Ajouter un produit
                </Link>
              </>
            )}
          </div>

          {/* Liens de navigation */}
          <div className="mt-4 d-flex gap-2 flex-wrap">
            <Link to="/" className="btn btn-secondary">
              ← Accueil
            </Link>

            {produit.categorie && (
              <Link to={`/categorie/${produit.categorie.id}`} className="btn btn-primary">
                ← Voir plus de {produit.categorie.nom}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
