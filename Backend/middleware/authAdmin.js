const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authAdmin = async (req, res, next) => {
  
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(500).json({ msg: "Autenticacion invalida" });

    const decodedToken = jwt.verify(token, process.env.AccessTokenSecret);

    const user = await userModel.findOne({
      _id: decodedToken.id,
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    req.user = user;

    if (user.role === 1) {
      // Si el usuario es un administrador, permitir el acceso
      next();
    } else {
      // Si el usuario no es un administrador, denegar el acceso
      return res
        .status(403)
        .json({ msg: "Acceso denegado, solo para administradores" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = authAdmin;
