import express from 'express';
import { getGames, getGame, createGame, updateGame, deleteGame } from '../controllers/games.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', getGames);
router.get('/:id', getGame);
router.post('/',  createGame);
router.patch('/:id', updateGame);
router.delete('/:id', deleteGame);

export default router;