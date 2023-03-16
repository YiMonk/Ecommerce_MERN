const Usuario = require('../models/User');

const obtenerUsuarios = async (req, res) => {
  try {
    const users = await Usuario.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const obtenerUnUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Usuario.findById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const agregarUsuario = async (req, res) => {
  try {
    const { admin ,nombre, correo, clave, dirreccion,pagoMetodo, contacto, genero, fechaN } = req.body;
    const nuevoUsuario = new Usuario({ admin ,nombre, correo, clave, dirreccion,pagoMetodo, contacto, genero, fechaN });
    const userGuardado = await nuevoUsuario.save();
    res.json(userGuardado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, clave, dirreccion,pagoMetodo, contacto, genero, fechaN, admin } = req.body;
    const userActualizado = await Usuario.findByIdAndUpdate(
      id, { nombre, correo, clave, dirreccion,pagoMetodo, contacto, genero, fechaN, admin }, { new: true });
    res.json(userActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await Usuario.findByIdAndDelete(id);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { obtenerUsuarios, agregarUsuario, actualizarUsuario, eliminarUsuario,obtenerUnUsuario };
