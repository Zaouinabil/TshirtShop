import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const isEditMode = Boolean(id);

  const [produit, setProduit] = useState({
    nom: "",
    marque: "",
    prix: "",
    imageUrl: "",
    categorieId: "",
    description: ""
  });

  const [success, setSuccess] = useState("");

  // ✅ Charger produit existant si en mode édition
  useEffect(() => {
    if (isEditMode) {
      fetch(`http://localhost:8080/api/produits/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduit({
            nom: data.nom,
            marque: data.marque,
            prix: data.prix,
            imageUrl: data.imageUrl,
            categorieId: data.categorie.id,
            description: data.description || ""
          });
        })
        .catch((err) => console.error(err));
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduit((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = isEditMode
      ? `http://localhost:8080/api/produits/${id}`
      : "http://localhost:8080/api/produits";

    const method = isEditMode ? "PUT" : "POST";

    const body = isEditMode
      ? {
          utilisateurId: user.id,
          produit: {
            ...produit,
            categorie: { id: produit.categorieId }
          }
        }
      : {
          nom: produit.nom,
          marque: produit.marque,
          prix: produit.prix,
          imageUrl: produit.imageUrl,
          description: produit.description,
          categorieId: produit.categorieId,
          utilisateurId: user.id
        };

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de l'envoi");
        return res.json();
      })
      .then((data) => {
        setSuccess(
          isEditMode
            ? "✅ Produit modifié avec succès !"
            : "✅ Produit ajouté avec succès !"
        );
        setTimeout(() => {
          setSuccess("");
          navigate(isEditMode ? `/produit/${id}` : `/produit/${data.id}`);
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur ! Vérifie tes données.");
      });
  };

  const handleDelete = () => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      fetch(`http://localhost:8080/api/produits/${id}?utilisateurId=${user.id}`, {
        method: "DELETE"
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erreur lors de la suppression");
          alert("✅ Produit supprimé avec succès !");
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
          alert("Erreur lors de la suppression.");
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isEditMode ? "Modifier le produit" : "Ajouter un nouveau produit"}</h2>

      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nom</label>
          <input
            type="text"
            name="nom"
            value={produit.nom}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Marque</label>
          <input
            type="text"
            name="marque"
            value={produit.marque}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Prix</label>
          <input
            type="number"
            name="prix"
            value={produit.prix}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={produit.imageUrl}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>ID Catégorie</label>
          <input
            type="number"
            name="categorieId"
            value={produit.categorieId}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            value={produit.description}
            onChange={handleChange}
            className="form-control"
            rows="4"
          />
        </div>

        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary">
            {isEditMode ? "Modifier" : "Ajouter"}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              navigate(isEditMode ? `/produit/${id}` : "/")
            }
          >
            Annuler
          </button>

          {isEditMode && user?.role === "ADMIN" && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Supprimer
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
