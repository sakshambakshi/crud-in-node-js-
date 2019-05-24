const express = require('express');
const Checkrouter = express.Router();

const verify = {}
/* GET home page. */
Checkrouter.post('/', function(req, res, next) {
    console.log('I am in routing')
    console.log(req.body);
    const today = new Date();
    const  year = today.getFullYear();
    const userAge =   year - parseInt(req.body.dob.split('/')[2])
    console.log(userAge);

    if(req.body.name === 'Mukul'  && userAge > 18  ){
       verify = req.body
        console.log(userAge);
        next();
    }

    
  });
  

  module.exports = Checkrouter , verify;