const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

const Producto = require('../models/Productos');
const Productos = require('../models/Productos');

router.get('/', async (req, res) => {
  
    try {
        const Productos = await Producto.find();
        res.json(Productos);
        //console.log('Valor de variable:', Productos); // Verás esto en la consola
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
 
});
router.get('/:precio', async (req, res) => {
    try {
        const item = await Producto.findOne({precio : req.params.precio});
        if (!item) {
          return res.status(404).json({ message: 'Item no encontrado' });
        }
        res.json(item);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error del servidor' });
      }
  });
  

router.post('/',async (req,res)  => {

    
   const prod = new Producto({
        nombre : req.body.nombre,
        precio : req.body.precio
    }); 
 console.log("------- " , prod)
  
    
    /* try{
        const newProd = await prod.save();
        res.status(201).json(newProd);
    }catch(err){
        res.status(400).json({message: err.message});
    } */
        
});

/* router.post('/',async(req,res) =>{
    
}) */
module.exports = router;

