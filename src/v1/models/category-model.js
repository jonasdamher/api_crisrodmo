const mongoose = require('mongoose')

const categoriesSchema = mongoose.Schema({
    name: {
        type: String,
        min: 4,
        unique: true,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    nameLink: {
        type: String,
        unique: true,
        required: true
    }
})

module.exports = mongoose.model('categories', categoriesSchema)