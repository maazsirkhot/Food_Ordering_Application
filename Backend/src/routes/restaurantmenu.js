var express = require('express');
var pool = require('../helpers/pool');
var router = express.Router();
var crypt = require('../helpers/passwordEncryption');

router.route('/UserDashboard/:restname').get(function(req, res){
    console.log("Inside Menu");
    var rest_name = req.params.restname;
    console.log(rest_name);
    getMenuQuery = 'SELECT * from items WHERE rest_name = ?';
    pool.query(getMenuQuery, [rest_name], (err, result) => {
        if(err){
            console.log("Database error occurred");
            res.status(400).json({responseMessage: 'Some Error occurred with database'});
        }
        else{
            if(result.length > 0){
                console.log(result);
                res.status(200).json(result);
            } else {
                console.log("No Items Found");
                res.status(400).json({responseMessage: 'Menu not available'});
            }
        }
    })
})

router.route('/updateMenu').post(function(req, res){
    console.log("Inside Update Menu");
        itemname = req.body.itemname,
        itemdescription = req.body.itemdescription,
        rest_name = req.body.restname,
        itemprice = req.body.itemprice,
        itemstatus = req.body.itemstatus,
        newitemname = req.body.newitemname
    
    if(itemstatus == 'NEW'){
        addItemQuery = 'INSERT INTO items (itemname, itemdescription, rest_name, itemprice) VALUES (?, ?, ?, ?)';
        pool.query(addItemQuery, [itemname, itemdescription, rest_name, itemprice], (err, result) => {
            if(err){
                console.log("Database error occurred");
                res.status(400).json({responseMessage: 'Some Error occurred with database new'});
            } else {
                console.log("Item added to the restaurant");
                res.status(200).json({responseMessage: 'Item added to the restaurant'});
            }
        })
    } else if (itemstatus == 'DELETE'){
        deleteItemQuery = 'DELETE FROM items WHERE (rest_name = ?) and (itemname = ?)';
        pool.query(deleteItemQuery, [rest_name, itemname], (err, result1) => {
            if(err){
                console.log("Database error occurred");
                res.status(400).json({responseMessage: 'Some Error occurred with database delete'});
            } else {
                console.log("Item deleted from restaurant");
                res.status(200).json({responseMessage: 'Item deleted from restaurant'});
            }
        })
    } else {
        updateItemQuery = 'UPDATE items SET itemname = ?, itemdescription = ?, itemprice = ? WHERE (rest_name = ?) and (itemname = ?)';
        pool.query(updateItemQuery, [newitemname, itemdescription, itemprice, rest_name, itemname], (err, result2) => {
            if(err){
                console.log("Database error occurred");
                res.status(400).json({responseMessage: 'Some Error occurred with database update'});
            } else {
                console.log("Item updated in restaurant");
                res.status(200).json({responseMessage: 'Item updated in restaurant'});
            }
        })

    }
})


module.exports = router;