const express = require('express');
const app = express();
const path = require('path');


//Archivos estaticos para express.
app.use(express.static(path.resolve(__dirname, '..', 'public')));

//Motor de plantillas
app.set('view engine', 'ejs');

//URL encode  - Agarra la informacion del formulario con req.body
app.use(express.urlencoded({ extended: false }));

//Capturar datos que vienen de formularios
app.use(express.urlencoded({
    extended: false
}));
//app.use(express.json());

//Traigo el archivo de rutas y lo implemento
const webRoutes = require('./router/web');
const productRoutes = require('./router/products');
app.use(webRoutes);
app.use(productRoutes);

app.listen(3000, 'localhost', () => console.log('Servidor corriendo en el puerto 3000'));

let pepe = [];
pepe.push("asd");

