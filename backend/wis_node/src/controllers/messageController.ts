import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Message from '../models/message';

// Get all messages
export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const messages = await Message.find();
  res.json(messages);
});

// Get a single message by ID
export const getMessageById = asyncHandler(async (req: Request, res: Response) => {
  const message = await Message.findById(req.params.id);
  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }
  res.json(message);
});

// Create a new message
export const createMessage = asyncHandler(async (req: Request, res: Response) => {
  const { title, email, subject } = req.body;
  if (!title || !email || !subject) {
    res.status(400);
    throw new Error('Please provide title, email, and subject');
  }
  const message = await Message.create({ title, email, subject });
  res.status(201).json(message);
});

// Update a message
export const updateMessage = asyncHandler(async (req: Request, res: Response) => {
  const { title, email, subject } = req.body;
  const message = await Message.findById(req.params.id);
  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }
  message.title = title || message.title;
  message.email = email || message.email;
  message.subject = subject || message.subject;
  const updatedMessage = await message.save();
  res.json(updatedMessage);
});

// Delete a message
export const deleteMessage = asyncHandler(async (req: Request, res: Response) => {
  const message = await Message.findById(req.params.id);
  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }
  await message.deleteOne();
  res.json({ message: 'Message deleted' });
});