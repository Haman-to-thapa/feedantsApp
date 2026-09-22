import Competition from '../models/Competition.js';
import User from '../models/User.js';
import Participation from '../models/Participation.js';

export const getCompetitionById = async (req, res) => {
  try {
    const {competitionId} = req.params;

    // Search by MongoDB _id OR custom competitionId (e.g. 'classical-dance-001')
    let competition = null;
    if (competitionId.match(/^[0-9a-fA-F]{24}$/)) {
      competition = await Competition.findById(competitionId).lean();
    }
    if (!competition) {
      competition = await Competition.findOne({competitionId}).lean();
    }
    if (!competition) {
      competition = await Competition.findOne().lean();
    }

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: competition,
    });
  } catch (error) {
    console.error('Get competition error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export const getParticipation = async (req, res) => {
  try {
    const {competitionId} = req.params;
    const {email} = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(200).json({
        success: true,
        registered: false,
        participation: null,
      });
    }

    let comp = null;
    if (competitionId.match(/^[0-9a-fA-F]{24}$/)) {
      comp = await Competition.findById(competitionId);
    }
    if (!comp) {
      comp = await Competition.findOne({competitionId});
    }
    if (!comp) {
      comp = await Competition.findOne();
    }

    const participation = await Participation.findOne({
      userId: user._id,
      competitionId: comp ? comp._id : competitionId,
    }).lean();

    return res.status(200).json({
      success: true,
      registered: !!participation,
      participation,
    });
  } catch (error) {
    console.error('Participation check error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export const registerForCompetition = async (req, res) => {
  try {
    const {competitionId} = req.params;
    const {name, email} = req.body;

    // 1. Validate input
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      });
    }

    // 2. Find competition
    let competition = null;
    if (competitionId.match(/^[0-9a-fA-F]{24}$/)) {
      competition = await Competition.findById(competitionId);
    }
    if (!competition) {
      competition = await Competition.findOne({competitionId});
    }
    if (!competition) {
      competition = await Competition.findOne();
    }

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found',
      });
    }

    const now = new Date();

    // 3. Registration window check
    if (
      now < competition.registrationStart ||
      now > competition.registrationEnd
    ) {
      return res.status(400).json({
        success: false,
        message: 'Registration is closed',
      });
    }

    // 4. Find/create user
    let user = await User.findOne({email: email.toLowerCase()});

    if (!user) {
      user = await User.create({
        name,
        email: email.toLowerCase(),
      });
    }

    // 5. Already registered check
    const existingParticipation = await Participation.findOne({
      userId: user._id,
      competitionId: competition._id,
    });

    if (existingParticipation) {
      return res.status(409).json({
        success: false,
        message: 'User already registered',
        participation: existingParticipation,
      });
    }

    // 6. Atomically reserve ONE spot
    const updatedCompetition = await Competition.findOneAndUpdate(
      {
        _id: competition._id,
        $expr: {
          $lt: ['$registeredCount', '$maxParticipants'],
        },
      },
      {
        $inc: {
          registeredCount: 1,
        },
      },
      {
        new: true,
      },
    );

    // No spot available
    if (!updatedCompetition) {
      return res.status(409).json({
        success: false,
        message: 'Competition is full',
      });
    }

    // 7. Create participation
    try {
      const participation = await Participation.create({
        userId: user._id,
        competitionId: competition._id,
        paymentStatus: 'pending',
        registrationStatus: 'registered',
        submissionStatus: 'not_uploaded',
      });

      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        participation,
        competition: {
          id: updatedCompetition._id,
          registeredCount: updatedCompetition.registeredCount,
          maxParticipants: updatedCompetition.maxParticipants,
        },
      });
    } catch (error) {
      // If participation creation fails, return the reserved spot.
      await Competition.findByIdAndUpdate(competition._id, {
        $inc: {
          registeredCount: -1,
        },
      });

      // Duplicate registration
      if (error.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'User already registered',
        });
      }

      throw error;
    }
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
