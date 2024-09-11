import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthenticatedRequest } from '../types/custom';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const userService = new UserService(); 
const JWT_SECRET = process.env.JWT_SECRET; // Get JWT secret from environment variable

interface User {
    id: string;
    password: string;
}

export const registerUser = async (req: Request, res: Response) => {

    try {
        const user = await userService.register({ ...req.body }); 
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};



export const loginUser = async (req: Request, res: Response) => {
    try {
        const token = await userService.login(req.body);
        res.status(200).json({ token });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};



export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if (typeof decoded === 'object' && 'id' in decoded) {
            const user = await userService.getProfile(decoded.id);
            res.status(200).json(user);
        } else {
            res.status(400).json({ error: 'Invalid token' });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};


export const updateProfile = async (req: Request, res: Response) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        const user = await userService.updateProfile(decoded.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};


export const changePassword = async (req: Request, res: Response) => {
    const authenticatedReq = req as AuthenticatedRequest;

    try {
        if (!authenticatedReq.user) {
            throw new Error('User not found');
        }
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            throw new Error('All password fields are required');
        }
        if (newPassword !== confirmNewPassword) {
            throw new Error('New passwords do not match');
        }
        const isValidPassword = await bcrypt.compare(oldPassword, authenticatedReq.user.password);
        if (!isValidPassword) {
            throw new Error('Invalid old password');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const user = await userService.changePassword(authenticatedReq.user.id, hashedPassword);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
    
};
