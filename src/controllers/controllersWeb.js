const path = require('path');
const fs = require('fs');

const {
    Product,
    Model,
    Brand
} = require('../database/models/');
//Variable Json con los datos de productos.
//let notebooks = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'notebooks.json')));
//let marcas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'marcas.json')));


//Render con ejs, sendFile con html.
module.exports = {
    index: function (req, res) {
        const marcas = Brand.findAll();
        const notebooks = Product.findAll({
            include: {
                all: true,
                nested: true,
            }
        });
        Promise.all([marcas, notebooks])
            .then(([marcas, notebooks]) => res.render(path.resolve(__dirname, '..', 'views', 'web', 'index'), {
                notebooks,
                marcas
            }))
            .catch(errors => res.send(errors));
    },
    category: function (req, res) {

        const selectedBrandd =
            Brand.findOne({
                where: {
                    name: req.params.name
                },
            })

        const marcass = Brand.findAll();
        const modeloss = Model.findAll();
        const notebookss = Product.findAll({
            include: {
                all: true,
                nested: true,
            }
        });

        Promise.all([marcass, notebookss, modeloss, selectedBrandd])
            .then(([marcas, notebooks, modelos, selectedBrand]) => {
                if (selectedBrand == null) {
                    selectedBrand = undefined
                }
                res.render(path.resolve(__dirname, '..', 'views', 'web', 'category'), {
                    notebooks,
                    marcas,
                    modelos,
                    selectedBrand
                })
            })
            .catch(errors => res.send(errors));

        // const categorias = Category.findAll();
        // const platos = Dish
        // .findAll({
        //     where: {categoryId : req.query.categoria},
        //     include: [{association: 'category'}]
        // })
        // Promise.all([platos,categorias])
        // .then(([platos,categorias]) =>
        //return res.send(platoComida);
        //     res.render(path.resolve(__dirname, '..','views','productos','productos'), {platos,categorias })
        // ) 
        //let selectedBrand;
        // marcas.forEach(marca => {
        //     if (marca.nombre == req.params.id) {
        //         selectedBrand = marca.nombre;
        //     }
        // });
        // res.render(path.resolve(__dirname, '..', 'views', 'web', 'category'), {
        //     selectedBrand,
        //     notebooks,
        //     marcas
        // });
    },
    test: function (req, res) {
        //const test = getProduct.then(test => res.send(test));
        res.render(path.resolve(__dirname, '..', 'views', 'web', 'test'))

    }
    // login: function (req, res) {

    //     let selectedBrand;
    //     marcas.forEach(marca => {
    //         if (marca.nombre == req.params.id) {
    //             selectedBrand = marca.nombre;
    //         }
    //     });
    //     res.render(path.resolve(__dirname, '..', 'views', 'usuarios', 'login'), {
    //         selectedBrand,
    //         notebooks,
    //         marcas
    //     });

    // },
    // register: function (req, res) {

    //     let selectedBrand;
    //     marcas.forEach(marca => {
    //         if (marca.nombre == req.params.id) {
    //             selectedBrand = marca.nombre;
    //         }
    //     });
    //     res.render(path.resolve(__dirname, '..', 'views', 'usuarios', 'register'), {
    //         selectedBrand,
    //         notebooks,
    //         marcas
    //     });

    // }

}