import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalogo from './Componentes/Catalogo/Catalogo';
import Footer from './Componentes/Footer/Footer'
import Navbar from './Componentes/navbar/nav';
import DetallesProducto from './Componentes/Producto/DetallesProducto';

function App() {
  return (
    <Router>
      <div className="App">

        <Navbar />

        <div className="container">
          <Routes>
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/producto/:id" element={<DetallesProducto/>}/>

          </Routes>

        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
