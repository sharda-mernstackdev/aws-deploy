const { cancelTestDrive, createTestDrive, deleteTestDrive, getTestDriveById, getTestDrives, updateTestDrive } = require ('../controller/testDriveController')

const express = require ('express');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/create',authMiddleware, createTestDrive);
router.get('/get',authMiddleware, getTestDrives);
router.get('/get/:id',authMiddleware, getTestDriveById);
router.patch('/update/:id',authMiddleware, updateTestDrive);
router.patch('/:id/cancel',authMiddleware, cancelTestDrive);
router.delete('/delete/:id',authMiddleware, deleteTestDrive);

module.exports = router

