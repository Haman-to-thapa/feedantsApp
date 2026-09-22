export const getCompetitionState = competition => {
  const now = new Date();

  const {
    registrationStart,
    registrationEnd,
    submissionStart,
    submissionEnd,
    resultDate,
    registeredCount = 0,
    maxParticipants = 20,
  } = competition;

  const regStart = new Date(registrationStart);
  const regEnd = new Date(registrationEnd);
  const subStart = new Date(submissionStart);
  const subEnd = new Date(submissionEnd);
  const resDate = new Date(resultDate);

  const remainingSpots = Math.max(maxParticipants - registeredCount, 0);

  if (now < regStart) {
    return {
      state: 'UPCOMING',
      remainingSpots,
      registrationOpen: false,
      submissionOpen: false,
    };
  }

  if (now <= regEnd) {
    if (remainingSpots === 0) {
      return {
        state: 'REGISTRATION_FULL',
        remainingSpots: 0,
        registrationOpen: false,
        submissionOpen: false,
      };
    }

    return {
      state: 'REGISTRATION_OPEN',
      remainingSpots,
      registrationOpen: true,
      submissionOpen: false,
    };
  }

  if (now < subStart) {
    return {
      state: 'REGISTRATION_CLOSED',
      remainingSpots,
      registrationOpen: false,
      submissionOpen: false,
    };
  }

  if (now <= subEnd) {
    return {
      state: 'SUBMISSION_OPEN',
      remainingSpots,
      registrationOpen: false,
      submissionOpen: true,
    };
  }

  if (now < resDate) {
    return {
      state: 'SUBMISSION_CLOSED',
      remainingSpots,
      registrationOpen: false,
      submissionOpen: false,
    };
  }

  return {
    state: 'RESULT_PUBLISHED',
    remainingSpots,
    registrationOpen: false,
    submissionOpen: false,
  };
};

export default getCompetitionState;
