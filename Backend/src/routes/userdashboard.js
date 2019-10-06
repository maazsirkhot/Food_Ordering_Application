var express = require('express');
var pool = require('../helpers/pool');
var router = express.Router();
var crypt = require('../helpers/passwordEncryption');

router.route('/UserDashboard').post(function(req, res){
    console.log("Inside UserDashboard API");

    var searchRestaurant = "%" + req.body.itemname + "%";
    searchQuery = "SELECT DISTINCT(I.REST_NAME), O.CUISINE FROM ITEMS I left join OWNERS O ON I.REST_NAME=O.REST_NAME WHERE I.ITEMNAME LIKE ?";
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






module.exports = router;