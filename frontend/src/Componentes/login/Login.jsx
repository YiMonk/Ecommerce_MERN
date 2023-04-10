import "./Login.css";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    clave: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { email, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [email]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(inputs);

    //conexion con axios
    axios
      .post(
        "",
        { ...inputs },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);

        if (!res.data.created) {
          if (res.data.error_type === 0) {
            toast.error(res.data.error[0].msg, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (res.data.error_type === 1) {
            toast.error(res.data.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }

        if (res.data.created) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(`Request error: ${err}`);
      });
    
  };
  

  return (
    <div className="container-log">
      <Form onSubmit={submitHandler}>
        <p className="titulo">Iniciar Sesión</p>
        <Form.Group className="mb-3" >
          <Form.Label>email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ejemplo@email.com" 
            name="username"
            value={inputs.username}
            onChange={onChangeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="*********"
            id="password"
            name="password"
            value={inputs.password}
            onChange={onChangeHandler}
          />
        </Form.Group>

        <Form.Text className="text-muted">
          <Link to={`/`}> Olvide mi Contraseña</Link>
        </Form.Text>

        <div className="registrar-boton d-grid ">
          <Button type="submit" variant="dark" size="lg">
            Iniciar Sesion
          </Button>
        </div>

        <Form.Text className="text-muted">
          {" "}
          <br />
          ¿No tienes cuenta aun? <Link to={`/registrar`}> Registrate</Link>
        </Form.Text>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default Login;
