var express = require('express');
var pool = require('../helpers/pool');
var router = express.Router();
var crypt = require('../helpers/passwordEncryption');


router.route('/OwnerProfile').post(function(req, res){
    console.log("OwnerProfile");
    var signupData = {
        "name": req.body.name,
        "email": req.body.email,
        "mob": req.body.mob,
        "restzip": req.body.restzip,
        "cuisine": req.body.cuisine
    }

    var updateOwner = "UPDATE OWNERS SET OWNERNAME = ?, OWNEREMAIL = ?, OWNERMOB = ?, REST_ZIP = ?, CUISINE = ? WHERE (OWNEREMAIL = ?)";
    pool.query(updateOwner, [signupData.name, signupData.email, signupData.mob, signupData.restzip, signupData.cuisine, signupData.email], (err, result1) => {
        if(err){
            console.log("Error occurred.");
            res.status(400).json({responseMessage: 'Error Occurred'});
        }
        else{
            console.log("Owner Profile Updated");
            res.status(200).json({responseMessage: 'Profile Updated'});
        }
    })  

})

router.route('/UserProfile').post(function(req, res){
    console.log("OwnerProfile");
    var signupData = {
        "name": req.body.name,
        "email": req.body.email,
        "mob": req.body.contact,
        "address": req.body.address
    }
    var updateUser = "UPDATE USERS SET NAME = ?, USERNAME = ?, CONTACT = ?, ADDRESS = ? WHERE (USERNAME = ?)";
    pool.query(updateUser, [signupData.name, signupData.email, signupData.mob, signupData.address, signupData.email], (err, result) => {
        if(err){
            console.log("Error occurred.");
            res.status(400).send("User does not exist");
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

    var getProfileQuery = "SELECT * FROM USERS WHERE USERNAME = ?";
    pool.query(getProfileQuery, [username], (err, result) => {
        if(err){
            console.log("Error with database");
            res.status(400).json({responseMessage: 'Error Occurred'});
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

    var getProfileQuery = "SELECT * FROM OWNERS WHERE OWNEREMAIL = ?";
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