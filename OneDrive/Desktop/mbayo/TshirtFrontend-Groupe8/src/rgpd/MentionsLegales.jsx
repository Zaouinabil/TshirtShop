import React from "react";
import './MentionsLegales.css';

function MentionsLegales() {
  return (
    <div className="container mt-4">
      <h2>Mentions légales</h2>

      <p><strong>Nom du site :</strong> T-Shirt Shop</p>
      <p><strong>Éditeur :</strong> T-Shirt Shop - Projet Étudiant</p>
      <p><strong>Adresse :</strong> 123 rue du Commerce, 1090 Bruxelles, Belgiqua</p>
      <p><strong>Email :</strong> contact@tshirt-shop.be</p>
      <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
      <p><strong>Directeur de la publication :</strong> Ahmad Abduldaem</p>

      <h4>Hébergement</h4>
      <p>
        Le site est hébergé par OVHcloud<br />
        2 rue Kellermann, 1090, Belgique<br />
        Site web : <a href="https://www.ovh.com" target="_blank" rel="noreferrer">www.ovh.com</a>
      </p>

      <h4>Propriété intellectuelle</h4>
      <p>
        Le contenu du site (textes, images, design, code, etc.) est protégé par le droit de la propriété intellectuelle.
        Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation préalable est interdite.
      </p>

      <h4>Responsabilité</h4>
      <p>
        T-Shirt Shop ne peut être tenu responsable des dommages directs ou indirects causés lors de l’utilisation du site.
        L'utilisateur est responsable de la configuration de son matériel informatique pour accéder au site.
      </p>

      <h4>Protection des données personnelles</h4>
      <p>
        Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d’un droit d’accès,
        de modification et de suppression des données vous concernant. Pour exercer ce droit, vous pouvez nous contacter
        à l’adresse : contact@tshirt-shop.fr.
      </p>

      <p className="mt-4 text-muted">Dernière mise à jour : Juin 2025</p>
    </div>
  );
}

export default MentionsLegales;
