const mongoose = require('mongoose')

const modelo = mongoose.Schema({
    nome:String,
    email:String,
    senha:String
})

const usuario = mongoose.model('usuarios',modelo)

module.exports = usuario