import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { IProduct } from '../models/product.model';

const productService = new ProductService();


export const getProducts = async (req: Request, res: Response) => {
    try {
        const products: IProduct[] = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
    
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const product = await productService.getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
    
};


export const createProduct = async (req: Request, res: Response) => {
    try {
        const productData: IProduct = req.body;
        const newProduct = await productService.createProduct(productData);

        res.status(201).json(newProduct);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
    
};


export const updateProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const updatedData: Partial<IProduct> = req.body;

        const updatedProduct = await productService.updateProduct(productId, updatedData);

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
    
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productService.deleteProduct(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }

};
