import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Logo from "./imagen/logo.png"
import './nav.css';



function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">


        <div className="Filtros">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/Catalogo" className="nav-link">
                Catalogo
              </Link>
            </li>
          </ul>
        </div>


        <div>
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="Logo" width="60" height="50" />
          </Link>
        </div>


        <div className="perfil">
          <ul className="navbar-nav ml-auto">

            <li className="nav-item">
              <Link to="/carrito" className="nav-link">
                <FontAwesomeIcon icon={faShoppingCart} />
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/perfil" className="nav-link">
                <FontAwesomeIcon icon={faUserCircle} />
              </Link>
            </li>

          </ul>
        </div>

      </div>

      <button
        className="navbar-toggler"
        type="button"
        onClick={handleToggle}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      {isOpen && (
        <ul className="navbar__menu-dropdown">
          <li>Perfil</li>
          <li>Configuración</li>
          <li>Cerrar sesión</li>
        </ul>
      )}

    </nav>
  );
}


export default Navbar;