import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes';

dotenv.config();

const { MONGO_URI, PORT } = process.env;

if (!MONGO_URI) {
    throw new Error('MONGO_URI is not set');
}

mongoose.connect(MONGO_URI);

mongoose.connection.on('error', (error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
});

mongoose.connection.once('open', () => {
    console.log('Database connected successfully');
});

const app = express();

app.use(express.json());

app.use(productRoutes);

app.listen(PORT || 5002, () => {
    console.log(`Product Service listening on port ${PORT}`);
});