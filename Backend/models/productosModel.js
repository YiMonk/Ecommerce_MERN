const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
  nombre: { type:String, required:true },
  descripcion: { type:String, required:true },
  precio: { type:Number, required: true},
  imagen: { type: String, required: true},
},{
  timestamps:true
});

const productoModel = mongoose.model("productos", ProductoSchema);

module.exports = productoModel;
