const express = require("express");
const bodyParser = require("body-parser")
const account = require("../models/accountModel");
const accountRouter = express.Router();
const authenticate = require("../authenticate");
const cors = require("./cors");
accountRouter.use(bodyParser.json());

accountRouter.route("/")
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    account.find({})
    .then((accounts) =>{
        res.statusCode = 200;
        res.setHeader("content-type" , "application/json");
        res.json(accounts)
    }).catch((err)=> next(err))
    
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
   account.create(req.body)
   .then((account)=>{
        res.statusCode = 200;
        res.setHeader("content-type" , "application/json");
        res.json(account)
   }).catch((err)=> next(err))
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin ,(req,res,next) =>{
    res.statusCode = 404;
    res.end("method does'nt supported ");
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin ,(req,res,next) =>{
  Apps.remove({})
  .then((apps)=>{
    res.statusCode = 200;
    res.setHeader("content-type" , "application/json");
    res.json(apps);
  })
});




accountRouter.route("/:accountName")
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    account.find({accountName : req.params.accountName})
    .then((account) =>{
        res.statusCode = 200;
        res.setHeader("content-type" , "application/json");
        res.json(account)
    }).catch((err)=> next(err))
    
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    res.statusCode = 404;
    res.end("method does'nt supported ");
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin ,(req,res,next) =>{
    account.findOneAndUpdate({accountName : req.params.accountName} , {$set : req.body} , {new :true})
    .then((account) =>{
        res.statusCode= 200;
        res.setHeader("Content-Type" , "application/json");
        res.json(account);
    }).catch((err)=> next(err))
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin ,(req,res,next) =>{
  account.findOneAndRemove({accountName : req.params.accountName})
  .then((apps)=>{
    res.statusCode = 200;
    res.setHeader("content-type" , "application/json");
    res.json(apps);
  })
});
module.exports = accountRouter;