import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/user.routes';

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

app.use(router); 

app.listen(PORT || 8080, () => {
    console.log(`Server listening on port ${PORT}`);
});