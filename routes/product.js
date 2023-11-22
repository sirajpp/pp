const express = require('express');
const { getProducts, newProducts,getSingleProduct,updateProduct,deleteProduct} = require('../controllers/productController');
const {verifyToken} = require('../utils/verifyToken')
const router = express.Router();

router.get('/',getProducts)
router.post('/new',verifyToken,newProducts)
router.get('/:id',getSingleProduct);
router.put('/:id',verifyToken,updateProduct);
router.delete('/:id',verifyToken,deleteProduct);
// router.get('/products/search',search)
module.exports = router;