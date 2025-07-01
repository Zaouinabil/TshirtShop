import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Accueil.css';
import CategoriesList from './CategoriesList';
import ProductList from './ProductList';

function Accueil() {
  const params = useParams();
  const urlCategorieId = params.id ? parseInt(params.id) : null;
  const [selectedCategorieId, setSelectedCategorieId] = useState(null);
  const [categorieName, setCategorieName] = useState('');

  const categorieId = urlCategorieId !== null ? urlCategorieId : selectedCategorieId;

  useEffect(() => {
    if (categorieId) {
      fetch(`http://localhost:8080/api/categories/${categorieId}`)
        .then(res => res.json())
        .then(data => {
          setCategorieName(data.nom);
        })
        .catch(() => {
          setCategorieName('');
        });
    } else {
      setCategorieName('');
    }
  }, [categorieId]);

  const handleCategorieClick = (id) => {
    setSelectedCategorieId(id);
  };

  return (
    <div className="container mt-4">
      <h2 className="titre-section">Nos Catégories</h2>
      <CategoriesList onClickCategorie={handleCategorieClick} />

      <hr className="my-5" />

      <h3 className="titre-section">
        {categorieId
          ? `Produits de la catégorie ${categorieName}`
          : ''}
      </h3>

      <ProductList categorieId={categorieId} />
    </div>
  );
}

export default Accueil;
