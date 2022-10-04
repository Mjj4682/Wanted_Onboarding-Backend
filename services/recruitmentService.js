const error = require("../middlewares/errorConstructor");

const {
  Recruitment,
  sequelize,
  Stack,
  Company,
  Country,
  Region,
} = require("../models");

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
    throw new error("INVALID_DATA_INPUT", 500);
  }
};

const getRecruitment = async (searchWord) => {
  try {
    // const recruitmentList = await Recruitment.findAll({
    //   attributes: ["id", "position", "compensation"],
    //   include: [
    //     {
    //       model: Stack,
    //       attributes: ["name"],
    //     },
    //     {
    //       model: Company,
    //       attributes: ["name"],
    //       include: [
    //         {
    //           model: Region,
    //           attributes: ["name"],
    //           include: [
    //             {
    //               model: Country,
    //               attributes: ["name"],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // });
    // orm방식이 안 예쁜거 같아서 raw 쿼리를 사용했습니다. 비교를 위해 일부로 지우지 않았습니다.
    const recruitmentList = await sequelize.query(
      `
    SELECT 
      recruitment.id,
      company.name AS companyName,
      country.name AS countryName,
      region.name AS regionName,
      position,
      compensation,
      stack.name AS stackName
    FROM recruitment
    INNER JOIN company ON company_id = company.id
    INNER JOIN region ON region_id = region.id
    INNER JOIN country ON country_id = country.id
    INNER JOIN stack ON stack_id = stack.id
    WHERE CONCAT(
      company.name,
      country.name,
      region.name,
      position,
      compensation,
      stack.name) 
    REGEXP "${searchWord}"`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return recruitmentList;
  } catch (err) {
    throw new error("INVALID_DATA_INPUT", 500);
  }
};

const getDetailRecruitment = async (recruitmentId) => {
  const companyId = await Recruitment.findAll({
    attributes: ["company_id"],
    raw: true,
    where: { id: recruitmentId },
  });
  if (companyId.length === 0) {
    throw new error("id does not exist", 400);
  }
  try {
    const recruitmentList = await sequelize.query(
      `
    SELECT 
      recruitment.id,
      company.name AS companyName,
      country.name AS countryName,
      region.name AS regionName,
      position,
      compensation,
      stack.name AS stackName,
      contents,
      (SELECT 
        JSON_ARRAYAGG(id) 
      FROM recruitment 
      WHERE company_id = ${companyId[0].company_id}) 
      AS idList
    FROM recruitment
    INNER JOIN company ON company_id = company.id
    INNER JOIN region ON region_id = region.id
    INNER JOIN country ON country_id = country.id
    INNER JOIN stack ON stack_id = stack.id
    WHERE recruitment.id = ${recruitmentId}`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return recruitmentList;
  } catch (err) {
    throw new error("INVALID_DATA_INPUT", 500);
  }
};

module.exports = {
  registerRecruitment,
  updateRecruitment,
  deleteRecruitment,
  getRecruitment,
  getDetailRecruitment,
};
