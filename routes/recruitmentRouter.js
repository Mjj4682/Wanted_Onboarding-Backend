const express = require("express");
const recruitmentController = require("../controllers/recruitmentController");
const errorHandler = require("../middlewares/errorHandler");

const router = express.Router();

router.post("/", errorHandler(recruitmentController.registerRecruitment));

router.patch("/:id", errorHandler(recruitmentController.updateRecruitment));

router.delete("/:id", errorHandler(recruitmentController.deleteRecruitment));

router.get("/", errorHandler(recruitmentController.getRecruitment));

router.get("/:id", errorHandler(recruitmentController.getDetailRecruitment));

module.exports = {
  router,
};
