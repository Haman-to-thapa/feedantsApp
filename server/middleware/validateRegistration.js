export const validateRegistration = (req, res, next) => {
  const {name, email} = req.body;

  if (typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Valid name is required',
    });
  }

  if (
    typeof email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return res.status(400).json({
      success: false,
      message: 'Valid email is required',
    });
  }

  next();
};

export default validateRegistration;
