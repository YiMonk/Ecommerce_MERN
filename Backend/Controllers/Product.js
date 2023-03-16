const Producto = require('../models/Product');

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const obtenerUnProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const agregarProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen } = req.body;
    const nuevoProducto = new Producto({ nombre, descripcion, precio, imagen });
    const productoGuardado = await nuevoProducto.save();
    res.json(productoGuardado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, imagen } = req.body;
    const productoActualizado = await Producto.findByIdAndUpdate(
      id, { nombre, descripcion, precio, imagen }, { new: true });
    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await Producto.findByIdAndDelete(id);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { obtenerProductos, agregarProducto, actualizarProducto, eliminarProducto, obtenerUnProducto };

