require("dotenv").config();
var express = require("express");
var router = express.Router();
var mysqldump = require("mysqldump");

const { exec } = require("child_process");

/* GET backup */
router.get("/", function (req, res, next) {
  console.log(Buffer.from(process.env.API_SECRET, "base64"));
  res.download("/db/dump.sql.gz", "dump.sql.gz", function (err) {});
});

module.exports = router;
