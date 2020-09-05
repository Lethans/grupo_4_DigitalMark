const express = require('express');
const router = express.Router();
const path = require('path');
const controllersWeb = require(path.resolve(__dirname, '..', 'controllers', 'controllersWeb'));


//Rutas
router.get('/', controllersWeb.index);
router.get('/categorias', controllersWeb.category);
router.get('/categorias/?:id', controllersWeb.category);
router.get('/test', controllersWeb.test);


module.exports = router;