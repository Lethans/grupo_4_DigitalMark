const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const {
  validationResult,
} = require('express-validator');

let provincias = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/provincias.json'))).sort(function (a, b) {
    if (a.nombre > b.nombre) {
      return 1;
    }
    if (a.nombre < b.nombre) {
      return -1;
    }
    // a debe ser igual a b
    return 0;
  });

const controllersUser = {
    login: function(req,res){
      let marcas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'marcas.json')));
      const errors = validationResult(req);
        return res.render(path.resolve(__dirname, '../views/usuarios/login'), {
          errors: errors.mapped(), provincias, marcas, old: req.body
        });

    },
    register: function(req,res){
      let marcas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'marcas.json')));
      let provincias = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/provincias.json')))
      res.render(path.resolve(__dirname, '../views/usuarios/register'),{provincias,marcas});
        },
    create: (req, res, next) => {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        let user = {
          nombre: req.body.first_name,
          apellido: req.body.last_name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          provincia: req.body.provincia,
          avatar:  req.file ? req.file.filename : '',
          role: 1
        }
        let archivoUsers = fs.readFileSync(path.resolve(__dirname, '../models/usuarios.json'), {
          encoding: 'utf-8'
        });
        let users;
        if (archivoUsers == "") {
          users = [];
        } else {
          users = JSON.parse(archivoUsers);
        };
  
        users.push(user);
        usersJSON = JSON.stringify(users, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../models/usuarios.json'), usersJSON);
        res.redirect('/login');
      } 
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

       let marcas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'marcas.json')));

        return res.render(path.resolve(__dirname, '../views/usuarios/register'), {
          errors: errors.mapped(), provincias, marcas, old: req.body
        });
      
    },
    ingresar: (req,res) =>{   
      const errors = validationResult(req);
      let marcas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'marcas.json')));
      //return res.send(errors.mapped());
      if(errors.isEmpty()){
        let archivoUsuarios =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/usuarios.json')));
        let usuarioLogueado = archivoUsuarios.find(usuario => usuario.email == req.body.email)
        //return res.send(usuarioLogueado);
        //Como podemos modificar nuestros req.body
        delete usuarioLogueado.password;
        req.session.usuario = usuarioLogueado;  //Guardar del lado del servidor
        //Aquí voy a guardar las cookies del usuario que se loguea
        if(req.body.recordarme){
          res.cookie('email',usuarioLogueado.email,{maxAge: 1000 * 60 * 60 * 24})
        }
        return res.redirect('/');   //Aquí ustedes mandan al usuario para donde quieran (Perfil- home)
        
      }

console.log(errors.mapped())
        //Devolver a la vista los errores
        res.render(path.resolve(__dirname, '../views/usuarios/login'),{errors:errors.mapped(),marcas,old:req.body});        
      
    },
    logout: (req,res) =>{
      req.session.destroy();
      res.cookie('email',null,{maxAge: -1});
      res.redirect('/')
    }

}
module.exports = controllersUser;
