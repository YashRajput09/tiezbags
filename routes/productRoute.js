const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products.js')

router.get('/',  productsController.index);
router.get('/newProduct', productsController.newProductForm)

module.exports = router;