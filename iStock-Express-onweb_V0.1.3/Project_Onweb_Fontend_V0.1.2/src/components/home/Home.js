import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import Logo from '../img/logo/logonew.png';

function Home() {
  return (
    <div className="content content1">
      <img className="logo-background" src={Logo} alt="Logo" />
    </div>
  );
}

export default Home;
