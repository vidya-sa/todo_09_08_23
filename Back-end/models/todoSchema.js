const mongoose = require('mongoose')

const todoschema = new mongoose.Schema({
    accomplish : String
})


const Todo = mongoose.model('Todo',todoschema)

module.exports = Todo