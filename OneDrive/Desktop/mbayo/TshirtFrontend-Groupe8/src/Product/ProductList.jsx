import useSWR from "swr";
import { Link } from "react-router-dom";
import "./Accueil.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

function ProductList({ categorieId }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const shouldFetch = categorieId !== null && categorieId !== undefined;

  const { data, error, isLoading } = useSWR(
    shouldFetch
      ? `http://localhost:8080/api/produits/categorie/${categorieId}`
      : null,
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

  if (!shouldFetch) return null;
  if (isLoading) return <p className="text-center">Chargement des produits...</p>;
  if (error) return <p className="text-danger text-center">Erreur lors du chargement des produits</p>;
  if (data.length === 0) return <p className="text-center">Aucun produit dans cette catégorie</p>;

  return (
    <div className="row mt-4">
      {data.map((produit) => (
        <div key={produit.id} className="col-md-3 mb-4">
          <div className="produit-card h-100">
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
      ))}
    </div>
  );
}

export default ProductList;
