const mongoose = require('mongoose')

const stateSchema = new mongoose.Schema({
    name: String,
    // image: String,
    lga: String,
})