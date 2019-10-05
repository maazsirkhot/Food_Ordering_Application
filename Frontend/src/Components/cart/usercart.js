import React, {Component} from 'react';
import cookie, { setRawCookie } from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import NavBarLogin from "../navbarlogin";
import "../dashboard/userdashboard.css";
import axios from 'axios'

class UserCart extends Component{
    render(){

        return(
            <div>
            <NavBarLogin />

            <div class="vertical-nav bg-danger" id="sidebar">
            <p class="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Dashboard</p>
            <ul class="nav flex-column bg-white mb-0">
                <li class="nav-item">
                    <a href="#" class="nav-link text-dark font-italic bg-light">
                    <i class="fa fa-th-large mr-3 text-primary fa-fw"></i>Profile
                    </a></li>
                <li class="nav-item">
                    <a href="#" class="nav-link text-dark font-italic bg-light">
                    <i class="fa fa-th-large mr-3 text-primary fa-fw"></i>Past Orders
                    </a></li> 
            </ul>
            </div>
            <div class="page-content p-5" id="content">
            <h3>Welcome to Cart</h3>
            <table class="table table-hover">
                
            </table>




            </div>
            </div>
        )
        
    }
}

export default UserCart;