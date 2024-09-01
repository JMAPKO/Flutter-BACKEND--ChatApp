const jwt = require("jsonwebtoken");

const generarToken = (uid, name, mail) => {

    return new Promise ((resolve, reject) => {

        const payload = {
            uid,
            name,
            mail
        };
    
        jwt.sign(payload, process.env.JWT_KEY,{
            expiresIn: "48h"
        }, (err, token) => {
            
            if (err){
                //no se genero el token
                reject("no se genero el token");
            } else {
                //TOKEN
                resolve( token);
            }
    
        });

    });



}

module.exports = {
    generarToken
}