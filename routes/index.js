const express = require("express");
const router = express.Router();
const recruitmentRouter = require("./recruitmentRouter");

router.use("/recruitment", recruitmentRouter.router);

module.exports = router;
