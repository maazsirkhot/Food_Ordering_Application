var express = require('express');
var pool = require('../helpers/pool');
var router = express.Router();
var crypt = require('../helpers/passwordEncryption');

router.route('/SignUpUser').post(function(req, res){
    var encryptPass;
    console.log("SignUp User");
    var signupData = {
        "name": req.body.fname + " " + req.body.lname,
        "email": req.body.email,
        "password": req.body.password,
        "mob": req.body.mob
    }
    //password encryption
    // encrypt.createHash(signupData.password, function (response){
    //     encryptPass = response;
    //     console.log("Encrypted Password is: " + encryptPass);
    // }, function (err) {
    //     console.log(err);
    //   });
    // // comparePass = "$2a$10$YRUYPHWJsA3xpwGKd7HchOX4YLDvqY9HmRlQC3/eLJm2ZomC2aEJW";

    // encrypt.compareHash(signupData.password, encryptPass, function (err, checkMatch) {
    //     if(checkMatch){
    //         console.log("Password Matched");
    //     }
    // }, function (err) {
    //     console.log(err);
    //   });

    let insertUser = "INSERT INTO users (name, username, password, contact) VALUES (?, ?, ?, ?)";
    pool.query(insertUser, [signupData.name, signupData.email, signupData.password, signupData.mob, signupData.role], (err, result) => {
        if(err){
           console.log("Error occurred.")
           res.status(400).send("Sign up unsuccessful");
        }
        else{
           console.log("User added to database");
           res.status(200).send("User added");
        }
    })
})

router.route('/SignUpOwner').post(function(req, res){
    console.log("SignUp Owner");
    var signupData = {
        "name": req.body.fname + " " + req.body.lname,
        "email": req.body.email,
        "password": req.body.password,
        "mob": req.body.mob,
        "restname": req.body.restname,
        "restzip": req.body.restzip,
        "cuisine": req.body.cuisine
    }
    var insertOwner = "INSERT INTO owners (ownername, owneremail, password, ownermob, rest_name, rest_zip, cuisine) VALUES (?, ?, ?, ?, ?, ?, ?)";
    pool.query(insertOwner, [signupData.name, signupData.email, signupData.password, signupData.mob, signupData.restname, signupData.restzip, signupData.cuisine], (err, result) => {
        if(err){
            console.log("Error occurred.");
        }
        else{
            console.log("Owner added to database");
            res.status(200).send("User added");
        }
    })
})

router.route('/loginUser').post((req, res) => {
    var email = req.body.username;
    var password = req.body.password;
    loginCheckQuery = "SELECT * FROM users WHERE username = ?";
    pool.query(loginCheckQuery, [email], (err, result) => {
        if(err) {
            console.log("Error occurred.");
            res.status(400).json({responseMessage: 'Username does not exist'});
        }
        else {
            console.log(result);
            if(result.length > 0 && result[0].password == password){
                res.cookie('cookie',"usercookie",{maxAge: 900000, httpOnly: false, path : '/'});
                res.cookie('cookieemail',result[0].username,{maxAge: 900000, httpOnly: false, path : '/'});
                res.cookie('cookiename',result[0].name,{maxAge: 900000, httpOnly: false, path : '/'});
                req.session.user = result[0].username;
                console.log("User Login successful");
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({message:"login success"}));
            } else {
                res.status(401).json({responseMessage: 'Invalid Credentials. Please try again'});
                console.log("Invalid Credentials");
                res.end("Unsuccessful Login");
            }
        }
    });
});

router.route('/loginOwner').post((req, res) => {
    var email = req.body.username;
    var password = req.body.password;

    loginCheckQuery = "SELECT * FROM owners WHERE owneremail = ?";
    pool.query(loginCheckQuery, [email], (err, result) => {
        if(err) {
            console.log("Error occurred.");
            res.status(400).json({responseMessage: 'Username does not exist'});
        }
        else {
            console.log(result);
            if(result.length > 0 && result[0].password == password){
                res.cookie('cookie',"ownercookie",{maxAge: 900000, httpOnly: false, path : '/'});
                res.cookie('cookieemail',result[0].owneremail,{maxAge: 900000, httpOnly: false, path : '/'});
                res.cookie('cookiename',result[0].ownername,{maxAge: 900000, httpOnly: false, path : '/'});
                res.cookie('cookierestname',result[0].rest_name,{maxAge: 900000, httpOnly: false, path : '/'});
                req.session.user = result[0].username;
                console.log("Owner Login successful");
                res.status(200).json({responseMessage: 'Login Successful'});
            } else {
                res.status(401).json({responseMessage: 'Invalid Credentials. Please try again'});
                console.log("Invalid Credentials");
            }
        }
    });
});

module.exports = router;