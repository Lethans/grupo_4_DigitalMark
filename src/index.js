const express = require('express');
const app = express();
const path = require('path');


//Archivos estaticos para express.
app.use(express.static(path.resolve(__dirname, '..', 'public')));

//Motor de plantillas
app.set('view engine','ejs');

//Traigo el archivo de rutas y lo implemento
const webRoutes = require('./router/web');
app.use(webRoutes);
const productRoutes = require('./router/products');
app.use(productRoutes);


app.listen(2000, 'localhost', () => console.log('Servidor corriendo en el puerto 3000'));