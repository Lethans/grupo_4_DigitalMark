const express = require('express');
const router = express.Router();
const path = require('path');


const controllersWeb = require(path.resolve(__dirname, '..', 'controllers', 'controllersProducts'));
//Rutas
router.get('/detalles', controllersWeb.productsDetails);


module.exports = router;