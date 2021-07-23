import express from 'express';
import { getSports } from '../controllers/sports.js';

const router = express.Router();

router.get('/', getSports);

export default router;