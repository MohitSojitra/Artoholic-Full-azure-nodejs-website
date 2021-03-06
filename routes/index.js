var express = require('express');
var router = express.Router();
let authenticate = require("../authenticate");
let cors = require("./cors");
/* GET home page. */
router.get('/',  cors.cors,function(req, res, next) {
  res.sendFile(__dirname + "/public/index.html")
});

router.get('/check',cors.cors,authenticate.verifyUser, authenticate.verifyAdmin ,function(req, res, next) {
    res.statusCode = 200;
    res.setHeader("Content-type" , "application/json");
    res.json({success : "ok"})
});
module.exports = router;
