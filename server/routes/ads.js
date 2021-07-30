import express from 'express';
import { getAds, getAd, createAd, updateAd, deleteAd } from '../controllers/ads.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', getAds);
router.get('/:id', getAd)
router.post('/', createAd);
router.patch('/:id', auth, updateAd);
router.delete('/:id', auth, deleteAd);

export default router;