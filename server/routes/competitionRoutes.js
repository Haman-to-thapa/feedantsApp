import express from 'express';
import upload from '../middleware/upload.js';
import validateObjectId from '../middleware/validateObjectId.js';
import validateRegistration from '../middleware/validateRegistration.js';
import {
  getCompetitionById,
  registerForCompetition,
  getParticipation,
  uploadSubmission,
} from '../controllers/competitionController.js';

const router = express.Router();

router.get('/:competitionId', validateObjectId, getCompetitionById);

router.get(
  '/:competitionId/participation',
  validateObjectId,
  getParticipation,
);

router.post(
  '/:competitionId/register',
  validateObjectId,
  validateRegistration,
  registerForCompetition,
);

router.post(
  '/:competitionId/submission',
  validateObjectId,
  upload.single('submission'),
  uploadSubmission,
);

export default router;
