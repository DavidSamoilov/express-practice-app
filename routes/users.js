var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond w2ith a resource tes1t11");
});

module.exports = router;
