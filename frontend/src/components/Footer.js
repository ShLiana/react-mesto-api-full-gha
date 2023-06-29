import React from "react";

const Footer = ( {isLoggedIn} ) => {
  return (
    <footer className={isLoggedIn ? "footer" : ""}>
      <p className="footer__copyright">&copy; 2022 Mesto Russia</p>
    </footer>
  );
}

export default Footer;
