const path = require('path');
const fs = require('fs');

//Render con ejs, sendFile con html.
module.exports = {
    productsDetails: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'productos', 'productDetails'));
    },
}