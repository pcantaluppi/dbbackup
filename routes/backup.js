require("dotenv").config();
var express = require("express");
var router = express.Router();

const { exec } = require("child_process");

/* GET backup */
router.get("/", function (req, res, next) {
  var secret = new Buffer.from(
    (process.env.API_SECRET, "base64").toString("ascii")
  );
  //console.log(secret);
  if (req.body.secret === secret) {
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
  } else {
    res.send(
      JSON.stringify({ status: 500, error: "unauthorized", response: null })
    );
  }
});

module.exports = router;
