import React, {Component} from 'react';
import cookie, { setRawCookie } from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import NavBarLogin from "../navbarlogin";
import "./userdashboard.css";
import axios from 'axios';

class OwnerDashboard extends Component{
    


    
    render(){

    

        return(
            <div>
            <NavBarLogin />
            
            <div class="vertical-nav bg-danger" id="sidebar">
            <p class="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Dashboard</p>
            <ul class="nav flex-column bg-white mb-0">
                <li class="nav-item">
                    <a href="/OwnerProfile" class="nav-link text-dark font-italic bg-light">
                    <i class="fa fa-th-large mr-3 text-primary fa-fw"></i>Profile
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link text-dark font-italic bg-light">
                    <i class="fa fa-th-large mr-3 text-primary fa-fw"></i>Restaurant Menu
                    </a></li> 
                    <li class="nav-item">
                    <a href="/MenuUpdate" class="nav-link text-dark font-italic bg-light">
                    <i class="fa fa-th-large mr-3 text-primary fa-fw"></i>Update Menu
                    </a></li>
            </ul>
            </div>
            <div class="page-content p-5" id="content">
                <form class="form-horizontal">
                <h3>Add Item</h3>
                <div class="form-group">
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="itemname" placeholder="Item Name" name="itemname"/>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="itemdescription" placeholder="Item Description" name="itemdescription"/>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="itemprice" placeholder="Price" name="itemprice"/>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="section" placeholder="Section" name="section"/>
                    </div>
                </div>

                </form>


            </div>

            </div>
        )
    }
}

export default OwnerDashboard;
