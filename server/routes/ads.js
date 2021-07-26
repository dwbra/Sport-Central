import express from 'express';
import { getAds, createAd, updateAd, deleteAd } from '../controllers/ads.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', auth, getAds);
router.post('/', auth, createAd);
router.patch('/:id', auth, updateAd);
router.delete('/:id', auth, deleteAd);

export default router;