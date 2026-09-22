import express from 'express';
import {
  getCompetitionById,
  registerForCompetition,
} from '../controllers/competitionController.js';

const router = express.Router();

router.get('/:competitionId', getCompetitionById);
router.post('/:competitionId/register', registerForCompetition);

export default router;
