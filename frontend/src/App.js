import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalogo from './Componentes/Catalogo/Catalogo';
import Footer from './Componentes/Footer/Footer';
import Navbar from './Componentes/navbar/nav';
import DetallesProducto from './Componentes/Producto/DetallesProducto';
import Login from './Componentes/login/Login';

function App() {
  return (
    <Router>
      <div className="App">

        <Navbar />

        <div >
          <Routes>

            <Route path="/Catalogo" element={<Catalogo />} />
            <Route path="/producto/:id" element={<DetallesProducto />} />
            <Route path="/Login/" element={<Login />} />

          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
