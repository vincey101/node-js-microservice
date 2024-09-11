import User, { IUser } from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserService {
    async register(data: { email: string; password: string; name: string }) {
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) throw new Error('Email already exists');

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await User.create({ ...data, password: hashedPassword });
        return user;
    }

    async login(data: { email: string; password: string }) {
        const user = await User.findOne({ email: data.email });

        if (!user) throw new Error('Invalid credentials');
        try {
            const isMatch = await bcrypt.compare(data.password, user.password);
            if (!isMatch) throw new Error('Invalid credentials');
        } catch (error) {
            console.error('Password comparison error:', error);
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });
        return token;
    }

    async getProfile(id: string) {
        const user = await User.findById(id);
        if (!user) throw new Error('User not found');
        return user;
    }

    async updateProfile(id: string, data: { name?: string; email?: string }) {
        const user = await User.findByIdAndUpdate(id, data, { new: true });
        if (!user) throw new Error('User not found');
        return user;
    }

    async changePassword(userId: string, newPassword: string) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return user;
    }

    async getUserById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }
}
