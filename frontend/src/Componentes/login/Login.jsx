import "./Login.css";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios
      .post(
        "http://localhost:3002/api/user/login",
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data); // handle success response

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
      } catch (err) {
        console.error(err.response.data); // handle error response
        toast.error(err.response.data.message);
      }
    };
      
 

  return (
    <div className="container-log">
      <Form onSubmit={onSubmit}>
        <p className="titulo">Iniciar Sesión</p>
        <Form.Group className="mb-3" >
          <Form.Label>Email</Form.Label>
          <Form.Control
           type="email"
           placeholder="Enter email"
           name="email"
           value={email}
           onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Text className="text-muted">
          <Link to={`/`}> Olvide mi Contraseña</Link>
        </Form.Text>

        <div className="registrar-boton d-grid ">
        <Button variant="primary" type="submit">
          Login
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
