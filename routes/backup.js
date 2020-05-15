require("dotenv").config();

var express = require("express");
var router = express.Router();
var mysqldump = require("mysqldump");

/* GET backup */
router.get("/", (req, res, next) => {
  mysqldump({
    connection: {
      user: "root",
      password: process.env.DB_ROOT_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
    },
    dumpToFile: "/db/dump.sql.gz",
    compressFile: true,
  })
    .then(() => {
      res.download("/db/dump.sql.gz", "dump.sql.gz", function (err) {});
    })
    .catch((err) => {
      JSON.stringify({ status: 500, error: err, response: null });
    });
});

module.exports = router;
