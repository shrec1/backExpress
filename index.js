const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors');
const productosRoutes = require('./controllers/ProductosController');
const usuariosRoutes = require('./controllers/UsuariosController');
const bcrypt = require('bcryptjs');
//const ObjectId = mongoose.Types.ObjectId;
//const { ObjectId } = mongoose.Types;

const Usuarios = require('./models/Usuarios');


const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Error conexion', err));


async function hashPasswords() {
  try {
      const users = await Usuarios.find({}); // Encuentra todos los usuarios
      if (!users.length) {
          console.log('No hay usuarios en la base de datos');
          return;
      }

      for (let user of users) {
          // Si la contraseña ya está hasheada, puedes omitir el hasheo
          if (!user.password.startsWith('$2b$') && !user.password.startsWith('$2a$')) { 
              const hashedPassword = await bcrypt.hash(user.password, 10);
              user.password = hashedPassword;
              await user.save();
              console.log(`Contraseña del usuario con id ${user._id} hasheada.`);
          } else {
              console.log(`La contraseña del usuario con id ${user._id} ya está hasheada.`);
          }
      }
  } catch (err) {
      console.error('Error al hashear contraseñas:', err);
  }
}

// Llamada al método de hasheo

  


// Ejemplo de uso



app.use('/api/productos',productosRoutes);
app.use('/api/usuarios',usuariosRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})





app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

