import React from "react";
import './FAQ.css';

function FAQ() {
  return (
    <div className="container mt-4">
      <h2>FAQ - Questions Fréquentes</h2>

      <ul className="faq-list">
        <li>
          <strong>🛒 Comment passer une commande ?</strong><br />
          Pour commander, il suffit d’ajouter les produits souhaités dans le panier, puis de cliquer sur "Commander".
          Vous devrez vous connecter ou créer un compte pour valider la commande.
        </li>

        <li>
          <strong>💳 Quels sont les moyens de paiement acceptés ?</strong><br />
          Nous acceptons les paiements par carte bancaire (Visa, Mastercard), PayPal et virement bancaire.
        </li>

        <li>
          <strong>📦 Quels sont les délais de livraison ?</strong><br />
          Les commandes sont généralement livrées sous 3 à 5 jours ouvrés en France métropolitaine.
        </li>

        <li>
          <strong>📍 Livrez-vous à l’international ?</strong><br />
          Actuellement, nous livrons uniquement en France. D’autres pays seront ajoutés prochainement.
        </li>

        <li>
          <strong>📩 Comment suivre ma commande ?</strong><br />
          Une fois la commande validée, vous recevrez un e-mail de confirmation avec un lien de suivi.
        </li>

        <li>
          <strong>🔁 Puis-je retourner un produit ?</strong><br />
          Oui, vous disposez de 14 jours après réception pour retourner un produit non porté. Contactez-nous pour lancer la procédure.
        </li>

        <li>
          <strong>👕 Comment choisir la bonne taille ?</strong><br />
          Consultez notre guide des tailles disponible sur chaque fiche produit. En cas de doute, prenez une taille au-dessus.
        </li>

        <li>
          <strong>📞 Comment contacter le service client ?</strong><br />
          Vous pouvez nous écrire via le formulaire de contact ou à l’adresse : support@tshirt-shop.be.
        </li>
      </ul>
    </div>
  );
}

export default FAQ;
