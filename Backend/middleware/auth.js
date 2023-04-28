const jwt = require("jsonwebtoken")
const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(500).json({ msg: "Autenticacion invalida" });

        jwt.verify(token, process.env.AccessTokenSecret, (error, user) => {
            if (error) return res.status(500).json({ msg: "Autenticacion invalida del token secreto" });

            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

module.exports = auth;