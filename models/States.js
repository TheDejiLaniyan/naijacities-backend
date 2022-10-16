const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stateSchema = new Schema({
    name: String,
    lga: String,
    image: String
})

module.exports = mongoose.model('State', stateSchema)