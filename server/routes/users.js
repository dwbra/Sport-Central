import express from 'express';
import { signin, signup, getUserEmails } from '../controllers/users.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

router.get('/', getUserEmails);

export default router;