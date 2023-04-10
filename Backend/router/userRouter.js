const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");


router.post("/verify_account", async (req, res, next) => {
  const { token } = req.body;

  jwt.verify(token, process.env.jwt_key, async (err, valid_token) => {
    if (err) {
      res.json({ status: false });
      return;
    }

    const id = valid_token.id;
    const findAccount = await userModel.findById(id);

    if (!findAccount) {
      res.json({ status: false });
      return;
    }

    res.json({
      status: true,
      username: findAccount.username,
      email: findAccount.email,
    });
  });
});


router.post(
  "/login",
  [
    check("email", "Introduce email").not().isEmpty(),
    check("clave", "Introduce clave").not().isEmpty(),
  ],
  async (req, res, next) => {
    const { email, clave } = req.body;

    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.json({ error: error.array(), error_type: 0 });
      return;
    }

    const findone = await userModel.findOne({ email: email });

    if (!findone) {
      res.json({ message: "Cuenta no existe", error_type: 1 });
      return;
    }

    await bcrypt.compare(clave, findone.clave, (err, isValid) => {
      if (isValid) {
        const id = findone._id;
        const token = jwt.sign({ id }, process.env.jwt_key, {
          expiresIn: "7d",
        });

        res
          .cookie("jwt_token", token)
          .status(200)
          .send({ message: "Loggin ", token, created: true });
      } else {
        res.json({ message: "Cuenta no existe.", created: false });
      }
    });
  }
);

router.post(
  "/register",
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
    }

    if (clave !== confirmarClave) {
      res.json({
        message: "Las contraseñas no coinciden",
        error_type: 1,
        created: false,
      });
      return;
    }

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

    user.save().then((doc) => {
      const id = doc._id;

      const token = jwt.sign({ id }, process.env.jwt_key, { expiresIn: "7d" }); /* estudiar jwt */

      res
        .cookie("jwt_token", token)
        .status(201)
        .send({ id, created: true, token, message: "Registered" });
    });
  }
);

module.exports = router;
