require("dotenv").config();

var express = require("express");
var router = express.Router();
var mysqldump = require("mysqldump");

const { exec } = require("child_process");

/* GET backup */
router.get("/", function (req, res, next) {
  //try {
  mysqldump({
    connection: {
      host: process.env.DB_HOST,
      user: "root",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    dumpToFile: "/db/dump.sql.gz",
    compressFile: true,
  });
  //} catch (ex) {
  //   JSON.stringify({ status: 500, error: ex, response: null });
  // } finally {
  //   res.download("/db/dump.sql.gz", "dump.sql.gz", function (err) {});
  // }
});

module.exports = router;
