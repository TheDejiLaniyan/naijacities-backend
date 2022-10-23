const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
    },
    password:{
        type: String,
        required: true
    },
    confirmPassword:{
        type: String,
    },
    roles:[{
        type: String,
        default: 'tier1'
    }]

})

module.exports = mongoose.model('User', userSchema)