const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  admin: { type: Boolean, default: false },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  contacto: { type: Number },
  genero: { type: String, required: true },
  fechaN: { type: Number, required: true },
  direccion: { type: String },
  correo: { type: String, required: true, unique: true },
  clave: { type: String, required: true }
  

}, 
{timestamps: true},
);



const User = mongoose.model("User", UserSchema);

module.exports = User;
