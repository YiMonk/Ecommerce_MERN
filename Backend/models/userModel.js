const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScema = new Schema({
  role: {
    type: Number,
    default: 0
  },

  nombre: {
    type: String,
    required: true
  },

  apellido: {
    type: String,
    required: true
  },

  contacto: {
    type: Number,
    trim: true
  },

  genero: {
    type: String,
    required: true,
    trim: true
  },

  fechaN: {
    type: Number,
    required: true,
    trim: true
  },

  direccion: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  clave: {
    type: String,
    required: true,
    trim: true
  }

},
  { timestamps: true },
);


const userModel = mongoose.model("users", userScema);

module.exports = userModel;
