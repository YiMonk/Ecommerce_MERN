const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")

const userRouter = require("./router/userRouter");
const productosRouter = require("./router/productosRouter");

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessSatus:200,
  credentials: true
}));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Conectar a MongoDB----------------------------------------------

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "ecommerce"
}).then(() => {
  console.log('Conexión exitosa a MongoDB');
}).catch(error => {
  console.error('Error de conexión a MongoDB', error);
});


//rutas--------------------------------------------------------------------------

app.use("/api/user", userRouter);
app.use("/api/productos", productosRouter);


// Start server----------------------------------------------------


const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log("Server corriendo en el puerto",PORT )
})
