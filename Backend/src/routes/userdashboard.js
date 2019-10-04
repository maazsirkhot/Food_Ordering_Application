var express = require('express');
var pool = require('../helpers/pool');
var router = express.Router();
var crypt = require('../helpers/passwordEncryption');

router.route('/UserDashboard').post(function(req, res){
    console.log("Inside UserDashboard API");

    var searchRestaurant = "%" + req.body.itemname + "%";
    searchQuery = "SELECT distinct(i.rest_name), o.cuisine from items i, owners o WHERE i.itemname like ?";
    pool.query(searchQuery, [searchRestaurant], (err, result) => {
        if(err) {
            console.log("Error occurred.");
            res.status(400).json({responseMessage: 'Username does not exist'});
        }
        else {
            console.log(result);
            if(result.length > 0){
                res.status(200).json(result);
            }
            else{
                console.log("Item not available");
                res.status(401).json({responseMessage: 'Restaurant not found'});
            }
        }
    })

})

router.route('/OwnerDashboard').get(function(req, res){
    console.log("Inside Owner Dashboard");
    

})


module.exports = router;