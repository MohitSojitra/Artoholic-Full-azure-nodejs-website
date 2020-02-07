

const cors = require("cors");
const express = require('express'); 

const app = express();

const whiteSpaces = ["http://localhost:3000","https://localhost:3443"];

var corsOptionsDelegate = (req , cb)=>{
    var corsOptions;
    console.log(req.header("Origin"));
    if(whiteSpaces.indexOf(req.header("Origin")) !== -1)
    {
        corsOptions = { origin : false}
    }
    else{
        corsOptions = { origin : true}
    }
    cb(null , corsOptions)
};


exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);