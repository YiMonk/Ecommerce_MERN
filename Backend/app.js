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

// Conectar a MongoDB----------------------------------------------

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
    }).then(() => {
      console.log('Conexión exitosa a MongoDB');
    }).catch(err => {
      console.error('Error de conexión a MongoDB', err);
    });

//rutas--------------------------------------------------------------------------

//r- productos
const productsController = require('./Controllers/Product');
app.get('/productos', productsController.obtenerProductos);
app.get('/producto/:id', productsController.obtenerUnProducto);
app.post('/AddProducto', productsController.agregarProducto);
app.put('/updateProducto/:id', productsController.actualizarProducto);
app.delete('/deleteProducto/:id', productsController.eliminarProducto);

//r- usuarios
const usuariosController = require('./Controllers/User');
app.get('/usuarios', usuariosController.obtenerUsuarios);
app.get('/usuario/:id', usuariosController.obtenerUnUsuario);
app.post('/addUsuario', usuariosController.agregarUsuario);
app.put('/updateUsuario/:id', usuariosController.actualizarUsuario);
app.delete('/deleteUsuario/:id', usuariosController.eliminarUsuario);





// Start server----------------------------------------------------
app.listen(process.env.PORT, () => {
  console.log(`Server corriendo en el puerto ${process.env.PORT}`);
});

