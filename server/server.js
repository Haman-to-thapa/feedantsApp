import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import connectDB from './config/db.js';
import competitionRoutes from './routes/competitionRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect Database
connectDB();

// Security and parsing middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiter: max 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/competitions', competitionRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Feedants API is running',
  });
});

// Centralized error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
