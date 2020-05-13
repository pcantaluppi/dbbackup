require("dotenv").config();
var express = require("express");
var router = express.Router();
var mysqldump = require("mysqldump");

const { exec } = require("child_process");

// const result = await mysqldump({
//   connection: {
//     user: "root",
//     password: process.env.DB_ROOT_PASSWORD,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//   },
// });

/* GET backup */
router.get("/", function (req, res, next) {
  try {
    mysqldump({
      connection: {
        host: process.env.DB_HOST,
        user: "root",
        password: process.env.DB_ROOT_PASSWORD,
        database: process.env.DB_NAME,
      },
      dumpToFile: "/db/dump_new.sql.gz",
      compressFile: true,
    });
  } catch (ex) {
    JSON.stringify({ status: 500, error: ex, response: null });
  } finally {
    JSON.stringify({ status: 200, error: null, response: "ok" });
  }
});

module.exports = router;
