import { Router } from 'express';
import {
  getMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
} from '../controllers/message.controller';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public route - allow anyone to send messages (contact form)
router.post('/', createMessage);

// Protected routes - only admin can view, update, or delete messages
router.get('/', protect, getMessages);
router.get('/:id', protect, getMessageById);
router.put('/:id', protect, updateMessage);
router.delete('/:id', protect, deleteMessage);

export default router;