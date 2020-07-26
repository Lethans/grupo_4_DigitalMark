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
        // touchScreen: false,
        let ssdVar;
        let wifiVar;
        let bluetoothVar;
        let numericKeyboardVar;
        let cdDvdVar;
        let burnCdVar;
        let burnDvdVar;
        let camaraVar;
        let destacadoVar;
        req.body.ssd != undefined ? ssdVar = true : ssdVar = false;
        req.body.touchScreen != undefined ? touchScreenVar = true : touchScreenVar = false;
        req.body.wifi != undefined ? wifiVar = true : wifi = false;
        req.body.bluetooth != undefined ? bluetoothVar = true : bluetoothVar = false;
        req.body.numericKeyboard != undefined ? numericKeyboardVar = true : numericKeyboardVar = false;
        req.body.cdDvd != undefined ? cdDvdVar = true : cdDvdVar = false;
        req.body.burnCd != undefined ? burnCdVar = true : burnCdVar = false;
        req.body.burnDvd != undefined ? burnDvdVar = true : burnDvdVar = false;
        req.body.camara != undefined ? camaraVar = true : camaraVar = false;
        req.body.destacado != undefined ? destacadoVar = true : destacadoVar = false;

        let nuevoProducto = {
            id: notebooks.length + 1,
            nombre: req.body.nombre,
            marca: req.body.marca,
            model: req.body.modelo,
            descripcionCorta: req.body.descripcionCorta,
            descripcionLarga: req.body.descripcionLarga,
            price: req.body.precio,
            procesador: req.body.procesador,
            modProcesador: req.body.modProcesador,
            cpuSpeed: req.body.cpuSpeed,
            ram: req.body.ram,
            rigido: req.body.rigido,
            diskType: req.body.diskType,
            screenSize: req.body.screenSize,
            resolution: req.body.resolution,
            typeScreen: req.body.typeScreen,
            system: req.body.system,
            usbQuantity: req.body.usbQuantity,
            touchScreen: touchScreenVar,
            ssd: ssdVar,
            wifi: wifiVar,
            bluetooth: bluetoothVar,
            numericKeyboard: numericKeyboardVar,
            cdDvd: cdDvdVar,
            burnCd: burnCdVar,
            burnDvd: burnDvdVar,
            camara: camaraVar,
            destacado: destacadoVar,
            size: req.body.size,
            weight: req.body.weight,
            batery: req.body.batery,
            oldPrice: req.body.oldPrice,
            descuento: req.body.descuento,
            imagen: req.body.imagen,
            stock: req.body.stock,
            cuotas: req.body.cuotas
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
        req.params.modProcesador == undefined ? req.body.modProcesador = notebookOriginal.modProcesador : req.body.modProcesador = req.params.modProcesador;
        req.params.cpuSpeed == undefined ? req.body.cpuSpeed = notebookOriginal.cpuSpeed : req.body.cpuSpeed = req.params.cpuSpeed;
        req.params.ram == undefined ? req.body.ram = notebookOriginal.ram : req.body.ram = req.params.ram;
        req.params.rigido == undefined ? req.body.rigido = notebookOriginal.rigido : req.body.rigido = req.params.rigido;
        req.params.diskType == undefined ? req.body.diskType = notebookOriginal.diskType : req.body.diskType = req.params.diskType;
        req.params.screenSize == undefined ? req.body.screenSize = notebookOriginal.screenSize : req.body.screenSize = req.params.screenSize;
        req.params.resolution == undefined ? req.body.resolution = notebookOriginal.resolution : req.body.resolution = req.params.resolution;
        req.params.typeScreen == undefined ? req.body.typeScreen = notebookOriginal.typeScreen : req.body.typeScreen = req.params.typeScreen;
        req.params.system == undefined ? req.body.system = notebookOriginal.system : req.body.system = req.params.system;
        req.params.usbQuantity == undefined ? req.body.usbQuantity = notebookOriginal.usbQuantity : req.body.usbQuantity = req.params.usbQuantity;
        req.params.size == undefined ? req.body.size = notebookOriginal.size : req.body.size = req.params.size;
        req.params.weight == undefined ? req.body.weight = notebookOriginal.weight : req.body.weight = req.params.weight;
        req.params.batery == undefined ? req.body.batery = notebookOriginal.batery : req.body.batery = req.params.batery;
        req.params.descripcionCorta == undefined ? req.body.descripcionCorta = notebookOriginal.descripcionCorta : req.body.descripcionCorta = req.params.descripcionCorta;
        req.params.descripcionLarga == undefined ? req.body.descripcionLarga = notebookOriginal.descripcionLarga : req.body.descripcionLarga = req.params.descripcionLarga;
        req.params.oldPrice == undefined ? req.body.oldPrice = notebookOriginal.oldPrice : req.body.oldPrice = req.params.oldPrice;
        req.params.descuento == undefined ? req.body.descuento = notebookOriginal.descuento : req.body.descuento = req.params.descuento;
        req.params.cuotas == undefined ? req.body.cuotas = notebookOriginal.cuotas : req.body.cuotas = req.params.cuotas;

        req.body.ssd != undefined ? req.body.ssd = true : req.body.ssd = false;
        req.body.touchScreen != undefined ? req.body.touchScreen = true : req.body.touchScreen = false;
        req.body.wifi != undefined ? req.body.wifi = true : req.body.wifi = false;
        req.body.bluetooth != undefined ? req.body.bluetooth = true : req.body.bluetooth = false;
        req.body.numericKeyboard != undefined ? req.body.numericKeyboard = true : req.body.numericKeyboard = false;
        req.body.cdDvd != undefined ? req.body.cdDvd = true : req.body.cdDvd = false;
        req.body.burnCd != undefined ? req.body.burnCd = true : req.body.burnCd = false;
        req.body.burnDvd != undefined ? req.body.burnDvd = true : req.body.burnDvd = false;
        req.body.camara != undefined ? req.body.camara = true : req.body.camara = false;
        req.body.destacado != undefined ? req.body.destacado = true : req.body.destacado = false;

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