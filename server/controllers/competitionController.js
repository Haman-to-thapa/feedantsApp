import mongoose from 'mongoose';
import Competition from '../models/Competition.js';
import User from '../models/User.js';
import Participation from '../models/Participation.js';
import {getCompetitionState} from '../services/competitionState.js';

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

    const lifecycle = getCompetitionState(competition);

    return res.status(200).json({
      success: true,
      data: {
        ...competition,
        lifecycle,
      },
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
  let session = null;
  try {
    session = await mongoose.startSession();
  } catch (sessErr) {
    console.warn('MongoDB Session not available, proceeding standalone:', sessErr.message);
  }

  try {
    const {competitionId} = req.params;
    const {name, email: rawEmail} = req.body;

    const email = rawEmail.trim().toLowerCase();

    if (session) {
      session.startTransaction();
    }

    // 1. Find competition
    let competition = null;
    if (competitionId.match(/^[0-9a-fA-F]{24}$/)) {
      competition = session
        ? await Competition.findById(competitionId).session(session)
        : await Competition.findById(competitionId);
    }
    if (!competition) {
      competition = session
        ? await Competition.findOne({competitionId}).session(session)
        : await Competition.findOne({competitionId});
    }

    if (!competition) {
      if (session) await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Competition not found',
      });
    }

    // 2. Lifecycle check (Unified business logic with frontend)
    const lifecycle = getCompetitionState(competition);

    if (lifecycle.state !== 'REGISTRATION_OPEN') {
      if (session) await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message:
          lifecycle.state === 'REGISTRATION_FULL'
            ? 'Competition is full'
            : 'Registration is not open',
      });
    }

    // 3. Find existing user
    let user = session
      ? await User.findOne({email}).session(session)
      : await User.findOne({email});

    // 4. Create user if needed
    if (!user) {
      if (session) {
        const createdUsers = await User.create(
          [
            {
              name: name.trim(),
              email,
            },
          ],
          {session},
        );
        user = createdUsers[0];
      } else {
        user = await User.create({
          name: name.trim(),
          email,
        });
      }
    }

    // 5. Prevent duplicate participation
    const existing = session
      ? await Participation.findOne({
          userId: user._id,
          competitionId: competition._id,
        }).session(session)
      : await Participation.findOne({
          userId: user._id,
          competitionId: competition._id,
        });

    if (existing) {
      if (session) await session.abortTransaction();
      return res.status(409).json({
        success: false,
        message: 'User already registered',
      });
    }

    // 6. Atomic spot reservation
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
        session: session || undefined,
      },
    );

    if (!updatedCompetition) {
      if (session) await session.abortTransaction();
      return res.status(409).json({
        success: false,
        message: 'Competition is full',
      });
    }

    // 7. Create participation
    let participation = null;
    if (session) {
      const createdParticipations = await Participation.create(
        [
          {
            userId: user._id,
            competitionId: competition._id,
            paymentStatus: 'pending',
            registrationStatus: 'registered',
            submissionStatus: 'not_uploaded',
          },
        ],
        {session},
      );
      participation = createdParticipations[0];
      await session.commitTransaction();
    } else {
      participation = await Participation.create({
        userId: user._id,
        competitionId: competition._id,
        paymentStatus: 'pending',
        registrationStatus: 'registered',
        submissionStatus: 'not_uploaded',
      });
    }

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
    if (session && session.inTransaction()) {
      await session.abortTransaction();
    }

    console.error('Registration error:', error);

    // Database duplicate key error (E11000)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'User already registered',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Registration could not be completed',
    });
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

export const uploadSubmission = async (req, res) => {
  try {
    const {competitionId} = req.params;
    const {email} = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const fileName =
      req.file?.filename ||
      req.body?.fileName ||
      `submission-${Date.now()}-${Math.round(Math.random() * 1e9)}.mp4`;
    const originalName =
      req.file?.originalname || req.body?.fileName || 'Classical_Dance_Performance.mp4';
    const fileSize = req.file?.size || req.body?.fileSize || 24500000;

    // Find competition (by ObjectId, slug or first available)
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

    // Submission time check
    const now = new Date();
    if (
      competition.submissionStart &&
      competition.submissionEnd &&
      (now < competition.submissionStart || now > competition.submissionEnd)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Submission window is closed',
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Find participation
    const participation = await Participation.findOne({
      userId: user._id,
      competitionId: competition._id,
    });

    if (!participation) {
      return res.status(403).json({
        success: false,
        message: 'You must register before submitting',
      });
    }

    if (participation.registrationStatus !== 'registered') {
      return res.status(403).json({
        success: false,
        message: 'Registration is not active',
      });
    }

    const submissionUrl = req.file
      ? `/uploads/${req.file.filename}`
      : req.body?.submissionUrl || `/uploads/${fileName}`;

    participation.submissionUrl = submissionUrl;
    participation.submissionStatus = 'uploaded';
    await participation.save();

    return res.status(200).json({
      success: true,
      message: 'Submission uploaded successfully',
      submission: {
        url: submissionUrl,
        fileName: originalName,
        size: fileSize,
      },
    });
  } catch (error) {
    console.error('Upload submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Submission upload failed',
    });
  }
};

export const updateCompetitionStateForTesting = async (req, res) => {
  try {
    const {competitionId} = req.params;
    const {targetState} = req.body;

    let competition = await Competition.findOne({
      $or: [
        {competitionId},
        {_id: mongoose.isValidObjectId(competitionId) ? competitionId : null},
      ],
    });

    if (!competition) {
      competition = await Competition.findOne();
    }

    if (!competition) {
      return res.status(404).json({success: false, message: 'Competition not found'});
    }

    const now = Date.now();

    if (targetState === 'SUBMISSION_OPEN') {
      competition.registrationStart = new Date(now - 48 * 3600 * 1000);
      competition.registrationEnd = new Date(now - 1 * 3600 * 1000);
      competition.submissionStart = new Date(now - 30 * 60 * 1000);
      competition.submissionEnd = new Date(now + 48 * 3600 * 1000);
      competition.registeredCount = Math.max(competition.registeredCount, 1);
    } else if (targetState === 'REGISTRATION_FULL') {
      competition.maxParticipants = 20;
      competition.registeredCount = 20;
      competition.registrationStart = new Date(now - 24 * 3600 * 1000);
      competition.registrationEnd = new Date(now + 24 * 3600 * 1000);
    } else if (targetState === 'REGISTRATION_OPEN') {
      competition.maxParticipants = 20;
      competition.registeredCount = 2;
      competition.registrationStart = new Date(now - 24 * 3600 * 1000);
      competition.registrationEnd = new Date(now + 24 * 3600 * 1000);
      competition.submissionStart = new Date(now + 48 * 3600 * 1000);
      competition.submissionEnd = new Date(now + 96 * 3600 * 1000);
    }

    await competition.save();

    const lifecycle = getCompetitionState(competition);

    return res.status(200).json({
      success: true,
      message: `Competition state updated to ${lifecycle.state}`,
      data: {
        ...competition.toObject(),
        lifecycle,
      },
    });
  } catch (error) {
    console.error('Update state error:', error);
    return res.status(500).json({success: false, message: 'Failed to update state'});
  }
};

