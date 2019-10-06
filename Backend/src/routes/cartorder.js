var express = require('express');
var pool = require('../helpers/pool');
var router = express.Router();
var crypt = require('../helpers/passwordEncryption');

router.route('/Orders').post(function(req, res){
    //console.log(req.body);

    //Get userdata from data attribute of object in request. 
    var cart = req.body.data;
    //console.log(cart);
    var username, rest_name, itemname, quantity, itemprice, price, cartid, itemid;

    var d = new Date();
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yyyy = d.getFullYear();
    var minutes = d.getMinutes();
    var hr = d.getHours();
    var sec = d.getSeconds();
    
    var totalprice = 0;

    
            cart.forEach(function (item) {
                username = item.username;
                rest_name = item.rest_name;
                itemname = item.itemname;
                quantity = item.quantity;
                itemprice = item.itemprice;
                price = quantity * itemprice;
                totalprice += price;
                totalitems = 0;
                orderstatus = "NEW";
                cartid = username.slice(0, 5) + rest_name.slice(0, 5) + dd + mm + yyyy + hr + minutes + sec;
                //console.log(cartid);
        
                itemdetails = [cartid, username, rest_name, itemname, quantity, itemprice, price];
                //console.log(itemdetails);
                (function insertDb (cartid, username, rest_name, itemname, quantity, itemprice, price) {
                getItemIDQuery = "SELECT ITEMID FROM ITEMS WHERE ITEMNAME=? AND REST_NAME=?"
                pool.query(getItemIDQuery, [itemname, rest_name], (err, result) => {
                    if(err) {
                        console.log("Database error occurred one");
                        res.status(400).json({responseMessage: 'Some Error occurred with database'});
                    } else {
                        if(result.length > 0){
                            //console.log(result[0].itemid);
                            itemid = result[0].ITEMID;
                            addtoCart = [cartid, username, rest_name, itemid, quantity, itemprice, price, orderstatus, totalprice];
                            console.log(addtoCart);
                            addtoCartQuery = "INSERT INTO CART (CARTID, USERNAME, REST_NAME, ITEMID, QUANTITY, ITEMPRICE, PRICE, ORDERSTATUS, TOTALPRICE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                            pool.query(addtoCartQuery, addtoCart, (err, result1) => {
                                if(err) {
                                    console.log("Database error occurred one");
                                    res.status(400).json({cartid : "", totalprice : ""});                            
                                } else {
                                    totalitems++;
                                    console.log("Item added to cart in database");
                                    if(totalitems === cart.length){
                                        res.status(200).json({cartid : cartid, totalprice : totalprice});
                                    }                            
                                } 
                            })
                        }
                        else {
                            console.log("Item not available");
                            res.status(400).json({responseMessage: 'Item not available'});
                        }
                    }
                })
                })(cartid, username, rest_name, itemname, quantity, itemprice, price, orderstatus, totalprice);
            });
})

router.route('/getOwnerOrders').post(function(req, res){
    console.log("Inside getOwnerOrders");
    var rest_name = req.body.restname;

    arraySearch = (id, arr) => {
        for(i = 0; i < arr.length; i++){
            if(arr[i].cartid == id)
                return i;
        }
        return -1;
    }

    getOrderQuery = 'SELECT C.CARTID, C.USERNAME, U.ADDRESS, I.ITEMNAME, C.QUANTITY, C.ITEMPRICE, C.PRICE, C.ORDERSTATUS, C.TOTALPRICE FROM CART C JOIN ITEMS I ON I.ITEMID = C.ITEMID JOIN USERS U ON U.USERNAME = C.USERNAME WHERE C.REST_NAME = ?';
    newOrders = [];
    otherOrders = [];

    pool.query(getOrderQuery, [rest_name], (err, result) => {
        console.log(result);
        if(err) {
            console.log("Database error occurred one");
            res.status(400).json({responseMessage: 'Some Error occurred with database one'});                            
        }
        else {
            if(result.length > 0){
                for(item of result){
                    if(item.ORDERSTATUS != 'DELIVERED'){
                        order = arraySearch(item.CARTID, newOrders);
                        if(order != -1){
                            var itm = {
                                itemname : item.ITEMNAME,
                                quantity : item.QUANTITY,
                                itemprice : item.ITEMPRICE,
                                price : item.PRICE
                            }
                            newOrders[order].items.push(itm);
                        } else {
                            newOrders.push({
                                cartid : item.CARTID,
                                username : item.USERNAME,
                                address : item.ADDRESS,
                                orderstatus : item.ORDERSTATUS,
                                totalprice : item.TOTALPRICE,
                                items : [itm = {
                                    itemname : item.ITEMNAME,
                                    quantity : item.QUANTITY,
                                    itemprice : item.ITEMPRICE,
                                    price : item.PRICE
                                }]
                            })
                        }
                    } else {
                        order = arraySearch(item.CARTID, otherOrders);
                        if(order != -1){
                            var itm = {
                                itemname : item.ITEMNAME,
                                quantity : item.QUANTITY,
                                itemprice : item.ITEMPRICE,
                                price : item.PRICE
                            }
                            otherOrders[order].items.push(itm);
                        } else {
                            otherOrders.push({
                                cartid : item.CARTID,
                                username : item.USERNAME,
                                address : item.ADDRESS,
                                orderstatus : item.ORDERSTATUS,
                                totalprice : item.TOTALPRICE,
                                items : [itm = {
                                    itemname : item.ITEMNAME,
                                    quantity : item.QUANTITY,
                                    itemprice : item.ITEMPRICE,
                                    price : item.PRICE
                                }]
                            })
                        }
                    }
                }
                console.log(newOrders, otherOrders);
                allOrders = {
                    newOrders : newOrders,
                    otherOrders : otherOrders
                }
                res.status(200).json(allOrders);  
            
        }
    }      
    })
})

