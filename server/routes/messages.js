import express from 'express';
import { getMessages, createMessage, updateMessage, deleteMessage } from '../controllers/messages.js';

const router = express.Router();

router.get('/', getMessages);
router.post('/',  createMessage);
router.patch('/:id', updateMessage);
router.delete('/:id', deleteMessage);

export default router;