var express = require('express');
var pool = require('../helpers/pool');
var router = express.Router();
var crypt = require('../helpers/passwordEncryption');

router.route('/GetMenu').post(function(req, res){
    console.log("Inside Menu");
    var rest_name = req.body.restname;
    console.log(rest_name);
    getMenuQuery = 'SELECT * FROM ITEMS WHERE REST_NAME = ?';
    allSections = [];
    eachSection = {
        section : "",
        items : []
    }

    arraySearch = (sect, arr) => {
        for(i = 0; i < arr.length; i++){
            if(arr[i].section == sect)
                return i;
        }
        return -1;
    }

    pool.query(getMenuQuery, [rest_name], (err, result) => {
        if(err){
            console.log("Database error occurred");
            res.status(400).json({responseMessage: 'Some Error occurred with database'});
        }
        else{
            if(result.length > 0){

                for(item of result){

                    sectNo = arraySearch(item.SECTION, allSections);
                    if(sectNo != -1){
                        var items = {
                            itemname : item.ITEMNAME,
                            itemdescription : item.ITEMDESCRIPTION,
                            itemprice : item.ITEMPRICE
                        }
                        allSections[sectNo].items.push(items);
                    }
                    else{
                        allSections.push({
                            section : item.SECTION,
                            items : [items = {
                                itemname : item.ITEMNAME,
                                itemdescription : item.ITEMDESCRIPTION,
                                itemprice : item.ITEMPRICE
                            }]
                        })
                    }

                }
                console.log(allSections);
                res.status(200).json(allSections);
            } else {
                console.log("No Items Found");
                res.status(400).json({responseMessage: 'Menu not available'});
            }
        }
    })
})

router.route('/updateMenu').post(function(req, res){
    console.log("Inside Update Menu");
        var itemname = req.body.itemname;
        var itemdescription = req.body.itemdescription;
        var rest_name = req.body.restname;
        var itemprice = req.body.itemprice;
        var itemstatus = req.body.itemstatus;
        var newitemname = req.body.newitemname;
        var section = req.body.section;

    if(itemstatus == 'NEW'){
        addItemQuery = 'INSERT INTO ITEMS (ITEMNAME, ITEMDESCRIPTION, REST_NAME, ITEMPRICE, SECTION) VALUES (?, ?, ?, ?, ?)';
        pool.query(addItemQuery, [itemname, itemdescription, rest_name, itemprice, section], (err, result) => {
            if(err){
                console.log("Database error occurred");
                res.status(400).json({responseMessage: 'Some Error occurred with database new'});
            } else {
                console.log("Item added to the restaurant");
                res.status(200).json({responseMessage: 'Item added to the restaurant'});
            }
        })
    } else if (itemstatus == 'DELETE'){
        console.log("Delete Query");
        deleteItemQuery = 'DELETE FROM ITEMS WHERE REST_NAME = ? AND ITEMNAME = ?';
        pool.query(deleteItemQuery, [rest_name, itemname], (err, result1) => {
            if(err){
                console.log("Database error occurred");
                res.status(400).json({responseMessage: 'Some Error occurred with database delete'});
            } else {
                console.log("Item deleted from restaurant");
                res.status(200).json({responseMessage: 'Item deleted from restaurant'});
            }
        })
    } else if (itemstatus == 'DELETESECTION'){
        console.log("Delete Query");
        deleteItemQuery = 'DELETE FROM ITEMS WHERE REST_NAME = ? AND SECTION = ?';
        pool.query(deleteItemQuery, [rest_name, section], (err, result1) => {
            if(err){
                console.log("Database error occurred");
                res.status(400).json({responseMessage: 'Some Error occurred with database delete'});
            } else {
                console.log("Item deleted from restaurant");
                res.status(200).json({responseMessage: 'Section deleted from restaurant'});
            }
        })
    }
    else {
        updateItemQuery = 'UPDATE ITEMS SET ITEMNAME = ?, ITEMDESCRIPTION = ?, ITEMPRICE = ?, SECTION = ? WHERE (REST_NAME = ?) AND (ITEMNAME = ?)';
        pool.query(updateItemQuery, [newitemname, itemdescription, itemprice, section, rest_name, itemname], (err, result2) => {
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