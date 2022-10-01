const applicationService = require("../services/applicationService");
const error = require("../middlewares/errorConstructor");

const applyApplication = async (req, res) => {
  const { recruitmentId, userId } = req.body;
  if (!recruitmentId || !userId) {
    throw new error("empty required value", 400);
  }
  await applicationService.applyApplication(recruitmentId, userId);
  res.status(201).json({ message: "application completed" });
};

module.exports = {
  applyApplication,
};
