const Router = require('express').Router();
const Users = require('./model.js')
const Eventos = require('./modelEvento.js')

// Login del usuario con email y pass
Router.post('/login', function(req, res) {
  let user = req.body.user
  let pass = req.body.pass
  Users.find({email: user, psw: pass}).exec(function(err,docs) {
      if (err) {
          res.response(500)
          res.send("Error")
      }
      else {
        if (docs.length != 0){
          res.email=req.body.user
          res.send("Validado")
          }
      }
  })
})
//Obtener todos los eventos del usuario
Router.get('/events/all', function(req, res) {
    Eventos.find({}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.send(err)
        }
        res.json(docs)
    })
})

// Agregar un evento
Router.post('/events/new', function(req, res) {
    let evento = new Eventos({
        id: Math.floor(Math.random() * 50),
        title: req.body.title,
        start: req.body.start,
        end: req.body.end
    })
    evento.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Evento guardado")
    })
})

// Eliminar un evento por su id
Router.post('/events/delete/:eventId', function(req, res) {
    let evid = req.body.id
    Eventos.remove({id: evid}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro eliminado")
    })
})


// Modificar un evento por su id
Router.post('/events/update/', function(req, res) {
    let id = req.body.id
    let inicio = req.body.start
    let fin = req.body.end
    Eventos.update({id: id}, {$set: {start: inicio, end: fin}},function(err){
        if (err) {
            res.status(500)
            res.json(err)
        }else{
          res.send("Registro actualizado")
        }

    })
})

module.exports = Router
