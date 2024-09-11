import Product, { IProduct } from '../models/product.model';

export class ProductService {
    async getAllProducts(): Promise<IProduct[]> {
        const products = await Product.find();
        return products;
    }

    async getProductById(id: string): Promise<IProduct | null> {
        const product = await Product.findById(id);
        return product;
    }

    async createProduct(data: IProduct): Promise<IProduct> {
        const newProduct = new Product(data);
        return await newProduct.save();
    }

    async updateProduct(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
        return updatedProduct;
    }

    async deleteProduct(id: string): Promise<IProduct | null> {
        const deletedProduct = await Product.findByIdAndDelete(id);
        return deletedProduct;
    }
}
