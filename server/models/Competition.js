import mongoose from 'mongoose';

const competitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    prizePool: {
      type: Number,
      required: true,
    },

    entryFee: {
      type: Number,
      required: true,
    },

    maxParticipants: {
      type: Number,
      required: true,
    },

    registeredCount: {
      type: Number,
      default: 0,
    },

    registrationStart: {
      type: Date,
      required: true,
    },

    registrationEnd: {
      type: Date,
      required: true,
    },

    submissionStart: {
      type: Date,
      required: true,
    },

    submissionEnd: {
      type: Date,
      required: true,
    },

    resultDate: {
      type: Date,
      required: true,
    },

    judge: {
      name: String,
      profession: String,
      experience: String,
      image: String,
      introVideo: String,
    },

    about: {
      type: String,
      default: '',
    },

    judgingParameters: {
      type: [String],
      default: [],
    },

    rules: {
      type: [String],
      default: [],
    },

    eligibility: {
      type: [String],
      default: [],
    },

    rewards: {
      first: Number,
      second: Number,
      third: Number,
      fourthToSixth: String,
    },

    status: {
      type: String,
      enum: [
        'draft',
        'upcoming',
        'open',
        'closed',
        'submission',
        'completed',
      ],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  },
);

const Competition = mongoose.model('Competition', competitionSchema);
export default Competition;
