"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.updateMessage = exports.createMessage = exports.getMessageById = exports.getMessages = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const message_1 = __importDefault(require("../models/message"));
// Get all messages
exports.getMessages = (0, express_async_handler_1.default)(async (req, res) => {
    const messages = await message_1.default.find();
    res.json(messages);
});
// Get a single message by ID
exports.getMessageById = (0, express_async_handler_1.default)(async (req, res) => {
    const message = await message_1.default.findById(req.params.id);
    if (!message) {
        res.status(404);
        throw new Error('Message not found');
    }
    res.json(message);
});
// Create a new message
exports.createMessage = (0, express_async_handler_1.default)(async (req, res) => {
    const { title, email, subject } = req.body;
    if (!title || !email || !subject) {
        res.status(400);
        throw new Error('Please provide title, email, and subject');
    }
    const message = await message_1.default.create({ title, email, subject });
    res.status(201).json(message);
});
// Update a message
exports.updateMessage = (0, express_async_handler_1.default)(async (req, res) => {
    const { title, email, subject } = req.body;
    const message = await message_1.default.findById(req.params.id);
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
exports.deleteMessage = (0, express_async_handler_1.default)(async (req, res) => {
    const message = await message_1.default.findById(req.params.id);
    if (!message) {
        res.status(404);
        throw new Error('Message not found');
    }
    await message.deleteOne();
    res.json({ message: 'Message deleted' });
});
