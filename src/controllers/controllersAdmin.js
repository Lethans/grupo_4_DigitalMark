const path = require('path');
const fs = require('fs');
let notebooks =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','notebooks.json')));

//Render con ejs, sendFile con html.
module.exports = {
    admin: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'admin', 'administrar'),{notebooks});
    },
    create: (req, res) =>{
        let relojes =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','notebooks.json')));
        res.render(path.resolve(__dirname, '..','views','admin','create'));
    },
    save: (req,res)=>{
        let relojes =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','notebooks.json')));
        //res.send(req.body);
        //console.log(req.body);
        //return res.send(req.file);
        let nuevoProducto={
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
            let nuevoProductoGuardar = JSON.stringify(notebooks,null,2)
            //Guardar o reemplazar nuestro archivo JSON
            fs.writeFileSync(path.resolve(__dirname,'..','data','notebooks.json'), nuevoProductoGuardar);
            res.redirect('/administrar');
    },
    show: (req,res)=>{
        let relojes =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','notebooks.json')));
        //res.send(req.params.id);
        let miNotebook;
        notebooks.forEach(notebook => {
           if(notebook.id == req.params.id){
               miNotebook = notebook;         
            }
        });
        res.render(path.resolve(__dirname, '..','views','productos','productDetails'), {miNotebook})
    
    },
    destroy: (req,res) =>{
        let relojes =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','notebooks.json')));
        const notebookDeleteId = req.params.id; 
        const notebookFinal = notebooks.filter(notebook => notebook.id != notebookDeleteId);
        let notebooksGuardar = JSON.stringify(notebookFinal,null,2);
        //Guardar o reemplazar nuestro archivo JSON
        fs.writeFileSync(path.resolve(__dirname,'..','data','notebooks.json'), notebooksGuardar);
        res.redirect('/administrar');
    },   
    edit: (req,res) =>{
        let notebooks =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','notebooks.json')));
        const notebookId = req.params.id;
        let notebookEditar = notebooks.find(notebook => notebook.id == notebookId);
        res.render(path.resolve(__dirname, '..','views','admin','edit'), {notebookEditar});
    },
    update: (req,res) =>{
        let notebooks =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','notebooks.json')));//revisar
        req.body.id = req.params.id;
        req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
        let notebooksUpdate = notebooks.map(notebook => {
            if(notebook.id  == req.body.id){
                return notebook = req.body;
            }
            return notebook;
        });
        let notebooksActualizar = JSON.stringify(notebooksUpdate,null,2);
        //Guardar o reemplazar nuestro archivo JSON
        fs.writeFileSync(path.resolve(__dirname,'..','data','notebooks.json'), notebooksActualizar);
        res.redirect('/administrar');

    }


}