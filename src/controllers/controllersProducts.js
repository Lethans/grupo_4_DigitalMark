const path = require('path');
const fs = require('fs');
const {
    Product,
    Brand
} = require('../database/models/');

//Render con ejs, sendFile con html.
module.exports = {
    productsDetails: (req, res) => {
        //let notebooks = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'notebooks.json')));
        //let marcas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'marcas.json')));

        const selectedNotebook = Product.findAll({
            where: {
                id: req.params.id
            }
        });
        const marcas = Brand.findAll();
        Promise.all([marcas, selectedNotebook])
            .then(([marcas, selectedNotebook]) => res.render(path.resolve(__dirname, '..', 'views', 'productos', 'newProductDetails'), {
                marcas,
                selectedNotebook
            }))
            .catch(errors => res.send(errors));



        // let selectedNotebook = "";
        // notebooks.forEach(notebook => {
        //     if (notebook.id == req.params.id) {
        //         selectedNotebook = notebook;
        //     }
        // });
        // res.render(path.resolve(__dirname, '..', 'views', 'productos', 'newProductDetails'), {
        //     selectedNotebook,
        //     marcas
        // });
    }
}