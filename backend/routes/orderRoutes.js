const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Protected routes - Customer
router.post('/', authMiddleware, roleMiddleware('customer'), orderController.createOrder);
router.get('/', authMiddleware, roleMiddleware('customer'), orderController.getCustomerOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);
router.put('/:id/cancel', authMiddleware, roleMiddleware('customer'), orderController.cancelOrder);

// Farmer routes
router.get('/farmer/orders', authMiddleware, roleMiddleware('farmer'), orderController.getFarmerOrders);
router.put('/:id/status', authMiddleware, roleMiddleware('farmer'), orderController.updateOrderStatus);

module.exports = router;
