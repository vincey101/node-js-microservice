import axios from 'axios';
import Payment, { IPayment } from '../models/payment.model';
import mongoose from 'mongoose';

export class PaymentService {
    private orderServiceUrl = 'http://localhost:4001/orders'; // URL for order-service

    async createPayment(data: { orderId: string; amount: number }): Promise<IPayment> {
        try {
            // Validate the order before processing payment
            const isOrderValid = await this.validateOrder(data.orderId);
            if (!isOrderValid) {
                throw new Error('Invalid Order ID');
            }

            // Simulate the payment process
            const paymentSuccess = Math.random() < 0.85; // Simulated 85% chance of success

            // Determine payment status based on the simulated result
            const paymentStatus = paymentSuccess ? 'Paid' : 'Failed';

            // Create and save payment record
            const newPayment = new Payment({
                orderId: data.orderId,
                amount: data.amount,
                status: paymentStatus,
            });
            return await newPayment.save();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error creating payment:', error.message);
            } else {
                console.error('Unknown error during payment creation');
            }
            throw error;
        }
    }

    async getPaymentById(id: string): Promise<IPayment | null> {
        try {
            return await Payment.findById(id);
        } catch (error: unknown) {
            console.error('Error fetching payment by ID:', error);
            throw error;
        }
    }

    private async validateOrder(orderId: string): Promise<boolean> {
        try {
            if (!mongoose.isValidObjectId(orderId)) {
                throw new Error('Invalid Order ID format');
            }

            // Check with the order service
            const response = await axios.get(`${this.orderServiceUrl}/${orderId}`);
            return response.status === 200;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Error validating order ID:', error.response ? error.response.data : error.message);
            } else if (error instanceof Error) {
                if (error.message.includes('Invalid Order ID format')) {
                    console.error('Invalid Order ID format:', error.message);
                } else {
                    console.error('Unknown error occurred while validating order ID');
                }
            } else {
                console.error('Unknown error occurred while validating order ID');
            }
            return false;
        }
    }
}
