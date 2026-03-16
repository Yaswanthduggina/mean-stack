const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Protected routes - Farmer only
router.post('/', authMiddleware, roleMiddleware('farmer'), productController.createProduct);
router.put('/:id', authMiddleware, roleMiddleware('farmer'), productController.updateProduct);
router.delete('/:id', authMiddleware, roleMiddleware('farmer'), productController.deleteProduct);
router.get('/farmer/my-products', authMiddleware, roleMiddleware('farmer'), productController.getFarmerProducts);

module.exports = router;
