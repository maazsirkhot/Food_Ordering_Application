var express = require('express');
var pool = require('../helpers/pool');
var router = express.Router();
var crypt = require('../helpers/passwordEncryption');


router.route('/OwnerProfile').post(function(req, res){
    console.log("OwnerProfile");
    var signupData = {
        "name": req.body.name,
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
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "mob": req.body.contact,
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

router.route('/GetUserProfile').post(function(req, res){
    console.log("Inside get user profile");

    var username = req.body.username;

    var getProfileQuery = "select * from users where username = ?";
    pool.query(getProfileQuery, [username], (err, result) => {
        if(err){
            console.log("Error with database");
        } else {
            if(result.length > 0){
                res.status(200).send(result[0]);
            } else {
                console.log("User does not exist");
                res.status(400).send("User does not exist");
            }
        }
    })

})

router.route('/GetOwnerProfile').post(function(req, res){
    console.log("Inside get user profile");

    var username = req.body.email;

    var getProfileQuery = "select * from owners where owneremail = ?";
    pool.query(getProfileQuery, [username], (err, result) => {
        if(err){
            console.log("Error with database");
        } else {
            if(result.length > 0){
                res.status(200).send(result[0]);
            } else {
                console.log("User does not exist");
                res.status(400).send("User does not exist");
            }
        }
    })

})

module.exports = router;