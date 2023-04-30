const express = require("express");
const router = express.Router();
const productoModel = require("../models/productosModel");
const { check, validationResult } = require("express-validator");
const authAdmin = require("../middleware/authAdmin");


// Ver todos los productos ----------------------------------------------------------------------------

router.get("/all",
  async (req, res) => {
    try {
      const productos = await productoModel.find({});
      res.json(productos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Ver un producto --------------------------------------------------------------------------------------

router.get("/detalles/:id",
  async (req, res) => {
    const { id } = req.params;

    const productos = await productoModel.findById(id);

    if (!productos) {
      res.json({ message: "Producto no existe", status: 0 });
      return;
    }

    res.json(productos);
  });

// Agregar producto ----------------------------------------------------------------------------
router.post("/add",authAdmin,
  check("nombre", "Introduce nombre del producto").not().isEmpty(),
  check("precio", "Introduce precio del producto").not().isEmpty(),
  check("imagen", "Add imagen").not().isEmpty(),
  check("descripcion", "Introduce descripcion del producto").not().isEmpty(),
  (req, res) => {
    const { nombre, precio, imagen, descripcion } = req.body;

    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.json({ error: error.array(), status: 0 });
      return;
    }

    const newProduct = new productoModel({
      nombre,
      precio,
      imagen,
      descripcion,
    });

    newProduct.save().then((docs) => {
      res.send({ message: "Producto agregado", status: 1, docs });
    });
  }
);

// Actualizar producto ----------------------------------------------------------------------------
router.put("/updateProduct/:id", authAdmin,
 async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await productoModel.findById(id);
    if (!producto) {
      res.json({ message: "Producto no existe", status: 0 });
      return;
    }

    const { nombre, descripcion, precio, imagen } = req.body;
    await productoModel.findByIdAndUpdate(id, {
      nombre: nombre.toLowerCase(),
      descripcion,
      precio,
      imagen,
    });
    res.json({ mensaje: "Producto actualizado exitosamente" });

  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
});

// Eliminar producto --------------------------------------------------------------------------------
router.delete("/deleteProduct/:id", authAdmin,
 async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await productoModel.findByIdAndDelete(id);
    if (!producto) {
      res.json({ mensaje: "Producto no encontrado", status: 0 });
      return;
    }

    res.json({ mensaje: "Producto eliminado exitosamente" });
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
}); 


module.exports = router;
