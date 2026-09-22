import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDirectory = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname) || '.mp4';
    const fileName = `submission-${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}${extension}`;

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'video/mp4',
    'video/mov',
    'video/quicktime',
    'video/webm',
    'video/mkv',
    'video/x-matroska',
  ];

  if (
    allowedTypes.includes(file.mimetype) ||
    file.mimetype?.startsWith('video/') ||
    file.originalname?.match(/\.(mp4|mov|webm|mkv|3gp)$/i)
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only video files are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

export default upload;
