const mongoose = require("mongoose");

const dbConnected = async () => {
    try{
       await mongoose.connect(process.env.DB_CNN);
        console.log("conectando DB");
    }
    catch (error){
        console.log(error);
        throw new Error("Error en la coneccion con la database");
    }
}

module.exports = {
    dbConnected
}