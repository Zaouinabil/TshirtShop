import React, { useState, useEffect } from 'react';
import './CookieConsentBanner.css';

function CookieConsentBanner() {
  const [visible, setVisible] = useState(true); // Toujours true au début

  const acceptCookies = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        Ce site utilise des cookies pour améliorer votre expérience. 
        En continuant, vous acceptez notre <a href="/politique-confidentialite">politique de confidentialité</a>.
      </p>
      <button onClick={acceptCookies}>Accepter</button>
    </div>
  );
}

export default CookieConsentBanner;
