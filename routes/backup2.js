require("dotenv").config();

var express = require("express");
var router = express.Router();
var mysqldump = require("mysqldump");

const { exec } = require("child_process");

function take_a_dump() {
  mysqldump({
    connection: {
      user: "root",
      password: process.env.DB_ROOT_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
    },
    dumpToFile: "/db/dump.sql.gz",
    compressFile: true,
  });
}

/* GET backup */
router.get("/", function (req, res, next) {
  take_a_dump(() => {
    res.download("/db/dump.sql.gz", "dump.sql.gz", function (err) {});
  });
});

module.exports = router;
