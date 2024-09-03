// const express = require('express'); // sintaxis anterior CommonJS
import express from 'express'; // sintaxis de Module, se coloca type:"module" en package.json
import router from './routes/index.js';
import db from './config/db.js';

const app = express(); // se asigna una función para ejecutar express

// Conectar a la base de datos
db.authenticate()
    .then( () => console.log('Base de Datos conectada'))
    .catch( error => console.log(error))

// Definir puerto
const port = process.env.PORT || 4000; // en local la variable no existe, se imprime el 4000

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear(); // locals son como variables internar de express
    res.locals.nombresitio = "Agencia de Viajes";
    next();
});

// Agregar body al parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

// Definir la carptea publica
app.use(express.static('public'));

// Agregar Router
app.use('/', router); // use es get, post, delete, put, path, todas esas

// Arranca el servidor
app.listen(port, () => {  
    console.log(`El servidor está funcionando en el puerto ${port}`);
})


// Template Engine (Vistas)
// PUG, EJS(Embedded JavaScript), HBS (Handlebars.js (mustache.js)), React (similar al react.js)
// Se instalan via NPM, "npm i pug" y se habilitan en el archivo principal "app.set('view engine', 'pug')"

// "npm i express" 
// "npm i --save-dev nodemon" para que se reinicie automáticamente el servidor de Node.js
// "npm i mysql2 sequelize" sequelize seería un ORM

// Para variables de entorno "npm i dotenv"