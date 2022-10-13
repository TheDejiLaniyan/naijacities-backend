const express = require('express')
const router = express.Router()
const citiesControllers = require('../controllers/citiesControllers')

// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(citiesControllers.getAllCities)
    .post( citiesControllers.createNewCity)
    // .post( citiesControllers.createNewCity, upload.array('images', 24))
    .patch(citiesControllers.updateCity)
    .delete(citiesControllers.deleteCity)

module.exports = router