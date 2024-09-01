const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");


const validarCampos = (req, res, next) => {
    
    const errores = validationResult(req)
    if (!errores.isEmpty()){
        return res.status(400).json({
           ok:false,
           error: errores.mapped()         
        });
    }

    next();
    
}

const ValidarJWT = (req, res, next) => {

    const token = req.header("Authentication");
    
    if(!token){
        return res.status(401).json({
            ok:false,
            msg: "no hay ningun token valido"
        });
    }

    try {

        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

       next();
            
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok:false,
            msg: "token no es valido"
        });
            
    }

}

module.exports = {
    validarCampos,
    ValidarJWT
}