import express from 'express';
import { signin, signup } from '../controllers/users.js';

const router = express.Router();

// Routes for sign in and sign out for users
router.post('/signin', signin);
router.post('/signup', signup);

export default router;