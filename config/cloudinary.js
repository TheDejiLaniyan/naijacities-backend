const dotenv = require('dotenv')
dotenv.config()

const cloudinaryModule = require('cloudinary')
const cloudinary = cloudinaryModule.v2




cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  })



// cloudinary.uploader.upload("https://www.freecodecamp.org/news/content/images/size/w60/2019/07/profile-pic.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });

  module.exports = cloudinary 