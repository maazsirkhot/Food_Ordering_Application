import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBarLogin from "../navbarlogin";
import './userprofile.css';


class UserProfile extends Component{


    render() {

        return (
            <div>
                <NavBarLogin />
                
                <div>
                <div class="container">
                <h2 >User Profile</h2>
                <form class="form-horizontal" action="/action_page.php">
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="email">First Name:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="fname" placeholder="First Name" name="fname"/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="email">Last Name:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="lname" placeholder="Last Name" name="lname"/>
                    </div>
                    </div>
                    
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="email">Address:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="address" placeholder="Address" name="address"/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="email">Password:</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="password" placeholder="Password" name="password"/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="email">Confirm Password:</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="confirmpassword" placeholder="Confirm Password" name="confirmpassword"/>
                    </div>
                    </div>
                    
                    <div class="form-group">        
                    <div class="col-sm-offset-2 col-sm-10">
                        <div class="checkbox col-xs-2">
                        <label><input type="checkbox" name="remember"/> Remember me</label>
                        </div>
                    </div>
                    </div>
                    <div class="form-group">
                        <label>Profile Picture</label>
                        <div class="input-group">
                            <span class="input-group-btn">
                                <span class="btn btn-default btn-file">Upload Image <input type="file" id="imgInp"/></span> 
                            </span>
                        </div>
                    </div>
                    <div class="form-group">        
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" class="btn btn-danger">Submit</button>
                        <button type="submit" class="btn btn-danger">Cancel</button>
                    </div>
                    </div>
                </form>
                </div>
                </div>
                
            </div>
        )
    }

}

export default UserProfile;
