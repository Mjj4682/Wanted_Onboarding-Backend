const error = require("../middlewares/errorConstructor");

const { Application, Recruitment, User } = require("../models");

const applyApplication = async (recruitmentId, userId) => {
  const checkRecruitmentId = await Recruitment.count({
    where: { id: recruitmentId },
  });
  if (checkRecruitmentId === 0) {
    throw new error("recruitmentId does not exist", 400);
  }
  const checkUserId = await User.count({
    where: { id: userId },
  });
  if (checkUserId === 0) {
    throw new error("userId does not exist", 400);
  }
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
    throw new error("INVALID_DATA_INPUT", 500);
  }
};

module.exports = {
  applyApplication,
};
