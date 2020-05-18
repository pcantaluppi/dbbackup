require("dotenv").config();

var express = require("express");
var router = express.Router();

function decode(value) {
  let buff = Buffer.from(value, "base64");
  let decoded = buff.toString("utf-8");
  return decoded;
}

/* GET backup */
router.get("/", (req, res, next) => {
  //if (req.body.key === decode(process.env.API_SECRET)) {
    res.download("/db/dump.sql.gz", "dump.sql.gz", function (err) {});
  // } else {
  //   res.send(
  //     JSON.stringify({ status: 401, error: "unauthorized", response: null })
  //   );
  }
});

module.exports = router;
