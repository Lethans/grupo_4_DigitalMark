const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const User = db.User;
//let archivoUsuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'models', 'usuarios.json')));

module.exports = (req, res, next) => {
    //Variable locals (super global - vive en las vistas )
    res.locals.user = false;
    if (req.session.user) {
        res.locals.user = req.session.user;
        return next();
    } else if (req.cookies.email) {
        console.log(req.cookies.email);
        User.findOne({
                where: {
                    email: req.cookies.email
                }
            })
            .then(usuario => {
                let user = usuario;
                delete user.password;
                req.session.user = user;
                res.locals.user = user;
                return next();
            })
            .catch(err => res.send(err));
        return next();
    } else {
        return next();
    }
}