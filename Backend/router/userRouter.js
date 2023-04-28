const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const jwt = require("jsonwebtoken");


// register -------------------------------------------------------------------------------------
router.post("/register",
  [
    check("nombre", "Introduce nombre").not().isEmpty(),
    check("apellido", "Introduce apellido").not().isEmpty(),
    check("contacto", "Introduce contacto").not().isEmpty(),
    check("genero", "Introduce genero").not().isEmpty(),
    check("fechaN", "Introduce fechaN").not().isEmpty(),
    check("direccion", "Introduce direccion").not().isEmpty(),
    check("email", "Introduce email").not().isEmpty().isEmail(),
    check("clave", "Introduce clave").not().isEmpty().isLength({ min: 5 }),
    check("confirmarClave", "Introduce confirmarClave").not().isEmpty().isLength({ min: 5 }),
  ],
  async (req, res, next) => {
    try {
      const { nombre, apellido, contacto, genero, fechaN, direccion, email, clave, confirmarClave } =
        req.body;

      const error = validationResult(req);

      if (!error.isEmpty()) {
        res.json({ error: error.array(), error_type: 0, created: false });
        return;
      }

      const findOne_email = await userModel.findOne({ email: email });

      if (findOne_email) {
        res.json({
          message: "Ya existe una cuenta con este correo",
          error_type: 1,
          created: false,
        });
        return;
      };

      if (clave.length < 6) {
        res.json({
          message: "La contraseña debe tener minimo 6 caracteres",
          error_type: 1,
          created: false,
        });
        return;
      };

      if (clave !== confirmarClave) {
        res.json({
          message: "Las contraseñas no coinciden",
          error_type: 1,
          created: false,
        });
        return;
      };

      const user = new userModel({
        nombre,
        apellido,
        contacto,
        genero,
        fechaN,
        direccion,
        email,
        clave
      });

      const salt = await bcrypt.genSalt(10);

      user.clave = await bcrypt.hash(user.clave, salt);

      user.save();

      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/api/user/refreshToken",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }
      );

      res.json({ accesstoken });
      /* res.json({msg: "register success!"}) */

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  });

// login -------------------------------------------------------------------------------------
router.post("/login",
  [
    check("email", "Introduce email").not().isEmpty(),
    check("clave", "Introduce clave").not().isEmpty(),
  ],
  async (req, res) => {

    try {
      const { email, clave } = req.body;

      const error = validationResult(req);

      if (!error.isEmpty()) {
        res.json({ error: error.array(), error_type: 0, created: false });
        return;
      }

      const user = await userModel.findOne({ email });

      if (!user) return res.status(400).json({ msg: "Cuenta no existe" });
      const isMatch = await bcrypt.compare(clave, user.clave);
      if (!isMatch) return res.status(400).json({ msg: "Contraseña incorrecta" });

      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/api/user/refreshToken",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ accesstoken });
      /* res.json({msg: "login success!"}) */

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }

  }
);

// logout -------------------------------------------------------------------------------------
router.get("/logout",
  async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/user/refreshToken" });
      return res.json({ msg: "logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  });

  // mostrar todos -------------------------------------------------------------------------------------
  router.get("/allUsers", authAdmin,
    async (req, res) => {
      try {
        const users = await userModel.find({});
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

// mostrar uno -------------------------------------------------------------------------------------
router.get("/userDetalles/:id", auth,
  async (req, res) => {
    try {
      const { id } = req.params;

      const user = await userModel.findById(id);

      if (!user) {
        res.json({ message: "Usuario no existe", status: 0 });
        return;
      }

      res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }

  });

// actualizar -------------------------------------------------------------------------------------
router.put("/updateUser/:id", auth,
  [
    check("nombre", "Introduce nombre").not().isEmpty(),
    check("apellido", "Introduce apellido").not().isEmpty(),
    check("contacto", "Introduce contacto").not().isEmpty(),
    check("genero", "Introduce genero").not().isEmpty(),
    check("fechaN", "Introduce fechaN").not().isEmpty(),
    check("direccion", "Introduce direccion").not().isEmpty(),
    check("email", "Introduce email").not().isEmpty().isEmail(),
  ],
  async (req, res) => {
    try {

      const { id } = req.params;

      const error = validationResult(req);

      if (!error.isEmpty()) {
        res.json({ error: error.array(), error_type: 0 });
        return;
      }

      const { nombre, apellido, contacto, genero, fechaN, direccion, email } =
        req.body;

      const updateUser = {
        nombre,
        apellido,
        contacto,
        genero,
        fechaN,
        direccion,
        email,
      };

      const salt = await bcrypt.genSalt(10);
      updateUser.clave = await bcrypt.hash(req.body.clave, salt);

      const user = await userModel.findByIdAndUpdate(id, updateUser, {
        new: true,
      });

      if (!user) {
        res.json({ message: "Usuario no existe", status: 0 });
        return;
      }

      // res.json({ message: "Usuario actualizado exitosamente" });
      res.json({ user });

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
);

// refresh token ---------------------------------------------------------------------------------
router.get("/refreshToken",
  async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Por favor inicia sesion o registrate" });
      jwt.verify(rf_token, process.env.RefreshTokenSecret, (error, user) => {
        if (error)
          return res.status(400).json({ msg: "Por favor inicia sesion o registrate abajo" });

        const accesstoken = createAccessToken({ id: user.id });
        res.json({ accesstoken });
      });

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  });


const createAccessToken = (user) => {
  return jwt.sign(user, process.env.AccessTokenSecret, { expiresIn: "11m" })
}
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.RefreshTokenSecret, { expiresIn: "12m" })
}




module.exports = router;
