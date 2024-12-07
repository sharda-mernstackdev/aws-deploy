// routes/cartRoutes.js
const  express = require ('express')
const  { addToCart, removeFromCart, getCart, countAddToCartProduct } = require ( '../controller/cartController')
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, addToCart);
router.delete('/remove/:carId', authMiddleware, removeFromCart);
router.get('/', authMiddleware, getCart);
router.get("/countAddToCartProduct",authMiddleware,countAddToCartProduct)

module.exports = router