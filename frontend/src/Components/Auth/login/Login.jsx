import "./Login.css";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    clave: "",
  });

  const [error, setError] = useState("");


  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.email || !inputs.clave) {
      setError("Por favor complete todos los campos");
      return;
    }
    try {
      await axios.post("/api/user/login", { ...inputs })
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";

    } catch (error) {
      setError("Credenciales incorrectas. Por favor, inténtelo de nuevo.");
      alert(error.inputs.data.msg);
    }
  };

  

  return (
    <div className="container-log">
      <Form onSubmit={loginSubmit}>
        <p className="titulo">Iniciar Sesión</p>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
            placeholder="Email"
            value={inputs.email}
            onChange={onChangeInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name='clave'
            required
            placeholder='**********'
            value={inputs.clave}
            onChange={onChangeInput}
          />
        </Form.Group>

        <Form.Text className="text-muted">
          <Link to={`/`}> Olvide mi Contraseña</Link>
        </Form.Text>

        <div className="registrar-boton d-grid ">
          <Button type="submit" variant="dark" size="lg">
            Iniciar Sesion
          </Button>
          {error && <div className="alert alert-danger">{error}</div>}

        </div>

        <Form.Text className="text-muted">
          {
            
          }
          <br />
          ¿No tienes cuenta aun? <Link to={`/registrar`}> Registrate</Link>
        </Form.Text>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default Login;
