const error = require("../middlewares/errorConstructor");

const { Application } = require("../models");

const applyApplication = async (recruitmentId, userId) => {
  const checkApplicationList = await Application.count({
    where: { recruitment_id: recruitmentId, user_id: userId },
  });
  if (checkApplicationList === 1) {
    throw new error("already applied", 400);
  }
  try {
    await Application.create({
      recruitment_id: recruitmentId,
      user_id: userId,
    });
  } catch (err) {
    console.log(err);
    throw new error("INVALID_DATA_INPUT", 500);
  }
};

module.exports = {
  applyApplication,
};
