const recruitmentService = require("../services/recruitmentService");
const error = require("../middlewares/errorConstructor");

const registerRecruitment = async (req, res) => {
  const { companyId, position, compensation, contents, stackId } = req.body;
  if (!companyId || !position || !contents || !stackId) {
    throw new error("empty required value", 400);
  }
  await recruitmentService.registerRecruitment(
    companyId,
    position,
    compensation,
    contents,
    stackId
  );
  res.status(200).json({ message: "register success" });
};

module.exports = {
  registerRecruitment,
};
