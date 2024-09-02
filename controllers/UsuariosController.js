const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
secretKey = 'asd';

const Usuario = require('../models/Usuarios');

function generateToken(user) {
    const payload = {
        id: user._id,
        username: user.username,
        role: user.role
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}

router.get('/',async (req,res) =>{

    try {
        const user = await Usuario.find();
        res.json(user);
        //console.log('Valor de variable:', Productos); // Verás esto en la consola
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
 
});
router.post('/login',async(req,res) =>{
    const email = req.body.email;
    const password = req.body.password;

    Usuario.findOne({ email })
    .then(user => {
        //if user not exist than return status 400
        if (!user) return res.status(400).json({ msg: "User not exist" })

        //if user exist than compare password
        //password comes from the user
        //user.password comes from the database
        bcrypt.compare(password, user.password, (err, data) => {
            console.log(user.email);
            console.log(user.password);
            //if error than throw error
            if (err) throw err

            //if both match than you can do anything
            if (data) {
                const token = generateToken(user);

                res.json({
                    success : true,
                    message: 'Authentication successful!',
                    token: token,
                })
                //return res.status(200).json({ msg: "Login success" })
            } else {
                return res.status(401).json({ msg: "Invalid credencial" })
            }
        })
    })
    
});
router.post('/register', async (req, res) => {
    
    const user = await Usuario.findOne({ email: req.body.email })
   if (user) {
       return res.status(400).send('User already exisits. Please sign in')
   } else {
       try {
           const salt = await bcrypt.genSalt(10)
           const password = await bcrypt.hash(req.body.password, salt)
           const user = new Usuarios({
               username: req.body.username,
               email: req.body.email,
               password: password,
               role : req.body.role

           })
           await user.save()
           return res.status(201).json(user)
       } catch (err) {
           return res.status(400).json({ message: err.message })
       }
   }
});


  

module.exports = router;