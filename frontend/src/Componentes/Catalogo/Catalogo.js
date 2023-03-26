import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Catalogo.css";


function Catalogo() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const getProductos = async () => {
      try {
        const res = await axios.get("http://localhost:3002/productos");
        setProductos(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getProductos();
  }, []);

  return (
    <div className="container my-3">
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {productos.map((producto) => (
          <div className="col" key={producto._id} >
            <div className="card" key={producto._id}>
            <Link to={`/producto/${producto._id}`}>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="card-img-top img-fluid"
                  style={{ objectFit: "cover", height: "300px" }}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="card-text">{producto.precio} $</p>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogo;
