const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//rutas--------------------------------------------------------------------------

//r- productos
const productsController = require('./Controllers/Product');
app.get('/productos', productsController.obtenerProductos);
app.get('/producto/:id', productsController.obtenerUnProducto);
app.post('/producto', productsController.agregarProducto);
app.put('/producto/:id', productsController.actualizarProducto);
app.delete('/productos/:id', productsController.eliminarProducto);

//r- usuarios
const usuariosController = require('./Controllers/User');
app.get('/usuarios', usuariosController.obtenerUsuarios);
app.get('/usuario/:id', usuariosController.obtenerUnUsuario);
app.post('/usuario', usuariosController.agregarUsuario);
app.put('/usuario/:id', usuariosController.actualizarUsuario);
app.delete('/usuario/:id', usuariosController.eliminarUsuario);


// Connect to MongoDB----------------------------------------------
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado')).catch(err => console.log(err));


// Start server----------------------------------------------------
app.listen(process.env.PORT, () => {
  console.log(`Server corriendo en el puerto ${process.env.PORT}`);
});

