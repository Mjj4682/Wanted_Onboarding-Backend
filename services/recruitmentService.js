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

module.exports = {
  registerRecruitment,
};
