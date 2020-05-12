require("dotenv").config();
var express = require("express");
var router = express.Router();
var mysqldump = require("mysqldump");

const { exec } = require("child_process");

/* GET backup */
router.get("/", function (req, res, next) {
  console.log(Buffer.from(process.env.API_SECRET, "base64"));
  try {
    mysqldump({
      connection: {
        host: process.env.DB_HOST,
        user: "root",
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
      dumpToFile: "./dump.sql.gz",
      compressFile: true,
    });
  } catch (ex) {
    console.log(ex);
  } finally {
    JSON.stringify({ status: 200, error: null, response: "ok" });
  }
});

module.exports = router;
