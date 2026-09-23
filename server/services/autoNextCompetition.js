/**
 * autoNextCompetition.js
 *
 * Jab saari competitions SUBMISSION_CLOSED / RESULT_PUBLISHED mein ho jaayein,
 * yeh script automatically purani (latest) competition ko clone karke
 * naya competition banata hai naye dates ke saath.
 *
 * Usage:
 *   - Server startup pe automatically chalta hai
 *   - POST /api/competitions/auto-next se manually trigger kar sakte ho
 */

import Competition from '../models/Competition.js';
import {getCompetitionState} from './competitionState.js';

/**
 * Latest competition ke data se naya competition clone karo naye dates ke saath.
 * @param {Object} source - purani competition ka document
 * @returns {Object} naya competition data
 */
const buildNextCompetition = source => {
  const now = new Date();

  // Naye dates: Registration abhi se 14 din, Submission uske baad 14 din, Result 7 din baad
  const regStart = new Date(now);
  const regEnd = new Date(now.getTime() + 14 * 24 * 3600 * 1000);
  const subStart = new Date(regEnd.getTime() + 1 * 3600 * 1000); // 1 hour gap
  const subEnd = new Date(subStart.getTime() + 14 * 24 * 3600 * 1000);
  const resultDate = new Date(subEnd.getTime() + 7 * 24 * 3600 * 1000);

  // Next competition ID generate karo (e.g., classical-dance-001 → classical-dance-002)
  const oldId = source.competitionId || 'classical-dance-001';
  const match = oldId.match(/^(.*-)(\d+)$/);
  let newId;
  if (match) {
    const prefix = match[1];
    const num = parseInt(match[2], 10) + 1;
    newId = `${prefix}${String(num).padStart(3, '0')}`;
  } else {
    newId = `${oldId}-002`;
  }

  return {
    // Purana data carry forward karo
    title: source.title,
    category: source.category,
    tags: source.tags || [],
    prizePool: source.prizePool,
    entryFee: source.entryFee,
    maxParticipants: source.maxParticipants,
    judge: source.judge,
    about: source.about,
    judgingParameters: source.judgingParameters || [],
    rules: source.rules || [],
    eligibility: source.eligibility || [],
    rewards: source.rewards,

    // Naya ID aur dates
    competitionId: newId,
    registeredCount: 0,
    status: 'upcoming',
    registrationStart: regStart,
    registrationEnd: regEnd,
    submissionStart: subStart,
    submissionEnd: subEnd,
    resultDate: resultDate,
  };
};

/**
 * Check karo ke sab competitions khatam ho gayi hain ya nahi.
 * Agar haan, toh next competition auto-create karo.
 */
export const autoCreateNextCompetitionIfNeeded = async () => {
  try {
    const allCompetitions = await Competition.find().lean();

    if (allCompetitions.length === 0) {
      console.log('[AutoNext] No competitions found, skipping.');
      return null;
    }

    // Koi bhi active competition hai? (REGISTRATION_OPEN, REGISTRATION_FULL, SUBMISSION_OPEN, UPCOMING)
    const activeStates = ['UPCOMING', 'REGISTRATION_OPEN', 'REGISTRATION_FULL', 'SUBMISSION_OPEN'];
    const hasActive = allCompetitions.some(c => {
      const {state} = getCompetitionState(c);
      return activeStates.includes(state);
    });

    if (hasActive) {
      console.log('[AutoNext] Active competition found, no new competition needed.');
      return null;
    }

    // Sabse latest ended competition dhundo
    const sorted = allCompetitions.sort(
      (a, b) => new Date(b.registrationStart) - new Date(a.registrationStart),
    );
    const source = sorted[0];

    // Naya competition already exist toh nahi karta?
    const oldId = source.competitionId || 'classical-dance-001';
    const match = oldId.match(/^(.*-)(\d+)$/);
    let nextId;
    if (match) {
      nextId = `${match[1]}${String(parseInt(match[2], 10) + 1).padStart(3, '0')}`;
    } else {
      nextId = `${oldId}-002`;
    }

    const alreadyExists = await Competition.findOne({competitionId: nextId});
    if (alreadyExists) {
      console.log(`[AutoNext] Next competition (${nextId}) already exists, skipping.`);
      return alreadyExists;
    }

    // Naya competition create karo
    const nextData = buildNextCompetition(source);
    const newCompetition = await Competition.create(nextData);
    console.log(
      `[AutoNext] ✅ New competition created: ${newCompetition.competitionId} — "${newCompetition.title}"`,
    );
    return newCompetition;
  } catch (err) {
    console.error('[AutoNext] Error creating next competition:', err.message);
    return null;
  }
};

export default autoCreateNextCompetitionIfNeeded;
