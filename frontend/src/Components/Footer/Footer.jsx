import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"
import InstaIcon from "../../Utils/Icons/instagram.svg";
import WhatsappIcon from "../../Utils/Icons/whatsapp.svg";
import CorreoIcon from "../../Utils/Icons/correo.svg";


function Footer() {
    return (
        <footer className="bg-light pt-5 pb-4">
            <div className="container-footer  justify-content-around">
                <div className="row text-center">


                    <div className="col-12 col-md-4">
                        <h5>Productos</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/Catalogo" className="footer-link">Catalogo</Link>
                            </li>
                            <li>
                                <Link to="/Catalogo" className="footer-link">Hombre</Link>
                            </li>
                            <li>
                                <Link to="/Catalogo" className="footer-link">Mujer</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-12 col-md-4">
                        <h5>Redes Sociales</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/" className="footer-link">
                                <img src={InstaIcon} alt='' width="20" /> Intagram
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="footer-link">
                                <img src={CorreoIcon} alt='' width="20" /> Email
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="footer-link">
                                <img src={WhatsappIcon} alt='' width="20" /> Whatsapp
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-12 col-md-4">
                        <h5>Cuenta</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/Login" className="footer-link">Iniciar sesión</Link>
                            </li>
                            <li>
                                <Link to="/" className="footer-link">Perfil</Link>
                            </li>
                            <li>
                                <Link to="/" className="footer-link">Carrito</Link>
                            </li>
                        </ul>
                    </div>


                </div>
            </div>
        </footer>
    );
}

export default Footer;
