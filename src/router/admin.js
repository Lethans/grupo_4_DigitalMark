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
const auth = require(path.resolve(__dirname, '..', 'middlewares', 'auth'));

//Rutas
router.get('/administrar', auth, controllersAdmin.admin);
router.get("/administrar/create", auth, controllersAdmin.create);
router.post("/administrar/createbrand", auth, controllersAdmin.saveBrand);
router.post("/administrar/createmodel", auth, controllersAdmin.saveModel);
router.post("/administrar/createcategory", auth, controllersAdmin.saveCategory);
router.post("/administrar/createatribute", auth, controllersAdmin.saveAtribute);
router.post("/administrar/createaimage", auth, upload.single('imagen'), controllersAdmin.saveImage);
router.post("/administrar/createcomponent", auth, controllersAdmin.saveComponent);

//router.post("/administrar/create", controllersAdmin.save);
router.post("/administrar/create", auth, upload.any(), controllersAdmin.save);
router.get('/administrar/detail/:id', auth, controllersAdmin.show);
router.get('/administrar/delete/:id', auth, controllersAdmin.destroy);
router.get('/administrar/deleteBrand/:id', auth, controllersAdmin.destroyBrand);
router.get('/administrar/deleteModel/:id', auth, controllersAdmin.destroyModel);
router.get('/administrar/deleteCategory/:id', auth, controllersAdmin.destroyCategory);
router.get('/administrar/deleteAttributes/:id', auth, controllersAdmin.destroyAttributes);
router.get('/administrar/deleteImages/:id', auth, controllersAdmin.destroyImages);
router.get('/administrar/deleteComponents/:id', auth, controllersAdmin.destroyComponents);
router.get('/administrar/edit/:id', auth, controllersAdmin.edit);
router.put('/administrar/edit/:id', auth, upload.single('imagen'), controllersAdmin.update);

module.exports = router;