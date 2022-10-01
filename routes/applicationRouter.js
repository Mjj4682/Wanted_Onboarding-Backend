const express = require("express");
const applicationController = require("../controllers/applicationController");
const errorHandler = require("../middlewares/errorHandler");

const router = express.Router();

router.post("/", errorHandler(applicationController.applyApplication));

module.exports = {
  router,
};
