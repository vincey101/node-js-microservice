import axios, { AxiosError } from 'axios';
import mongoose from 'mongoose';
import Order, { IOrder } from '../models/order.model';

export class OrderService {
    private userServiceUrl = 'http://localhost:8086/profile'; // URL for user-service

    private productServiceUrl = 'http://localhost:5004/products'; // URL for product-service


    async getAllOrders(): Promise<IOrder[]> {
        return await Order.find();
    }

    async getOrderById(id: string): Promise<IOrder | null> {
        return await Order.findById(id);
    }


    // Function to check if productId is a valid MongoDB ObjectId
    private isValidObjectId(id: string): boolean {
        return mongoose.Types.ObjectId.isValid(id);
    }

    async createOrder(data: IOrder): Promise<IOrder> {
        // Validate user before creating order
        const userValid = await this.validateUser(data.userId);
        if (!userValid) {
            throw new Error('Invalid user ID');
        }

        // Pre-validate productId before sending the request to product-service
        if (!this.isValidObjectId(data.productId)) {
            throw new Error('Invalid product ID format');
        }

        const productValid = await this.validateProduct(data.productId);
        if (!productValid) {
            throw new Error('Invalid product ID');
        }

        const newOrder = new Order(data);
        return await newOrder.save();
    }

    async updateOrder(id: string, data: Partial<IOrder>): Promise<IOrder | null> {
        return await Order.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteOrder(id: string): Promise<IOrder | null> {
        return await Order.findByIdAndDelete(id);
    }


    // Function to validate product by making a request to product-service
    private async validateProduct(productId: string): Promise<boolean> {
        try {
            const response = await axios.get(`${this.productServiceUrl}/${productId}`);
            return response.status === 200;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data && error.response.data.error) {
                    console.error(`Error validating product ID ${productId}:`, error.response.data.error);
                } else {
                    console.error(`Error validating product ID ${productId}:`, error.message);
                }
            } else {
                console.error('Unknown error occurred while validating product ID');
            }
            return false; 
        }
    }

    // Function to validate user by making a request to user-service
    private async validateUser(userId: string): Promise<boolean> {
        try {
            const response = await axios.get(`${this.userServiceUrl}/${userId}`, {
                headers: {
                    'Accept': 'application/json', 
                },
            });
            return response.status === 200;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error(`Error validating user ID ${userId}:`, error.response ? error.response.data : error.message);
            } else if (error instanceof Error) {
                console.error(`Error validating user ID ${userId}:`, error.message);
            } else {
                console.error('Unknown error occurred while validating user ID');
            }
            return false;
        }
    }
}

