import Competition from '../models/Competition.js';
import User from '../models/User.js';
import Participation from '../models/Participation.js';

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
    const competition = await Competition.findById(competitionId);

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
    let user = await User.findOne({email});

    if (!user) {
      user = await User.create({
        name,
        email,
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
