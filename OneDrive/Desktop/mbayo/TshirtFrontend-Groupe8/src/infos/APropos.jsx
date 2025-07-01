import React from "react";
import './APropos.css';

function APropos() {
  return (
    <div className="container mt-4">
      <h2>À propos de T-Shirt Shop</h2>

      <p>
        Bienvenue sur <strong>T-Shirt Shop</strong>, votre boutique en ligne dédiée aux passionnés de t-shirts stylés, originaux et confortables.  
        Que vous soyez amateur de mode urbaine, de motifs fun ou de basiques élégants, vous trouverez chez nous une collection qui vous ressemble.
      </p>

      <h4>🧵 Qui sommes-nous ?</h4>
      <p>
        T-Shirt Shop est un projet e-commerce développé dans le cadre d’un projet académique. Notre objectif est de proposer une plateforme simple,
        intuitive et efficace pour acheter des t-shirts de qualité, tout en mettant en pratique les technologies web modernes (React, Spring Boot, MySQL).
      </p>

      <h4>🎯 Notre mission</h4>
      <p>
        Offrir une expérience d’achat fluide et agréable, tout en mettant en avant des produits à la fois tendance, durables et abordables.
        Nous croyons que chaque t-shirt raconte une histoire – la vôtre !
      </p>

      <h4>👨‍💻 L'équipe</h4>
      <p>
        Ce site a été développé par Ahmad Abduldaem, étudiant en développement web, dans le cadre d’un projet d’intégration full-stack.
        Le projet met en œuvre des technologies comme <strong>React + Vite + SWR</strong> pour le frontend, et <strong>Spring Boot + MySQL</strong> pour le backend.
      </p>

      <h4>📫 Contact</h4>
      <p>
        Une question ? Une suggestion ? Contactez-nous via le <a href="/contact">formulaire de contact</a> ou par e-mail à : contact@tshirt-shop.fr
      </p>

      <p className="mt-4 text-muted">Merci de votre visite et bonne navigation sur notre site !</p>
    </div>
  );
}

export default APropos;
