const express = require('express');
const router = express.Router();
const path = require('path');


const controllersProducts = require(path.resolve(__dirname, '..', 'controllers', 'controllersProducts'));
//Rutas
router.get('/detalles/:id', controllersProducts.productsDetails);
router.get('administrar/detalles/:id', controllersProducts.productsDetails);


module.exports = router;