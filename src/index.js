const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');


//Archivos estaticos para express.
app.use(express.static(path.resolve(__dirname, '..', 'public')));

//Motor de plantillas
app.set('view engine','ejs');
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

//Traigo el archivo de rutas y lo implemento
const webRoutes = require('./router/web');
app.use(webRoutes);
const productRoutes = require('./router/products');
app.use(productRoutes);
const adminRoutes = require('./router/admin');
app.use(adminRoutes);
app.use(methodOverride('_method'));

app.listen(2000, 'localhost', () => console.log('Servidor corriendo en el puerto 3000'));