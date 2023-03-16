import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function DetallesProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState({});


  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/producto/${id}`);
        setProducto(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProducto();
  }, [id]);

  return (
    <div className="card" >
      <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">{producto.descripcion}</p>
        <p className="card-text">${producto.precio}</p>
      </div>
    </div>
  );
}
export default DetallesProducto;
