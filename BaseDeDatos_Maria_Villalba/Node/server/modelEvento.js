const mongoose = require('mongoose')

const Schema = mongoose.Schema

let EventoSchema = new Schema({
  id: {type: Number, required: true, unique: true},
  title: { type: String, required: true },
  start: { type: String, required: true},
  end: { type: String}
})

let EventoModel = mongoose.model('Evento', EventoSchema)

module.exports = EventoModel
