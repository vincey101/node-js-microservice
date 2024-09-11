import { Router } from 'express';
import { registerUser, loginUser, getUserProfile, getUserById, updateProfile, changePassword } from '../controllers/user.controller';


const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);
router.get('/profile/:id', getUserById);

router.patch('/profile', updateProfile);
router.patch('/password', changePassword);

export default router;