
// import "./Login.css"
// import { Button, Form } from 'react-bootstrap';
// import { Link } from "react-router-dom";
// import axios from "axios";
// import React, { useState, useEffect} from "react";


// function Register() {
//   const [nombre, setNombre] = useState('');
//   const [apellido, setApellido] = useState('');
//   const [contacto, setContacto] = useState('');
//   const [genero, setGenero] = useState('');
//   const [fechaN, setFechaN] = useState('');
//   const [direccion, setDireccion] = useState('');
//   const [correo, setCorreo] = useState('');
//   const [clave, setClave] = useState('');

//     try {
//       const res =axios.post('http://localhost:3001/addUsuario', usuario);
//       alert(res.data);
//     } catch (error) {
//       console.log(error);
//       alert(`Error al intentar agregar usuario: ${error.message}`);
//       console.error(error);
//     }

//     return (
//       <div className="container-log">
//         <Form onSubmit={handleSubmit} >
//           <p className="titulo">Crear cuenta</p>

//           <Form.Group className="mb-3" >
//             <Form.Label>Nombre</Form.Label>
//             <Form.Control type="text" placeholder="..." value={nombre} onChange={(e) => setNombre(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3" >
//             <Form.Label>Apellido</Form.Label>
//             <Form.Control type="text" placeholder="..." value={apellido} onChange={(e) => setApellido(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3" >
//             <Form.Label>Numero Telefonico</Form.Label>
//             <Form.Control type="number" placeholder="+54 123456789" value={contacto} onChange={(e) => setContacto(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3" >
//             <Form.Label>Genero</Form.Label>
//             <Form.Select aria-label="Selecciona tu genero" value={genero} onChange={(e) => setGenero(e.target.value)}>
//               <option value="">Selecciona tu genero</option>
//               {[{ value: 'Hombre', label: 'Hombre' }, { value: 'Mujer', label: 'Mujer' }, { value: 'otro', label: 'otro' }].map((opcion) => (
//                 <option key={opcion.value} value={opcion.value}>
//                   {opcion.label}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>

//           <Form.Group className="mb-3" >
//             <Form.Label>Fecha de nacimiento</Form.Label>
//             <Form.Control type="date" value={fechaN} onChange={(e) => setFechaN(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3" >
//             <Form.Label>Direccion</Form.Label>
//             <Form.Control type="text" placeholder="pais, ciudad, urb, edificio..." value={direccion} onChange={(e) => setDireccion(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3" >
//             <Form.Label>Correo</Form.Label>
//             <Form.Control type="email" placeholder="Ejemplo@correo.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3" >
//             <Form.Label>Contraseña</Form.Label>
//             <Form.Control type="password" placeholder="*********" value={clave} onChange={(e) => setClave(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3" >
//             <Form.Check type="checkbox" label="capcha" />
//           </Form.Group>

//           <Form.Text className="text-muted">
//             <Link to={`/login`}>¿Ya tienes una cuenta? Inicia Sesion</Link>
//           </Form.Text>

//           <div className="registrar-boton d-grid ">
//             <Button type="submit" variant="dark" size="lg">
//               Registrar
//             </Button>
//           </div>

//         </Form>
//       </div>
//     );
//   }
// }
// export default Register;