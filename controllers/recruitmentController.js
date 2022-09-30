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
  res.status(201).json({ message: "register success" });
};

const updateRecruitment = async (req, res) => {
  const recruitmentId = req.params.id;
  const { position, compensation, contents, stackId } = req.body;
  if (!recruitmentId || !position || !contents || !stackId) {
    throw new error("empty required value", 400);
  }
  await recruitmentService.updateRecruitment(
    recruitmentId,
    position,
    compensation,
    contents,
    stackId
  );
  res.status(200).json({ message: "update success" });
};

const deleteRecruitment = async (req, res) => {
  const recruitmentId = req.params.id;
  await recruitmentService.deleteRecruitment(recruitmentId);
  res.status(204).json({});
};

const getRecruitment = async (req, res) => {
  let searchWord = req.query.search;
  if (!searchWord) {
    searchWord = ".";
  }
  const recruitmentList = await recruitmentService.getRecruitment(searchWord);
  res.status(200).json({ recruitmentList });
};

const getDetailRecruitment = async (req, res) => {
  const recruitmentId = req.params.id;
  const detailRecruitment = await recruitmentService.getDetailRecruitment(
    recruitmentId
  );
  res.status(200).json({ detailRecruitment: detailRecruitment[0] });
};

module.exports = {
  registerRecruitment,
  updateRecruitment,
  deleteRecruitment,
  getRecruitment,
  getDetailRecruitment,
};
