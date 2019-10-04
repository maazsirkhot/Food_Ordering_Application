var express = require('express');
var pool = require('../helpers/pool');
var router = express.Router();
var crypt = require('../helpers/passwordEncryption');

router.route('/orders').post(function(req, res){
    //console.log(req.body);

    //Get userdata from data attribute of object in request. 
    var cart = req.body.data;
    console.log(cart);
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
                    getItemIDQuery = "SELECT itemid FROM items WHERE itemname=? and rest_name=?"
                pool.query(getItemIDQuery, [itemname, rest_name], (err, result) => {
                    if(err) {
                        console.log("Database error occurred one");
                        res.status(400).json({responseMessage: 'Some Error occurred with database'});
                    } else {
                        if(result.length > 0){
                            //console.log(result[0].itemid);
                            itemid = result[0].itemid;
                            addtoCart = [cartid, username, rest_name, itemid, quantity, itemprice, price, orderstatus, totalprice];
                            console.log(addtoCart);
                            addtoCartQuery = "INSERT INTO cart (cartid, username, rest_name, itemid, quantity, itemprice, price, orderstatus, totalprice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                            pool.query(addtoCartQuery, addtoCart, (err, result1) => {
                                if(err) {
                                    console.log("Database error occurred one");
                                    res.status(400).json({responseMessage: 'Some Error occurred with database one'});                            
                                } else {
                                    totalitems++;
                                    console.log("Item added to cart in database");
                                    if(totalitems === cart.length){
                                        res.status(400).json({responseMessage: 'Items added to cart'});
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

router.route('/getOwnerOrders').get(function(req, res){
    console.log("Inside getOwnerOrders");

    var owneremail = req.body.owneremail;
    var rest_name = req.body.restname;

    arraySearch = (id, arr) => {
        for(i = 0; i < arr.length; i++){
            if(arr[i].cartid == id)
                return i;
        }
        return -1;
    }

    getOrderQuery = 'select c.cartid, c.username, c.rest_name, i.itemname, c.quantity, c.itemprice, c.price, c.orderstatus, c.totalprice from cart c join items i on i.itemid = c.itemid where c.rest_name = ? order by cartid';
    allOrders = [];
    eachOrder = {
        cartid : "",
        username : "",
        rest_name : "",
        orderstatus : "",
        totalprice : "",
        items : []
    }
    pool.query(getOrderQuery, [rest_name], (err, result) => {
        //console.log(result);
        if(err) {
            console.log("Database error occurred one");
            res.status(400).json({responseMessage: 'Some Error occurred with database one'});                            
        }
        else {
            if(result.length > 0){
                for(item of result){
                    //console.log(item);
                    order = arraySearch(item.cartid, allOrders);
                    //console.log(order);
                    if(order != -1){
                        var itm = {
                            itemname : item.itemname,
                            quantity : item.quantity,
                            itemprice : item.itemprice,
                            price : item.price
                        }
                        //console.log(allOrders[order].items);
                        allOrders[order].items.push(itm);
                        
                    }
                    else{
                        allOrders.push({
                            cartid : item.cartid,
                            username : item.username,
                            rest_name : item.rest_name,
                            orderstatus : item.orderstatus,
                            totalprice : item.totalprice,
                            items : [itm = {
                                itemname : item.itemname,
                                quantity : item.quantity,
                                itemprice : item.itemprice,
                                price : item.price
                            }]
                        })
                    }
                    
                }
                console.log(allOrders[0].items, allOrders[1].items);
                res.status(200).json({responseMessage: 'All results fetched'});   
            
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

    var updateStatusQuery = 'UPDATE cart SET orderstatus = ? WHERE (cartid = ?)';
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