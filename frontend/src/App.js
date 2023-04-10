// import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalogo from './Componentes/Catalogo/Catalogo';
import Navbar from './Componentes/navbar/nav';
import Footer from './Componentes/Footer/Footer';
import DetallesProducto from './Componentes/Producto/DetallesProducto';
import Login from './Componentes/login/Login';
import Registrar from './Componentes/login/Registrar';

function App() {
  return (

    <div className="App">
      <Router>
        <Navbar />

        <div >
          <Routes>

            <Route path="/Catalogo" element={<Catalogo />} />
            <Route path="/producto/:id" element={<DetallesProducto />} />
            <Route path="/Login/" element={<Login/>} />
            <Route path="/registrar" element={<Registrar/>} />

          </Routes>
        </div>

        <Footer />
      </Router>
    </div>

  );
}

export default App;
