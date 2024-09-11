import { Router } from 'express';
import { createOrder, getOrderById, updateOrder, getAllOrders } from '../controllers/order.controller';

const router = Router();

router.post('/orders', createOrder);
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id', updateOrder);

export default router;
