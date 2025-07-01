import useSWR from 'swr';
import { Link } from 'react-router-dom';
import './CategoriesList.css';

// Fonction pour récupérer les données depuis l’API
const fetcher = (url) => fetch(url).then((res) => res.json());

function CategoriesList() {
  // Utilise SWR pour récupérer la liste des catégories depuis l’API
  const { data, error, isLoading } = useSWR('http://localhost:8080/api/categories', fetcher);

  // Affiche un message de chargement tant que les données ne sont pas disponibles
  if (isLoading) return <p className="text-center">Chargement des catégories...</p>;

  // Affiche un message d'erreur en cas de problème avec la requête
  if (error) return <p className="text-center text-danger">Erreur lors du chargement</p>;

  return (
    <div className="categories-wrapper">
      {/* Lien vers toutes les catégories (affiche tous les produits) */}
      <div className="categorie-btn">
        <Link to="/" className="btn btn-secondary w-100">
          Toutes les catégories
        </Link>
      </div>

      {/* Affiche chaque catégorie comme une carte cliquable avec image et nom */}
      {data.map((cat) => (
        <div key={cat.id} className="categorie-item">
          <Link to={`/categorie/${cat.id}`} className="text-decoration-none">
            <div className="card categorie-card h-100 text-center" style={{ cursor: 'pointer' }}>
              {cat.imageUrl && (
                <img
                  src={cat.imageUrl}
                  alt={cat.nom}
                  className="categorie-image card-img-top"
                />
              )}
              <div className="card-body p-2">
                <h6 className="card-title m-0">{cat.nom}</h6>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CategoriesList;
