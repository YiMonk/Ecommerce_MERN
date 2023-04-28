const userModel = require("../models/userModel");

const authAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findOneAndDelete({
            _id: req.user.id
        });
        if (user.role === 0)
            return res.status(400).json({ msg: "Acceso denegado, solo para administradores" });
        next()

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

module.exports = authAdmin