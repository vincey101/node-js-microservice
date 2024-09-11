import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller';

const router = express.Router();

// Get all products
router.get('/products', getProducts);

// Get a product by ID
router.get('/products/:id', getProductById);

// Create a new product
router.post('/products', createProduct);

// Update a product by ID
router.put('/products/:id', updateProduct);

// Delete a product by ID
router.delete('/products/:id', deleteProduct);

export default router;
