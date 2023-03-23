import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalogo from './Componentes/Catalogo/Catalogo';
import Footer from './Componentes/Footer/Footer';
import Navbar from './Componentes/navbar/nav';
import DetallesProducto from './Componentes/Producto/DetallesProducto';
import Login from './Componentes/login/Login';
// import Register from './Componentes/login/Registrar';

function App() {
  return (
    <Router>
      <div className="App">

        <Navbar />

        <div >
          <Routes>
            
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/producto/:id" element={<DetallesProducto/>}/>
            <Route path="/Login/" element={<Login/>}/>
            {/* <Route path="/addUsuario/" element={<Register/>}/> */}
          </Routes>

        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
