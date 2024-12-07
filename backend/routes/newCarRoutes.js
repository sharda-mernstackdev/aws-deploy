const express = require('express');
const { createCar, getCars, updateCar, deleteCar, getCarById } = require('../controller/newCarController');
const router = express.Router();


router.post('/create', createCar);
router.get('/getCar', getCars);
router.get('/getCar/:id', getCarById);
router.put('/updateCar:id', updateCar);
router.delete('/deleteCar/:id', deleteCar);

module.exports = router;