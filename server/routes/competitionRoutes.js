import express from 'express';
import {registerForCompetition} from '../controllers/competitionController.js';

const router = express.Router();

router.post('/:competitionId/register', registerForCompetition);

export default router;
