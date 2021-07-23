import express from 'express';
import { getGames, createGame, updateGame, deleteGame } from '../controllers/games.js';

const router = express.Router();

router.get('/', getGames);
router.post('/',  createGame);
router.patch('/:id', updateGame);
router.delete('/:id', deleteGame);

export default router;