import express from 'express';
import { gLogin, gLogout} from '../controllers/auth.js';

const router = express.Router();

router.post('/gLogin',  gLogin);
router.post('/gLogout',  gLogout);

export default router;