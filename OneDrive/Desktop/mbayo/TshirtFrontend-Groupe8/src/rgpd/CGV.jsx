import React from "react";
import './CGV.css';

function CGV() {
  return (
    <div className="container mt-4">
      <h2>Conditions Générales de Vente (CGV)</h2>

      <h4>1. Objet</h4>
      <p>
        Les présentes CGV régissent les ventes de produits entre T-Shirt Shop
        et ses clients via le site internet.
      </p>

      <h4>2. Commandes</h4>
      <p>
        Toute commande passée implique l’acceptation des CGV. Le client doit vérifier
        l’exactitude de sa commande avant validation.
      </p>

      <h4>3. Prix</h4>
      <p>
        Les prix sont exprimés en euros TTC. T-Shirt Shop se réserve le droit de les modifier à tout moment.
      </p>

      <h4>4. Paiement</h4>
      <p>
        Le paiement s’effectue par carte bancaire, PayPal ou virement bancaire.
        Il est sécurisé via notre prestataire.
      </p>

      <h4>5. Livraison</h4>
      <p>
        Les produits sont livrés à l’adresse indiquée par le client. Les délais
        peuvent varier selon la destination.
      </p>

      <h4>6. Droit de rétractation</h4>
      <p>
        Conformément à la loi, le client dispose de 14 jours pour changer d’avis.
      </p>

      <p className="mt-4 text-muted">Dernière mise à jour : Juin 2025</p>
    </div>
  );
}

export default CGV;
