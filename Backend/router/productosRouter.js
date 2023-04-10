const express = require("express");
const router = express.Router();
const productoModel = require("../models/productosModel");
const { check, validationResult } = require("express-validator");


// Ver todos los productos ----------------------------------------------------------------------------

router.get("/all", async (req, res) => {
  try {
    const productos = await productoModel.find({});
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ver un producto --------------------------------------------------------------------------------------

router.get("/detalles/:id", async (req, res) => {
  const { id } = req.params;

  const productos = await productoModel.findById(id);

  if (!productos) {
    res.json({ message: "Producto no existe", status: 0 });
    return;
  }

  res.json(productos);
});

// Agregar producto ----------------------------------------------------------------------------
router.post(
  "/add",
  check("nombre", "Introduce nombre del producto").not().isEmpty(),
  check("precio", "Introduce precio del producto").not().isEmpty(),
  check("img", "Add img").not().isEmpty(),
  check("descripcion", "Introduce descripcion del producto").not().isEmpty(),
  (req, res) => {
    const { nombre, precio, img, descripcion } = req.body;

    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.json({ error: error.array(), status: 0 });
      return;
    }

    const newProduct = new productoModel({
      nombre, 
      precio, 
      img, 
      descripcion,
    });

    newProduct.save().then((docs) => {
      res.send({ message: "Producto agregado", status: 1, docs });
    });
  }
);

module.exports = router;
