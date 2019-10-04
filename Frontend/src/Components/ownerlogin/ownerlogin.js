import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../navbar";
import './ownerlogin.css';
import { connect } from 'react-redux'; 


class OwnerLogin extends Component{


    render() {
        let redirectVar = null;
        if(this.props.signinownerstatus){
            redirectVar = <Redirect to= "/OwnerProfile"/>
        }
        return (
            <div>
            {redirectVar}
                <div class="container">
                <div class="row">
                <div class="col-lg-10 col-xl-9 mx-auto">
                <div class="card card-signin flex-row my-5">
                
                <div class="card-body">
                <h5 class="card-title text-center">Owner Login</h5>
                <form class="form-signin">
                    
                    
                    <div class="form-label-group">
                    <input type="email" id="owneremail" class="form-control" placeholder="Email address" required/>
                    <label for="owneremail">Email address</label>
                    </div>
                    <hr/>
                    <div class="form-label-group">
                    <input type="password" id="password"class="form-control" placeholder="Password" required/>
                    <label for="password">Password</label>
                    </div>              
                    
                    <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Login</button>

                </form>
                </div>
                </div> 
                </div>
                </div> 
                </div>
            </div>
        )
    }

}

export default OwnerLogin;
