import mongoose from 'mongoose';

export const validateObjectId = (req, res, next) => {
  const {competitionId} = req.params;

  // Support 24-hex-char MongoDB ObjectId and custom slug 'classical-dance-001'
  const isMongoId = mongoose.Types.ObjectId.isValid(competitionId);
  const isCustomSlug = competitionId === 'classical-dance-001';

  if (!isMongoId && !isCustomSlug) {
    return res.status(400).json({
      success: false,
      message: 'Invalid competition ID',
    });
  }

  next();
};

export default validateObjectId;
