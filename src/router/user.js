const express = require('express');
const router = express.Router();
const path = require('path');

const bcrypt = require('bcryptjs');
const fs = require('fs');
const multer = require('multer');

//Requiero el paquete expres-validator
const {
  check,
  validationResult,
  body
} = require('express-validator');

const db = require('../database/models');
const User = db.User;

//Requerir el modulo de los controladores
const controllersUser = require(path.resolve(__dirname, '..', 'controllers', 'controllersUser'));

//Aquí aperturo mi archivo de usuarios, ya que al registrarse un usuario es conveniente buscar que no exista una ya registrado con el mismo email o id o el campo que utlicen para identificar al usuario.

let archivoUsuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'models', 'usuarios.json')))


//Aquí le incoporé lo referido a la carga de la imagen

//Aquí dispongo la información del storage para tratamiento de guardado imagenes
//https://www.npmjs.com/package/multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/img/users')); //Aquí deben indicar donde van a guardar la imagen
  },
  filename: function (req, file, cb) {
    cb(null, 'foto' + '-' + Date.now() + path.extname(file.originalname)); //UNIQID() --- PHP
  }
})

const upload = multer({
  storage
})


// Métodos en nuestros controladores: index - show - edit - delete 
router.get('/register', controllersUser.register);
router.get('/login', controllersUser.login);
router.post('/login', [
  check('email').isEmail().withMessage('Agregar email válido'),
  check('password').isLength({
    min: 6
  }).withMessage('Mínimo de 6 caractéres'),
  body('email').custom((value) => {
    for (let i = 0; i < archivoUsuarios.length; i++) {
      if (archivoUsuarios[i].email == value) {
        return true
      }
    }
    return false
  }).withMessage('Usuario no registrado'),

  //Aquí valido si la contraseña colocada es la misma a la que tenemos hasheada
  body('password').custom((value, {
    req
  }) => {
    for (let i = 0; i < archivoUsuarios.length; i++) {
      if (archivoUsuarios[i].email == req.body.email) {
        if (bcrypt.compareSync(value, archivoUsuarios[i].password)) {
          return true;
        } else {
          return false;
        }
      }
    }

  }).withMessage('Contraseña incorrecta'),
], controllersUser.ingresar);

//Aqui en esta ruta envio al controlador el avatar del usuario así como las respectivas validaciones

router.post('/register', upload.single('avatar'), [
  //Aquí incoporé otras validaciones, para que las tengan de guía para sus proyectos  
  check('firstName').isLength({
    min: 1
  }).withMessage('Nombre no puede estar vacío'),
  check('lastName').isLength({
    min: 1
  }).withMessage('Apellido no puede estar vacío'),
  check('email').isEmail().withMessage('Agregar un email válido'),

  //Aquí valido el Password   
  check('password').isLength({
    min: 6
  }).withMessage('Mínimo de 6 caractéres'),

  //Aquí valido la confimación del password dispuesto por el usuario
  check('confirm_password').isLength({
    min: 6
  }).withMessage('Mínimo de 6 caractéres'),

  //Aquí valido si las contraseñas son iguales o no
  //El ( value ) viene a ser el valor que viaje en el name del del input del campo 
  //El valor { req } corresponde a lo que viene desde el formulario

  body('confirm_password').custom((value, {
    req
  }) => {
    if (req.body.password == value) {
      return true // Si yo retorno un true  no se muestra el error     
    } else {
      return false // Si retorno un false si se muestra el error
    }
  }).withMessage('Las contraseñas deben ser iguales'),

  body('email').custom(async value => Array.from(await User.findAll()).filter(usuario => usuario.email == value).length > 0 ? Promise.reject("Usuario Existente") : true),

  /*body('email').custom((value, {
    req
  }) => {
    let exist = archivoUsuarios.find(usuario => usuario.email == req.body.email);

    if (exist != undefined) {
      return false // Si yo retorno un true  no se muestra el error     
    } else {
      return true // Si retorno un false si se muestra el error
    }
  }).withMessage('Direccion ya registrada'),*/

  //Aquí obligo a que el usuario seleccione su avatar
  body('avatar').custom((value, {
    req
  }) => {
    if (req.file != undefined) {
      return true
    }
    return false;
  }).withMessage('Debe elegir su avatar en formato: .JPG ó JPEG ó PNG')
], controllersUser.create);

//Esta es la ruta que se activa al momento que el usuario desea salir de la página
router.get('/logout', controllersUser.logout);
module.exports = router;