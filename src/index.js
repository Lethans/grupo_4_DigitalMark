const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');

//Paquetes para trabajar session y cookies
const session = require('express-session');
const cookieParser = require('cookie-parser');


//Requerir el middleware que controla si el usuario está o no Logueado
const acceso = require(path.resolve(__dirname,'middlewares', 'acceso'));

//Archivos estaticos para express
app.use(express.static(path.resolve(__dirname, '..', 'public')));

//Motor de plantillas
app.set('view engine', 'ejs');
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({
    extended: false
}));

//Capturar datos que vienen de formularios
app.use(express.urlencoded({
    extended: false
}));
//app.use(express.json());
//Middleware para manejar los metodos PUT/DELETE
app.use(methodOverride('_method'));

// Middlewares de session
app.use(session({
    secret: 'topSecret',
    resave: true,
    saveUninitialized: true,
}))

//Middleware para activar cookies
app.use(cookieParser());
app.use(acceso);

//Traigo el archivo de rutas y lo implemento
const webRoutes = require('./router/web');
const userRoutes = require('./router/user');
const productRoutes = require('./router/products');
const adminRoutes = require('./router/admin');

app.use(webRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(adminRoutes);


app.listen(2001, 'localhost', () => console.log('Servidor corriendo en el puerto 2000'));