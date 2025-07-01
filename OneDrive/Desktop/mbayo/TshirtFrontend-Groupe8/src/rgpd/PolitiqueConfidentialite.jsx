import React from "react";
import './PolitiqueConfidentialite.css';


function PolitiqueConfidentialite() {
  return (
    <div className="container mt-4">
      <h2>Politique de confidentialité</h2>
      <p>
        Chez T-Shirt Shop, nous respectons votre vie privée. Cette politique explique
        quelles données nous collectons, comment nous les utilisons, et vos droits.
      </p>

      <h4>Données collectées</h4>
      <ul>
        <li>Informations de compte : nom, prénom, email, mot de passe (crypté).</li>
        <li>Données de commande : produits, prix, adresse de livraison.</li>
        <li>Cookies : utilisés pour améliorer votre navigation et retenir vos préférences.</li>
      </ul>

      <h4>Utilisation des données</h4>
      <ul>
        <li>Traitement des commandes et livraisons.</li>
        <li>Amélioration de l’expérience utilisateur.</li>
        <li>Envoi d’informations marketing (si vous avez donné votre accord).</li>
      </ul>

      <h4>Conservation</h4>
      <p>
        Vos données sont conservées tant que votre compte est actif ou selon les
        durées légales en vigueur.
      </p>

      <h4>Partage</h4>
      <p>
        Nous ne partageons pas vos données personnelles avec des tiers sauf si cela
        est nécessaire pour le traitement des commandes ou sur obligation légale.
      </p>

      <h4>Vos droits</h4>
      <ul>
        <li>Accès, rectification ou suppression de vos données.</li>
        <li>Opposition à l’utilisation de vos données personnelles.</li>
        <li>Portabilité de vos données.</li>
      </ul>

      <p>
        Pour toute demande, contactez-nous à : <strong>contact@tshirt-shop.be</strong>
      </p>

      <p className="mt-4 text-muted">
        Dernière mise à jour : Juin 2025
      </p>
    </div>
  );
}

export default PolitiqueConfidentialite;
