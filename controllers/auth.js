const {response} = require("express");
const bcrypt = require("bcryptjs");

const usuario = require("../models/usuario");
const { generarToken } = require("../helpers/jwt");


const crearUsuarios = async (req, res = response) => {

    const {email, pass} = req.body;

    try {

        const existeMail = await usuario.findOne({email});
        if(existeMail){
            return res.status(400).json({
                msg:"ERROR: El email ya fue registrado"
            });
        }


        const user = new usuario(req.body);
        // 4to paso - Encriptar contraseña - Antes de guardar el usuario
        const salt = bcrypt.genSaltSync();
        user.pass = bcrypt.hashSync(String(pass),salt);

        

        await user.save();

        //JWT 
        const token = await generarToken(user.id, user.name, user.email);

        res.json({
            ok: true,
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ //UN ERROR 500 REFIERE A ERROR CON EL SERVIDOR
            ok: false,
            msg: "hable con el ADMIN"
        });
        
    }
    
}

const BorrarUsuarios = (req, res = response) => {
    return res.json({
        ok: true,
        msg: "Te estoy borrando el usuario kpo"
    });
}

const Login = async (req, res = response) => {

    const {email, pass} = req.body;

  try {

    //VALIDAR USUARIO -------------------------------------------
    const UsuarioDB = await usuario.findOne({email});
    if(!UsuarioDB){
        return res.status(404).json({ //ERROR
            ok:false,
            msg: "el usuario no existe o es incorrecto"
        });
    }

    //VALIDAR PASSWORD------------------------------------------------

    const ValidarPass =  bcrypt.compareSync(String(pass), UsuarioDB.pass);
    if(!ValidarPass){
        return res.status(404).json({ //ERROR
            ok:false,
            msg: "La contraseña es incorrecta"
        });
    }

    //GENERAR JWT-----------------------------------------------------

    const token = await generarToken(UsuarioDB.id);
    res.json({
        ok:true,
        token,
        usuario: UsuarioDB
        
        
    });

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ //error de servidor
        ok: false,
        msg: "ERROR - LOGIN: hable con el administrador"
    });
  }
}

const Renew = async (req, res = response) => {

    const uid = req.uid;
    
    const token = await generarToken(uid);

    const reUSER = await usuario.findById(uid);
    


    res.json({
        ok: true,
        reUSER,
        token
    });
}

module.exports = {
    crearUsuarios,
    BorrarUsuarios,
    Login,
    Renew
}