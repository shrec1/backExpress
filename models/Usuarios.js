const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuariosSchema = new mongoose.Schema(
    {
       /*  _id: {
            type: mongoose.Schema.Types.ObjectId, // Si el _id es de tipo ObjectId
            required: true
        }, */
        username : {
           type: String,
           required:true
        },
        email : {
            type : String,
            required: true
           
        },
        password : {
            type : String,
            required : true
        },
        role : {
            type: String,
            required : true
        }
    }
);
module.exports = mongoose.model("usuarios", UsuariosSchema);