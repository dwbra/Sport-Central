import express from 'express';
import {applyForPosition } from '../controllers/adInteract.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.patch('/', applyForPosition);

export default router;