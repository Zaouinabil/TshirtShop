import { useParams, Link } from "react-router-dom";
import useSWR from "swr";
import "./CategorieProduits.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

function CategorieProduits() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const { data, error, isLoading } = useSWR(
    `http://localhost:8080/api/produits/byCategorie/${id}`,
    fetcher
  );

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

  if (isLoading) return <p className="text-center">Chargement des produits...</p>;
  if (error) return <p className="text-danger text-center">Erreur de chargement</p>;

  return (
    <div className="container mt-4">
      <h2 className="titre-section text-center">
        Produits de la catégorie sélectionnée
      </h2>

      <div className="product-list">
        {data.length === 0 ? (
          <div className="no-product-wrapper">
            <p className="no-product-message">
              🛒 Aucun produit trouvé dans cette catégorie.
            </p>
          </div>
        ) : (
          data.map((produit) => (
            <div key={produit.id} className="product-item">
              <div className="produit-card">
                <Link
                  to={`/produit/${produit.id}`}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={produit.imageUrl}
                    className="produit-image"
                    alt={produit.nom}
                  />
                  <div className="mt-2">
                    <h5 className="fw-bold">{produit.nom}</h5>
                    <p className="text-muted mb-1">{produit.marque}</p>
                    <p className="text-success fw-semibold">{produit.prix} €</p>
                  </div>
                </Link>

                {user?.role !== "ADMIN" && (
                  <button
                    className="bouton-ajouter mt-2"
                    onClick={() => ajouterAuPanier(produit)}
                  >
                    Ajouter au panier
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 text-center">
        <Link to="/" className="btn btn-secondary">
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default CategorieProduits;
