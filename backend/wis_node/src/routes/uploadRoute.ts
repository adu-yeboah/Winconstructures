import { Router } from "express";
import { uploadImage, deleteImage } from "../controllers/upload.controller";
import { protect } from "../middleware/authMiddleware";
import multer from "multer";

// Configure multer for file uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

const router = Router();

// Upload single image - protected route
router.post('/image', protect, upload.single('image'), uploadImage);

// Delete image by public ID - protected route
router.delete('/image/:publicId', protect, deleteImage);

export default router;
