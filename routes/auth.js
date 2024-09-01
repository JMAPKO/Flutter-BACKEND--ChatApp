const {Router} = require("express");
const { crearUsuarios, BorrarUsuarios, Login,Renew } = require("../controllers/auth");
const { check } = require("express-validator");// NUEVO - express


const { validarCampos, ValidarJWT } = require("../middleware/errores"); //NUEVO - propio

/*

path: "/user"

*/

// creamos una funcion
const route = Router(); /*uso la funcion de EXPRESS*/

route.post("/new", [
    check("name","no se cargo un nombre de usuario").notEmpty(),
    check("pass","debe crear una contraseña").notEmpty(),
    validarCampos
],
crearUsuarios
);


route.post("/delete",[
check("email", "se necesita un Mail valido para borrar la cuenta").isEmail(),
validarCampos
],
BorrarUsuarios
);

route.post("/login",[
  check("email", "El email no esta asociado a ninguna cuenta").isEmail(),
  check("pass", "La contraseña es incorrecta").notEmpty(),
  validarCampos  
],
Login
);

route.get("/renew",ValidarJWT, Renew );

module.exports = route;
