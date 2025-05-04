import mongoose, { Schema, Document } from 'mongoose';

interface IMessage extends Document {
  title: string;
  email: string;
  subject: string;
}

const messageSchema = new Schema<IMessage>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage>('Message', messageSchema);
export default Message;