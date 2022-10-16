const Cities = require('../models/Cities')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const cloudinary = require('../config/cloudinary')

// const upload = require('../cloudinary/cloudinary2')
// const {uploadToCloudinary} = require('../utils/cloudinary')

const getAllCities = asyncHandler(async(req, res)=>{
    try{
        const cities = await Cities.find({}) //cities.find()

    if(!cities?.length){
        return res.status(400).json({message: 'No Cities Found!'})
    }

    res.json(cities)
    } catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})


const createNewCity  =  asyncHandler(async (req, res)=>{
        const {name, state, images, author} = req.body
        // const {images} = req.files
       try{
            if(!name || !state || !images || !author ){
                return res.status(400).json({ message: 'All fields are required' })
            }
            
            const duplicate = await Cities.findOne({name}).lean().exec()
            if(duplicate){
                return res.status(409).json({ message: 'Duplicate City Found!' })
            }
            
            const uploadRes = await cloudinary.uploader.upload(images, {
                    upload_preset: "cities"
                })
                
            const cityObject = {
                    name,
                    state,
                    images: uploadRes,
                    author
                }
            const city = await Cities.create(cityObject)

            if(city){
                res.status(201).json({ message: `New city ${name} created!` })
            } else{
                res.status(400).json({ message: 'Invalid city data received!' })
            }
       }
       catch(err){
            console.log(err)
            res.status(500).send(err)
       }
    })


const updateCity = asyncHandler(async (req, res)=>{
        const {id, name,state,  images } = req.body

        if(!id || !name || !state ){
            return res.status(400).json({message:'All fields except images are required!'})
        }

        const city = await Cities.findById(id)

        if(!city){
            return res.status(400).json({message:'City not found!'})
        }

            // const uploadRes = await cloudinary.uploader.upload(images, {
            //     upload_preset: "cities"
            // })

        const duplicate = await Cities.findOne({name}).lean().exec()

        if(duplicate && duplicate?._id.toString() !== id){
            return res.status(409).json({message: 'Duplicate City Found!'})
        }


        // const imageObject = {
        //     images: uploadRes
        // }

        city.name = name
        city.state  = state
        if(images){
            city.images = await cloudinary.uploader.upload(images, {
                upload_preset: "cities"
            })
        }

        const updatedUser = await city.save()

        res.json({message: `${updatedUser.name} updated`})
})

const deleteCity = asyncHandler(async(req, res)=>{
        const {id} = req.body

        if(!id){
            return res.status(400).json({message: 'Id Required'})
        }

        const city = await Cities.findById(id).exec()

        if(!city){
            return res.status(400).json({message:'City not found!'})
        }

        if(city.images){
            cloudinary.uploader.destroy(city.images?.public_id)
        }

        const result = await city.deleteOne()

        const reply = `City ${result.name} with ID ${result._id} deleted`

        res.json(reply)
})

module.exports = {
    getAllCities,
    createNewCity,
    updateCity,
    deleteCity
}