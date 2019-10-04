import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBarLogin from "../navbarlogin";
import "./ownerprofile.css";

class OwnerProfile extends Component{

    render() {

        return (
            <div>
                <NavBarLogin />
                <div>
                <div class="container">
                <h2 >User Profile</h2>
                <form class="form-horizontal" action="/action_page.php">
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="fname">First Name:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="fname" placeholder="First Name" name="fname"/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="lname">Last Name:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="lname" placeholder="Last Name" name="lname"/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="ownermob">Contact:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="ownermob" placeholder="Contact" name="ownermob"/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="rest_name">Restaurant Name:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="rest_name" placeholder="Restaurant Name" name="rest_name"/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="rest_zip">Restaurant Zip:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="rest_zip" placeholder="Restaurant Zip" name="rest_zip"/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="cuisine">Cuisine:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="cuisine" placeholder="cuisine" name="cuisine"/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="password">Password:</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="password" placeholder="Password" name="password"/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="confirmpassword">Confirm Password:</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="confirmpassword" placeholder="Confirm Password" name="confirmpassword"/>
                    </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Profile Picture</label>
                        <div class="input-group">
                            <span class="input-group-btn">
                                <span class="btn btn-default btn-file">Upload Image<input type="file" id="imgInp"/></span> 
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

export default OwnerProfile;