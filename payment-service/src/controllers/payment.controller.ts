import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';

const paymentService = new PaymentService();

export const processPayment = async (req: Request, res: Response) => {
    try {
        const { orderId, amount } = req.body;
        const payment = await paymentService.createPayment({ orderId, amount });
        res.status(201).json(payment);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error processing payment:', error.message);
            res.status(400).json({ error: error.message });
        } else {
            console.error('Unknown error during payment processing');
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const getPaymentById = async (req: Request, res: Response) => {
    try {
        const paymentId = req.params.id;
        const payment = await paymentService.getPaymentById(paymentId);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching payment by ID:', error.message);
            res.status(500).json({ error: error.message });
        } else {
            console.error('Unknown error occurred while fetching payment');
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

