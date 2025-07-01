import { Link } from "react-router-dom";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  // Ce composant affiche le pied de page du site
  // Il contient : des liens internes, des liens vers les réseaux sociaux, et un texte de copyright
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Liens vers les pages d’information (légales, FAQ, contact...) */}
        <div className="footer-links">
          <Link to="/a-propos">À propos</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/cgv">CGV</Link>
          <Link to="/politique-confidentialite">Confidentialité</Link>
        </div>

        {/* Liens vers les réseaux sociaux (icônes avec liens externes) */}
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <FaYoutube />
          </a>
        </div>

        {/* Texte affiché en bas : © année en cours + nom du site */}
        <p className="footer-text">
          © {new Date().getFullYear()} TshirtShop. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
