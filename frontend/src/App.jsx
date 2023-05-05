// import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalogo from "./Components/Catalogo/Catalogo";
import Footer from "./Components/Footer/Footer";
import DetallesProducto from "./Components/Producto/DetallesProducto";
import Login from "./Components/Auth/login/Login";
import Registrar from "./Components/Auth/Register/Registrar";
import Header from "./Components/Header/Header";
import NotFound from "./Utils/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <div>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Catalogo />} />
            <Route path="/Catalogo" element={<Catalogo />} />
            <Route path="/producto/:id" element={<DetallesProducto />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/registrar" element={<Registrar />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
