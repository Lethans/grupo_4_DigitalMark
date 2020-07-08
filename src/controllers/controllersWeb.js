const path = require('path');
const fs = require('fs');

//Render con ejs, sendFile con html.
module.exports = {
    index: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'web', 'index'));

    },
    category: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'web', 'category'));
    },
    error: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'web', 'error'));
    },
}