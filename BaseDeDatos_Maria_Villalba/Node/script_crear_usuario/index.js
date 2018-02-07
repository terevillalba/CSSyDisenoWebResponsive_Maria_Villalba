var mongoose = require('mongoose')
var Users = require('./model.js')

var url = "mongodb://localhost/agenda"

mongoose.connect(url)

let user = new Users({
   userId: Math.floor(Math.random() * 50),
   nombre: "Tere Villalba",
   email: "tere@mail.com",
   psw: "12345" })

user.save((error) => {
    if (error) console.log(error)
    console.log("Registro guardado")
})
