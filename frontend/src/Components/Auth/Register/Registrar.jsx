import "../login/Login";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";


function Registrar() {
  const [inputs, setInputs] = useState({
    nombre: "",
    apellido: "",
    contacto: "",
    genero: "",
    fechaN: "",
    direccion: "",
    email: "",
    clave: "",
  });


  const onChangeInput = e => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const registerSubmit = async e => {
    e.preventDefault()
    try {
        await axios.post("http://localhost:3002/api/user/register", { ...inputs })
        localStorage.setItem('firstLogin', true)
        window.location.href = "/"
    } catch (error) {
        alert(error.res.data.msg)
    }
}


  return (
    <div className="container-log">
      <Form onSubmit={registerSubmit} className="p-4 my-4 py-4">
        <p className="titulo">Crear cuenta</p>

        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="..."
            name="nombre"
            onChange={onChangeInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="..."
            name="apellido"
            onChange={onChangeInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Numero Telefonico</Form.Label>
          <Form.Control
            type="number"
            placeholder="+58 123456789"
            name="contacto"
            onChange={onChangeInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Genero</Form.Label>
          <Form.Select
            aria-label="Selecciona tu genero"
            name="genero"
            onChange={onChangeInput}
          >
            <option value="">Selecciona tu genero</option>
            {[
              { value: "Hombre", label: "Hombre" },
              { value: "Mujer", label: "Mujer" },
              { value: "otro", label: "otro" },
            ].map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </Form.Select>

        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control type="date" name="fechaN" onChange={onChangeInput} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Direccion</Form.Label>
          <Form.Control
            type="text"
            placeholder="pais, ciudad, urb, edificio..."
            name="direccion"
            onChange={onChangeInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ejemplo@email.com"
            name="email"
            onChange={onChangeInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="*********"
            name="clave"
            onChange={onChangeInput}
          />
          <Form.Text className="text-muted">
            Nunca compartiremos sus datos con nadie más.
          </Form.Text>
        </Form.Group>

        <br />

        <div className="registrar-boton d-grid ">
          <Button type="submit" variant="dark" size="lg">
            Registrar
          </Button>
        </div>

        <br />

        <Form.Text className="text-muted">
          <Link to={`/login`}>¿Ya tienes una cuenta? Inicia Sesion</Link>
        </Form.Text>

      </Form>
    </div>
  );
}

export default Registrar;
