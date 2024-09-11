import { Router } from 'express';
import { processPayment, getPaymentById } from '../controllers/payment.controller';

const router = Router();

router.post('/payments', processPayment); // Create a new payment
router.get('/payments/:id', getPaymentById); // Get payment by ID

export default router;
