const { v2: cloudinary } = require('cloudinary');
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARI_CLOUD_NAME,
    api_key: process.env.CLOUDINARI_API_KEY, 
    api_secret: process.env.CLOUDINARI_API_SECRET,
});

module.exports = cloudinary;