import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../navbar";
import './usersignup.css';
import { connect } from 'react-redux'; 


class UserSignUp extends Component{
    
    render() {
        let redirectVar = null;
        if(this.props.signupstatus){
            redirectVar = <Redirect to= "/userlogin"/>
        }

        return (
            <div>
                {redirectVar}
                <div class="container">
                <div class="row">
                <div class="col-lg-10 col-xl-9 mx-auto">
                <div class="card card-signin flex-row my-5">
                
                <div class="card-body">
                <h5 class="card-title text-center">User Registration</h5>
                <p>{this.state.message}</p>
                <form class="form-signin">
                    <div class="form-label-group">
                    <input type="text" id="fname" class="form-control" placeholder="First Name" required autoFocus/>
                    <label for="fname">First Name</label>
                    </div>
                    <div class="form-label-group">
                    <input type="text" id="lname" class="form-control" placeholder="Last Name" required autoFocus/>
                    <label for="lname">Last Name</label>
                    </div>
                    <div class="form-label-group">
                    <input type="email" id="email" class="form-control" placeholder="Email address" required/>
                    <label for="email">Email address</label>
                    </div>
                    <hr/>
                    <div class="form-label-group">
                    <input type="password" id="password" class="form-control" placeholder="Password" required/>
                    <label for="password">Password</label>
                    </div>              
                    <div class="form-label-group">
                    <input type="password" id="confirmpassword" class="form-control" placeholder="Password" required/>
                    <label for="confirmpassword">Confirm password</label>
                    </div>
                    <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">SignUp</button>
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

export default UserSignUp;
