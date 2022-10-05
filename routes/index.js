const express = require("express");
const router = express.Router();
const recruitmentRouter = require("./recruitmentRouter");
const applicationRouter = require("./applicationRouter");

router.use("/recruitment", recruitmentRouter.router);

router.use("/application", applicationRouter.router);

module.exports = router;
