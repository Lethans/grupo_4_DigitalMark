const path = require('path');
const fs = require('fs');

//Render con ejs, sendFile con html.
module.exports = {
    admin: function (req, res) {
        let notebooks = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'notebooks.json')));
        res.render(path.resolve(__dirname, '..', 'views', 'admin', 'administrar'), {
            notebooks
        });
    },
    create: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'admin', 'create'));
    },
    save: (req, res) => {
        let notebooks = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'notebooks.json')));
        //res.send(req.body);
        //console.log(req.body);
        //return res.send(req.file);
        let nuevoProducto = {
            id: notebooks.length + 1,
            nombre: req.body.nombre,
            marca: req.body.marca,
            modelo: req.body.modelo,
            descripcion: req.body.descripcion,
            precio: req.body.precio,

        };
        //Aquí se agrega al array el nuevo Producto
        notebooks.push(nuevoProducto);
        //Convertir mi array en un string
        let nuevoProductoGuardar = JSON.stringify(notebooks, null, 2)
        //Guardar o reemplazar nuestro archivo JSON
        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'notebooks.json'), nuevoProductoGuardar);
        res.redirect('/administrar');
    },
    show: (req, res) => {
        let notebooks = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'notebooks.json')));
        //res.send(req.params.id);
        let miNotebook;
        notebooks.forEach(notebook => {
            if (notebook.id == req.params.id) {
                miNotebook = notebook;
            }
        });
        res.render(path.resolve(__dirname, '..', 'views', 'productos', 'productDetails'), {
            miNotebook
        })

    },
    destroy: (req, res) => {
        let notebooks = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'notebooks.json')));
        const notebookDeleteId = req.params.id;
        const notebookFinal = notebooks.filter(notebook => notebook.id != notebookDeleteId);
        let notebooksGuardar = JSON.stringify(notebookFinal, null, 2);
        //Guardar o reemplazar nuestro archivo JSON
        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'notebooks.json'), notebooksGuardar);
        res.redirect('/administrar');
    },
    edit: (req, res) => {
        let notebooks = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'notebooks.json')));
        const notebookId = req.params.id;
        let notebookEditar = notebooks.find(notebook => notebook.id == notebookId);
        res.render(path.resolve(__dirname, '..', 'views', 'admin', 'edit'), {
            notebookEditar
        });
    },
    update: (req, res) => {
        let notebooks = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'notebooks.json')));
        let notebookOriginal = notebooks.find(notebook => notebook.id == req.params.id);
        req.body.id = req.params.id;
        //Esto es para que si viene vacio la info de ese campo, no se borre y se guarde la que ya existia
        req.params.procesador == undefined ? req.body.procesador = notebookOriginal.procesador : req.body.procesador = req.params.procesador;
        req.params.memoriaRam == undefined ? req.body.memoriaRam = notebookOriginal.memoriaRam : req.body.memoriaRam = req.params.memoriaRam;
        req.params.discoRigido == undefined ? req.body.discoRigido = notebookOriginal.discoRigido : req.body.discoRigido = req.params.discoRigido;
        req.params.pantalla == undefined ? req.body.pantalla = notebookOriginal.pantalla : req.body.pantalla = req.params.pantalla;
        req.params.sistemaOperativo == undefined ? req.body.sistemaOperativo = notebookOriginal.sistemaOperativo : req.body.sistemaOperativo = req.params.sistemaOperativo;
        req.params.memoriaIntegrada == undefined ? req.body.memoriaIntegrada = notebookOriginal.memoriaIntegrada : req.body.memoriaIntegrada = req.params.memoriaIntegrada;
        req.params.salidaHdmi == undefined ? req.body.salidaHdmi = notebookOriginal.salidaHdmi : req.body.salidaHdmi = req.params.salidaHdmi;
        req.params.puertoRed == undefined ? req.body.puertoRed = notebookOriginal.puertoRed : req.body.puertoRed = req.params.puertoRed;
        req.params.salidaVga == undefined ? req.body.salidaVga = notebookOriginal.salidaVga : req.body.salidaVga = req.params.salidaVga;
        req.params.descripcionCorta == undefined ? req.body.descripcionCorta = notebookOriginal.descripcionCorta : req.body.descripcionCorta = req.params.descripcionCorta;
        req.params.descripcionLarga == undefined ? req.body.descripcionLarga = notebookOriginal.descripcionLarga : req.body.descripcionLarga = req.params.descripcionLarga;
        req.params.oldPrice == undefined ? req.body.oldPrice = notebookOriginal.oldPrice : req.body.oldPrice = req.params.oldPrice;
        req.params.descuento == undefined ? req.body.descuento = notebookOriginal.descuento : req.body.descuento = req.params.descuento;
        req.params.destacado == undefined ? req.body.destacado = notebookOriginal.destacado : req.body.destacado = req.params.destacado;

        req.file != undefined ? req.body.imagen = req.file.filename : req.body.imagen = notebookOriginal.imagen;
        

        let notebooksUpdate = notebooks.map(notebook => {
            if (notebook.id == req.body.id) {
                return notebook = req.body;

            }
            return notebook;
        });
        let notebooksActualizar = JSON.stringify(notebooksUpdate, null, 2);
        //Guardar o reemplazar nuestro archivo JSON
        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'notebooks.json'), notebooksActualizar);
        res.redirect('/administrar');
    }


}