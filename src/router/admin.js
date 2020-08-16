const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require('multer');

//Aquí dispongo lo referido al nombre del arhivo y a donde se va a guardar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '..', '..', 'public', 'img'));
  },
  filename: function (req, file, cb) {
    cb(null, 'notebook_' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({
  storage
})

const controllersAdmin = require(path.resolve(__dirname, '..', 'controllers', 'controllersAdmin'));

//Rutas
router.get('/administrar', controllersAdmin.admin);
router.get("/administrar/create", controllersAdmin.create);
//router.post("/administrar/create", controllersAdmin.save);
router.post("/administrar/create", upload.single('imagen'), controllersAdmin.save);
router.get('/administrar/detail/:id', controllersAdmin.show);
router.get('/administrar/delete/:id', controllersAdmin.destroy);
router.get('/administrar/edit/:id', controllersAdmin.edit);
router.put('/administrar/edit/:id', upload.single('imagen'), controllersAdmin.update);

module.exports = router;