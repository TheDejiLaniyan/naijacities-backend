const mongoose = require('mongoose')

// imageSchema.virtual('thumbnail').get(function(){
//     return this.url.replace('/upload', '/upload/w_150')
// })

const citiesSchema = new mongoose.Schema(
    {
    name:{
        type: String,
        required: true
    },
    // images:{
    //     url:{
    //         type: String,
    //         required: true
    //     },
    //     publicId:{
    //         type: String,
    //         required: true
    //     }
    // },
    images: {
        type: Object
    },
    state: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } 
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Citie', citiesSchema)