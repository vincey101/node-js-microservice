import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
    userId: string;
    productId: string;
    quantity: number;
    status: string;
}

const orderSchema = new Schema<IOrder>({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', orderSchema);
