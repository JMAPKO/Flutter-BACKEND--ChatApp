const {Schema, model, Types} = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: true 
    },

    pass: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    online: {
        type: Boolean,
        default: false
    }
});

module.exports = model("Usuario", UserSchema);