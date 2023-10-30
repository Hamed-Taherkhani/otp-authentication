const validateDataStruct = (schema) => async (req, res, next) => {
  const data = req.body;

  try {
    await schema.validateAsync(data);
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

module.exports = { validateDataStruct };
