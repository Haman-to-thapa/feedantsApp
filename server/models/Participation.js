import mongoose from 'mongoose';

const participationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    competitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Competition',
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },

    registrationStatus: {
      type: String,
      enum: ['registered', 'cancelled'],
      default: 'registered',
    },

    submissionStatus: {
      type: String,
      enum: ['not_uploaded', 'uploaded'],
      default: 'not_uploaded',
    },

    submissionUrl: {
      type: String,
      default: null,
    },

    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Same user cannot register twice for same competition
participationSchema.index(
  {
    userId: 1,
    competitionId: 1,
  },
  {
    unique: true,
  },
);

const Participation = mongoose.model(
  'Participation',
  participationSchema,
);

export default Participation;
