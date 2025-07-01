import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./Product/Accueil";
import ProductDetails from "./Product/ProductDetails";
import CategorieProduits from "./Product/CategorieProduits";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Profil from "./auth/Profil";
import Header from "./Header/Header";
import Panier from "./panier/Panier";
import CookieConsentBanner from "./rgpd/CookieConsentBanner";
import APropos from "./infos/APropos";
import FAQ from "./infos/FAQ";
import Contact from "./infos/Contact";
import PolitiqueConfidentialite from "./rgpd/PolitiqueConfidentialite";
import MentionsLegales from "./rgpd/MentionsLegales";
import CGV from "./rgpd/CGV";
import Footer from "./Footer/Footer"; //
import MesCommandes from "./auth/MesCommandes";
import EditProduct from "./Product/EditProduct"; //
import ChangerMotDePasse from "./auth/ChangerMotDePasse";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container flex flex-col min-h-screen">
        <Header />
        <CookieConsentBanner />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/produit/:id" element={<ProductDetails />} />
            <Route path="/categorie/:id" element={<CategorieProduits />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="CookieConsentBanner"
              element={<CookieConsentBanner />}
            ></Route>
            <Route
              path="/politique-confidentialite"
              element={<PolitiqueConfidentialite />}
            />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/mes-commandes" element={<MesCommandes />} />
            <Route path="/produit/:id/edit" element={<EditProduct />} />
            <Route
              path="/changer-mot-de-passe"
              element={<ChangerMotDePasse />}
            />


          <Route path="/produit/nouveau" element={<EditProduct />} />
<Route path="/produit/:id/edit" element={<EditProduct />} />


          </Routes>
        </main>
        <Footer /> {/* ✅ toujours collé en bas */}
      </div>
    </BrowserRouter>
  );
}

export default App;
