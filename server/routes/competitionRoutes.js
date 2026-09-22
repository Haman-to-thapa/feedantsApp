import express from 'express';
import {
  getCompetitionById,
  registerForCompetition,
  getParticipation,
} from '../controllers/competitionController.js';

const router = express.Router();

router.get('/:competitionId', getCompetitionById);
router.get('/:competitionId/participation', getParticipation);
router.post('/:competitionId/register', registerForCompetition);

export default router;
