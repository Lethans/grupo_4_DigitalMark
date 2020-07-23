const path = require('path');
const fs = require('fs');

//Render con ejs, sendFile con html.
module.exports = {
    productsDetails: (req, res) => {
        let notebooks = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'notebooks.json')));
        let marcas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'marcas.json')));

        let selectedNotebook = "";
        notebooks.forEach(notebook => {
            if (notebook.id == req.params.id) {
                selectedNotebook = notebook;
            }
        });
        res.render(path.resolve(__dirname, '..', 'views', 'productos', 'productDetails'), {
            selectedNotebook,marcas
        });
    },
}