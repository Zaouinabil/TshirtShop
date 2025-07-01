import React, { useState } from "react";
import './Contact.css';

function Contact() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 📩 Méthode simple : ouvrir le client mail
    const mailtoLink = `mailto:contact@tshirt-shop.fr?subject=Message de ${form.nom}&body=Email: ${form.email}%0D%0A%0D%0A${form.message}`;
    window.location.href = mailtoLink;

    // ✅ Affiche un message de confirmation (optionnel)
    setSubmitted(true);
    setForm({ nom: "", email: "", message: "" });
  };

  return (
    <div className="container mt-4">
      <h2>Contactez-nous</h2>
      <p>Email : contact@tshirt-shop.be</p>
      <p>Adresse : 123 rue du Commerce, Bruxelles</p>

      <h4>Formulaire de contact</h4>
      {submitted && <p className="confirmation">✅ Merci pour votre message !</p>}

      <form onSubmit={handleSubmit} className="contact-form">
        <div>
          <label htmlFor="nom">Nom :</label>
          <input
            type="text"
            name="nom"
            id="nom"
            value={form.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="message">Message :</label>
          <textarea
            name="message"
            id="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default Contact;
