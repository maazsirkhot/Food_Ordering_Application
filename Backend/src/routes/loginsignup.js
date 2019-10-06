var express = require('express');
var pool = require('../helpers/pool');
var router = express.Router();
var encrypt = require('../helpers/passwordEncryption');

router.route('/SignUpUser').post(function(req, res){
    var encryptPass;
    console.log("SignUp User");
    var signupData = {
        "name": req.body.name,
        "email": req.body.username,
        "password": req.body.password
    }
    //password encryption
    encrypt.createHash(signupData.password, function (response){
        encryptPass = response;
        console.log("Encrypted Password is: " + encryptPass);
        let insertUser = "INSERT INTO USERS (NAME, USERNAME, PASSWORD) VALUES (?, ?, ?)";
        pool.query(insertUser, [signupData.name, signupData.email, encryptPass], (err, result) => {
        if(err){
           console.log("Error occurred.")
           res.status(401).send({responseMessage: 'Username already exists'});
        }
        else{
           console.log("User added to database");
           res.status(200).send({message:"User SignUp successful"});
        }
    })
    }, function (err) {
        console.log(err);
        res.status(401).send({responseMessage: 'Error Occurred'});
    });

    
})

router.route('/SignUpOwner').post(function(req, res){
    console.log("SignUp Owner");
    var signupData = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "mob": req.body.mob,
        "restname": req.body.restname,
        "restzip": req.body.restzip,
        "cuisine": req.body.cuisine
    }

    encrypt.createHash(signupData.password, function (response){
        encryptPass = response;
        console.log("Encrypted Password is: " + encryptPass);

        var insertOwner = "INSERT INTO OWNERS (OWNERNAME, OWNEREMAIL, PASSWORD, OWNERMOB, REST_NAME, REST_ZIP, CUISINE) VALUES (?, ?, ?, ?, ?, ?, ?)";
        pool.query(insertOwner, [signupData.name, signupData.email, encryptPass, signupData.mob, signupData.restname, signupData.restzip, signupData.cuisine], (err, result) => {
            if(err){
                console.log("Error occurred.");
                res.status(401).send({responseMessage: 'Username already exists'});
            }
            else{
                console.log("Owner added to database");
                res.status(200).send("User added");
            }
        })
    }, function (err) {
        console.log(err);
        res.status(401).send({responseMessage: 'Error Occurred'});
    });
      
})

router.route('/loginUser').post((req, res) => {
    var email = req.body.username;
    var password = req.body.password;
    loginCheckQuery = "SELECT * FROM USERS WHERE USERNAME = ?";
    pool.query(loginCheckQuery, [email], (err, result) => {
        if(err) {
            console.log("Error occurred.");
            res.status(400).json({responseMessage: 'Username does not exist'});
        }
        else {
            console.log(result);
            if(result.length > 0){
                encrypt.compareHash(password, result[0].PASSWORD, function(err, isMatch) {
                    if (isMatch && !err){
                        res.cookie('cookie',"usercookie",{maxAge: 900000, httpOnly: false, path : '/'});
                        res.cookie('cookieemail',result[0].USERNAME,{maxAge: 900000, httpOnly: false, path : '/'});
                        res.cookie('cookiename',result[0].NAME,{maxAge: 900000, httpOnly: false, path : '/'});
                        req.session.user = result[0].USERNAME;
                        console.log("User Login successful");
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify({message:"login success"}));
                    } else {
                        res.status(401).json({responseMessage: 'Authentication failed. Passwords did not match.'})
                        console.log("Authentication failed. Passwords did not match.");
                    }
                }, function (err) {
                    console.log(err);
                    res.status(401).json({responseMessage: 'Authentication failed. Passwords did not match.'})
                });  
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

    loginCheckQuery = "SELECT * FROM OWNERS WHERE OWNEREMAIL = ?";
    pool.query(loginCheckQuery, [email], (err, result) => {
        if(err) {
            console.log("Error occurred.");
            res.status(400).json({responseMessage: 'Username does not exist'});
        }
        else {
            console.log(result);
            if(result.length > 0){
                encrypt.compareHash(password, result[0].PASSWORD, function(err, isMatch){
                    if (isMatch && !err){
                        res.cookie('cookie',"ownercookie",{maxAge: 900000, httpOnly: false, path : '/'});
                        res.cookie('cookieemail',result[0].OWNEREMAIL,{maxAge: 900000, httpOnly: false, path : '/'});
                        res.cookie('cookiename',result[0].OWNERNAME,{maxAge: 900000, httpOnly: false, path : '/'});
                        res.cookie('cookierestname',result[0].REST_NAME,{maxAge: 900000, httpOnly: false, path : '/'});
                        req.session.user = result[0].USERNAME;
                        console.log("Owner Login successful");
                        res.status(200).json({responseMessage: 'Login Successful'});
                    } else {
                        res.status(401).json({responseMessage: 'Authentication failed. Passwords did not match.'})
                        console.log("Authentication failed. Passwords did not match.");
                    }

                }, function (err) {
                    console.log(err);
                    res.status(401).json({responseMessage: 'Authentication failed. Passwords did not match.'})
                });

            } else {
                res.status(401).json({responseMessage: 'Invalid Credentials. Please try again'});
                console.log("Invalid Credentials");
            }
        }
    });
});

module.exports = router;