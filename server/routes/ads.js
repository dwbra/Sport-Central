import express from 'express';
import { getAds, createAd, updateAd, deleteAd } from '../controllers/ads.js';

const router = express.Router();

router.get('/', getAds);
router.post('/',  createAd);
router.patch('/:id', updateAd);
router.delete('/:id', deleteAd);

export default router;