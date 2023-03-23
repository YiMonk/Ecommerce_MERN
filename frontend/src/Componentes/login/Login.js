import "./Login.css"
import { Link } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';

function Login() {
  return (
    <div className="container-log">
      <Form>
        <p className="titulo">Iniciar Sesión</p>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" placeholder="Ejemplo@correo.com" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="*********" />
          <Form.Text className="text-muted">
            Nunca compartiremos sus datos con nadie más.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="capcha" />
        </Form.Group>

        <Form.Text className="text-muted">
          <Link to={`/addUsuario`}>¿No tienes cuenta aun?   Registrate</Link>
        </Form.Text>

        <div className="registrar-boton d-grid ">
            <Button variant="dark" size="lg">
              Iniciar Sesion 
            </Button>
          </div>

      </Form>
    </div>
  );
}

export default Login;