const express = require('express')
const userSignUpController = require('../controller/userSignUp')
const userLoginController = require('../controller/userLogin')
const userLogout = require('../controller/userLogout')
const authMiddleware = require ('../middleware/authMiddleware')
const userDetailsController = require('../controller/userDetails')
const  updateUser  = require('../controller/userUpdate')
const  upload  = require('../middleware/multer');

// const router=express.Router()

const router = express.Router()



router.post("/signup",userSignUpController)
router.post("/login",userLoginController)
router.get("/user-detail",authMiddleware,userDetailsController)
router.get("/userLogout",userLogout)
router.put('/update/:id', authMiddleware, upload.single('profilePicture'), updateUser);




module.exports= router