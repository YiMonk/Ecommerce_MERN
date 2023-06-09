import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Utils/imagen/logo.png"
import './nav.css';
import CarritoIcon from "../../Utils/Icons/carrito.svg";
import UserIcon from "../../Utils/Icons/user.svg";




function Header() {

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

            <li className=" icono nav-item">
              <Link to="/carrito" className="nav-link">
              <img src={CarritoIcon} alt='' width="25" />
              </Link>
            </li>

            <li className=" icono nav-item">
              <Link to="/login" className="nav-link">
              <img src={UserIcon} alt='' width="20" />
              </Link>
            </li>

          </ul>
        </div>

      </div>

{/* boton pantalla pequeña */}
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


export default Header;