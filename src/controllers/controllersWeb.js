const path = require('path');
const fs = require('fs');

//Variable Json con los datos de productos.
let notebooks = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'notebooks.json')));
let marcas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'marcas.json')));


//Render con ejs, sendFile con html.
module.exports = {
    index: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'web', 'index'), {
            notebooks,
            marcas
        });
    },
    category: function (req, res) {

        let selectedBrand;
        marcas.forEach(marca => {
            if (marca.nombre == req.params.id) {
                selectedBrand = marca.nombre;
            }
        });
        res.render(path.resolve(__dirname, '..', 'views', 'web', 'category'), {
            selectedBrand,
            notebooks,
            marcas
        });
    },
    error: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'web', 'error'));
    },
    login: function (req, res) {
        
        let selectedBrand;
        marcas.forEach(marca => {
            if (marca.nombre == req.params.id) {
                selectedBrand = marca.nombre;
            }
        });
        res.render(path.resolve(__dirname, '..', 'views', 'usuarios', 'login'), {
            selectedBrand,
            notebooks,
            marcas
        });
        
    },
   register: function (req, res) {
        
        let selectedBrand;
        marcas.forEach(marca => {
            if (marca.nombre == req.params.id) {
                selectedBrand = marca.nombre;
            }
        });
        res.render(path.resolve(__dirname, '..', 'views', 'usuarios', 'register'), {
            selectedBrand,
            notebooks,
            marcas
        });
        
    }

}