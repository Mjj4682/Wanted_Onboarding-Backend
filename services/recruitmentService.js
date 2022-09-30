const error = require("../middlewares/errorConstructor");

const { Recruitment } = require("../models");

const registerRecruitment = async (
  companyId,
  position,
  compensation,
  contents,
  stackId
) => {
  try {
    await Recruitment.create({
      company_id: companyId,
      position: position,
      compensation: compensation,
      contents: contents,
      stack_id: stackId,
    });
  } catch (err) {
    console.log(err);
    throw new error("INVALID_DATA_INPUT", 500);
  }
};

const updateRecruitment = async (
  recruitmentId,
  position,
  compensation,
  contents,
  stackId
) => {
  const checkRecruitmentId = await Recruitment.count({
    where: { id: recruitmentId },
  });
  if (checkRecruitmentId === 0) {
    throw new error("id does not exist", 400);
  }
  try {
    await Recruitment.update(
      {
        position: position,
        compensation: compensation,
        contents: contents,
        stack_id: stackId,
      },
      { where: { id: recruitmentId } }
    );
  } catch (err) {
    console.log(err);
    throw new error("INVALID_DATA_INPUT", 500);
  }
};

const deleteRecruitment = async (recruitmentId) => {
  const checkRecruitmentId = await Recruitment.count({
    where: { id: recruitmentId },
  });
  if (checkRecruitmentId === 0) {
    throw new error("id does not exist", 400);
  }
  try {
    await Recruitment.destroy({ where: { id: recruitmentId } });
  } catch (err) {
    console.log(err);
    throw new error("INVALID_DATA_INPUT", 500);
  }
};

module.exports = {
  registerRecruitment,
  updateRecruitment,
  deleteRecruitment,
};
