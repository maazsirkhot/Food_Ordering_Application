var express = require('express');
var pool = require('../helpers/pool');
var router = express.Router();
var crypt = require('../helpers/passwordEncryption');


router.route('/OwnerProfile').post(function(req, res){
    console.log("OwnerProfile");
    var signupData = {
        "name": req.body.fname + " " + req.body.lname,
        "email": req.body.email,
        "password": req.body.password,
        "mob": req.body.mob,
        "restname": req.body.restname,
        "restzip": req.body.restzip,
        "cuisine": req.body.cuisine
    }
    var updateOwner = "UPDATE owners SET ownername = ?, owneremail = ?, ownermob = ?, rest_name = ?, rest_zip = ?, cuisine = ?, password = ? WHERE (owneremail = ?)";
    pool.query(updateOwner, [signupData.name, signupData.email, signupData.mob, signupData.restname, signupData.restzip, signupData.cuisine, signupData.password, signupData.email], (err, result) => {
        if(err){
            console.log("Error occurred.");
        }
        else{
            console.log("Owner Profile Updated");
            res.status(200).send("Profile Updated");
        }
    })
})

router.route('/UserProfile').post(function(req, res){
    console.log("OwnerProfile");
    var signupData = {
        "name": req.body.fname + " " + req.body.lname,
        "email": req.body.email,
        "password": req.body.password,
        "mob": req.body.mob,
        "address": req.body.address
    }
    var updateOwner = "UPDATE users SET name = ?, username = ?, contact = ?, address = ?, password = ? WHERE (username = ?)";
    pool.query(updateOwner, [signupData.name, signupData.email, signupData.mob, signupData.address, signupData.password, signupData.email], (err, result) => {
        if(err){
            console.log("Error occurred.");
        }
        else{
            console.log("User Profile Updated");
            res.status(200).send("Profile Updated");
        }
    })
})

module.exports = router;