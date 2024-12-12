import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // ใช้ Bootstrap
import '../footer/Footer.css'


function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-light">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div className="footer-logo">
          <h5 className="mb-0">UserName</h5>
        </div>

       
      </div>
    </footer>
  );
}

export default Footer;
