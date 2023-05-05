import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./DetallesProducto.css"


function DetallesProducto() {
  
  const { id } = useParams();
  const [producto, setProducto] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3002/api/productos/detalles/${id}`)
      .then((res) => {
        setProducto(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <Container className="my-4 container-product">
      <Row className="product-imagen">
        <Col md={7} className="mb-4 mb-md-0">
          <img src={producto.imagen} alt={producto.nombre} />
        </Col>

        <Col md={5} className="my-4 product-contenido" >
          <div className="product-nombre">
            <h2 className="display-3">{producto.nombre}</h2>
          </div>

          <div className="product-descripcion">
            <p>{producto.descripcion}</p>
          </div>

          <div className="product-precio">
            <p>Precio: {producto.precio} $</p>
          </div>


          <div className="product-boton d-grid gap-2">
            <Button variant="light" size="lg">
              Comprar Ya!
            </Button>
            <Button variant="light" size="lg">
              Agregar al carrito
            </Button>
          </div>

        </Col>
      </Row>
    </Container>
  );
}
export default DetallesProducto;
