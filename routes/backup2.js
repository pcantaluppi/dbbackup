require("dotenv").config();

var express = require("express");
var router = express.Router();
var mysqldump = require("mysqldump");

const { exec } = require("child_process");

async function take_a_dump() {
  await mysqldump({
    connection: {
      user: "root",
      password: process.env.DB_ROOT_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
    },
    dumpToFile: "/db/dump.sql.gz",
    compressFile: true,
  });
  console.log("backup done");
}

/* GET backup */
router.get("/", async (req, res, next) => {
  await take_a_dump(() => {
    res.download("/db/dump.sql.gz", "dump.sql.gz", function (err) {});
    console.log("download ready");
  });
});

module.exports = router;
