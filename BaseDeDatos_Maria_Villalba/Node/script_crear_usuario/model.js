const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = new Schema({
  userId: { type: Number, required: true, unique: true},
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  psw: { type: String, required: true}
})

let UserModel = mongoose.model('Usuario', UserSchema)

module.exports = UserModel
