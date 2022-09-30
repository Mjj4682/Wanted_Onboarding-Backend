const express = require("express");
const recruitmentController = require("../controllers/recruitmentController");
const errorHandler = require("../middlewares/errorHandler");

const router = express.Router();

router.post("/", errorHandler(recruitmentController.registerRecruitment));

router.patch("/:id", errorHandler(recruitmentController.updateRecruitment));

module.exports = {
  router,
};