router.route('/getUserOrders').post(function(req, res){
    console.log("Inside getUserOrders");

    var username = req.body.username;
    console.log(username);
    arraySearch = (id, arr) => {
        for(i = 0; i < arr.length; i++){
            if(arr[i].cartid == id)
                return i;
        }
        return -1;
    }

    var getOrderQuery = "SELECT C.CARTID, C.REST_NAME, I.ITEMNAME, C.QUANTITY, C.ITEMPRICE, C.PRICE, C.ORDERSTATUS, C.TOTALPRICE FROM CART C JOIN ITEMS I ON I.ITEMID = C.ITEMID WHERE C.USERNAME = ?";
    newOrders = [];
    otherOrders = [];
    eachOrder = {
        cartid : "",
        rest_name : "",
        orderstatus : "",
        totalprice : "",
        items : []
    }
    pool.query(getOrderQuery, [username], (err, result) => {
        console.log(result);
        if(err) {
            console.log("Database error occurred one");
            res.status(400).json({responseMessage: 'Some Error occurred with database one'});                            
        } else {
            if(result.length > 0){
                for(item of result){
                    if(item.ORDERSTATUS == 'NEW'){
                        order = arraySearch(item.CARTID, newOrders);
                        if(order != -1){
                            var itm = {
                                itemname : item.ITEMNAME,
                                quantity : item.QUANTITY,
                                itemprice : item.ITEMPRICE,
                                price : item.PRICE
                            }
                            newOrders[order].items.push(itm);
                        } else {
                            newOrders.push({
                                cartid : item.CARTID,
                                rest_name : item.REST_NAME,
                                orderstatus : item.ORDERSTATUS,
                                totalprice : item.TOTALPRICE,
                                items : [itm = {
                                    itemname : item.ITEMNAME,
                                    quantity : item.QUANTITY,
                                    itemprice : item.ITEMPRICE,
                                    price : item.PRICE
                                }]
                            })
                        }
                    } else {
                        order = arraySearch(item.CARTID, otherOrders);
                        if(order != -1){
                            var itm = {
                                itemname : item.ITEMNAME,
                                quantity : item.QUANTITY,
                                itemprice : item.ITEMPRICE,
                                price : item.PRICE
                            }
                            otherOrders[order].items.push(itm);
                        } else {
                            otherOrders.push({
                                cartid : item.CARTID,
                                rest_name : item.REST_NAME,
                                orderstatus : item.ORDERSTATUS,
                                totalprice : item.TOTALPRICE,
                                items : [itm = {
                                    itemname : item.ITEMNAME,
                                    quantity : item.QUANTITY,
                                    itemprice : item.ITEMPRICE,
                                    price : item.PRICE
                                }]
                            })
                        }
                    }
                }
                //console.log(newOrders, otherOrders);
                allOrders = {
                    newOrders : newOrders,
                    otherOrders : otherOrders
                }
                res.status(200).json(allOrders);
            }
        }

    })
})

router.route('/updateStatus').post(function(req, res){
    console.log("Inside Order Status Update");

    var rest_name = req.body.restname;
    var username = req.body.username;
    var cartid = req.body.cartid;
    var orderstatus = req.body.orderstatus;

    var updateStatusQuery = 'UPDATE CART SET ORDERSTATUS = ? WHERE (CARTID = ?)';
    pool.query(updateStatusQuery, [orderstatus, cartid], (err, result) => {
        if(err) {
            console.log("Database error occurred");
            res.status(400).json({responseMessage: 'Some Error occurred with database'});                            
        } else {
            console.log("Order status updated");
            res.status(200).json({responseMessage: 'Order status updated'});
        }
    })
})




module.exports = router;