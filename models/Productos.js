const mongoose = require('mongoose');


const ProductoSchema = new mongoose.Schema(
    {
        id : {
            type : String,
            required : true,
            unique : true
        },
        nombre : {
            type : String,
            required : true
        },
        precio : {
            type : String,
            required: true
        }
    }
);
module.exports = mongoose.model("productos", ProductoSchema);