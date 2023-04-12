const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  contacto: { type: Number },
  genero: { type: String, required: true },
  fechaN: { type: Number, required: true },
  direccion: { type: String },
  email: { type: String, required: true, unique: true },
  clave: { type: String, required: true }

}, 
{timestamps: true},
);


const userModel = mongoose.model("users", userScema);

module.exports = userModel;
