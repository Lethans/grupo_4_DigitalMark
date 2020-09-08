const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const {
  validationResult,
} = require('express-validator');

const {
  User,
  Brand
} = require('../database/models/');

//let marcas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'marcas.json')));
// let provincia = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'models', 'provincias.json')));

// let provincias = provincia.sort(function (a, b) {
//   if (a.nombre > b.nombre) {
//     return 1;
//   }
//   if (a.nombre < b.nombre) {
//     return -1;
//   }
// a debe ser igual a b
//   return 0;
// });

const controllersUser = {
  login: function (req, res) {
    Brand.findAll()
      .then(marcas => res.render(path.resolve(__dirname, '..', 'views', 'usuarios', 'login'), {
        marcas
      }))
      .catch(errors => res.send(errors));
  },
  register: function (req, res) {
    Brand.findAll()
      .then(marcas => res.render(path.resolve(__dirname, '..', 'views', 'usuarios', 'register'), {
        marcas
      }))
      .catch(errors => res.send(errors));
  },
  create: (req, res, next) => {
    let errors = validationResult(req);
    console.log(errors.mapped());
    if (!errors.isEmpty()) {
      Brand.findAll()
        .then(marcas => res.render(path.resolve(__dirname, '..', 'views', 'usuarios', 'register'), {
          errors: errors.mapped(),
          marcas,
          old: req.body
        }))
        .catch(errors => res.send(errors));

      //return res.send(errors.mapped());

      //Aquí incoporé el old: req.body  --> Para poder enviar a la vista los datos que el usuario indique y no tienen errores entonces deben persistir lo que coloco el usuario

      //Si desean especificar debajo de cada input el mendaje de error específico, entonces deben enviar a la vista los errores de la siguiente manera: errors: errors.mapped()
      //Después en la vista para mostrar debajo del input el respectivo error sólo deben hacer lo siguiente:
      /*
        <div class="col-12">
							<label for="username" class="form-label">Username: *</label>
							<input type="text" id="username" name="username" placeholder="Ej: Daniel" class="form-input"
								value="<%= typeof old != 'undefined' ? old.username : '' %>">
							<p class="text-danger"><%= typeof errors == 'undefined' ? '' : errors.username ? errors.username.msg : '' %></p>
				</div> 
        */
    } else {
      // let user = {
      //   firstName: req.body.firstName,
      //   lastName: req.body.lastName,
      //   email: req.body.email,
      //   password: bcrypt.hashSync(req.body.password, 10),
      //   avatar: req.file ? req.file.filename : '',
      //   rolId: 1
      // }
      req.body.avatar = req.file ? req.file.filename : '';
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      req.body.rolId = 0;

      User.create(req.body)
        .then(() => res.redirect('/login'))
        .catch(error => console.log(error));


      // let archivoUsers = fs.readFileSync(path.resolve(__dirname, '..', 'models', 'usuarios.json'), {
      //   encoding: 'utf-8'
      // });
      // let users;
      // if (archivoUsers == "") {
      //   users = [];
      // } else {
      //   users = JSON.parse(archivoUsers);
      // };
      // users.push(user);
      // usersJSON = JSON.stringify(users, null, 2);
      // fs.writeFileSync(path.resolve(__dirname, '..', 'models', 'usuarios.json'), usersJSON);
    }
  },
  ingresar: (req, res) => {
    // const errors = validationResult(req);
    // let marcas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'marcas.json')));
    //return res.send(errors.mapped());
    let errors = validationResult(req);


    if (!errors.isEmpty()) {
      console.log(errors.mapped())
      Brand.findAll()
        .then(marcas => res.render(path.resolve(__dirname, '..', 'views', 'usuarios', 'login'), {
          errors: errors.mapped(),
          marcas,
          old: req.body
        }))
        .catch(errors => res.send(errors));

    } else {

      User.findAll()
        .then((users) => {

          let usuarioLogueado;

          usuarioLogueado = users.filter(function (user) {
            return user.email == req.body.email &&
              bcrypt.compareSync(req.body.password, user.password)
          });
          console.log(usuarioLogueado[0]);

          if (usuarioLogueado == "") {
            Brand.findAll()
              .then(marcas => {
                return res.render(path.resolve(__dirname, '..', 'views', 'usuarios', 'login'), {
                  marcas,
                  errors: [{
                    msg: "Credenciales invalidas"
                  }]
                })
              });

          } else {
            //Aquí guardo en SESSION al usuario logueado
            delete usuarioLogueado[0].password;
            req.session.user = usuarioLogueado[0];
            req.session.loggedIn = true;

            if (req.body.recordarme) {
              res.cookie('email', usuarioLogueado[0].email, {
                maxAge: 1000 * 60 * 60 * 24
              })
            }

            return res.redirect('/');
          }


        })
    }

    //   let archivoUsuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'models', 'usuarios.json')));
    //   let usuarioLogueado = archivoUsuarios.find(usuario => usuario.email == req.body.email)
    //   //return res.send(usuarioLogueado);
    //   //Como podemos modificar nuestros req.body
    //   delete usuarioLogueado.password;
    //   req.session.user = usuarioLogueado;
    //   req.session.loggedIn = true;

    //   //Aquí voy a guardar las cookies del usuario que se loguea
    //   if (req.body.recordarme) {
    //     res.cookie('email', usuarioLogueado.email, {
    //       maxAge: 1000 * 60 * 60 * 24
    //     })
    //   }
    //   return res.redirect('/'); //Aquí ustedes mandan al usuario para donde quieran (Perfil- home)

    // }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.cookie('email', null, {
      maxAge: -1
    });
    res.redirect('/')
  }

}
module.exports = controllersUser;