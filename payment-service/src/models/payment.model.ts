import { Schema, model, Document } from 'mongoose';

export interface IPayment extends Document {
    orderId: string;
    amount: number;
    status: 'Paid' | 'Failed'; 
    createdAt: Date;
}

const paymentSchema = new Schema<IPayment>({
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Paid', 'Failed'], // Restrict status to 'Paid' or 'Failed'
        default: 'Failed' // Default to 'Failed' if no status is provided
    },
    createdAt: { type: Date, default: Date.now },
});

export default model<IPayment>('Payment', paymentSchema);
