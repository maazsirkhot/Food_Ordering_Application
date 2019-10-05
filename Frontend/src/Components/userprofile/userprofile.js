import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Link, Redirect} from 'react-router-dom';
import NavBarLogin from "../navbarlogin";
import './userprofile.css';
import axios from 'axios';


class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            contact : "",
            address : "",
            password : "",
            confirmpassword : "",
            username : "",
            updateStatus : ""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    componentWillMount(){
        if(cookie.load('cookieemail')){
            var username = cookie.load('cookieemail');
            this.setState({
                username : username
            })
            const data = {
                username : username
            }
            axios.post('http://localhost:3001/GetUserProfile', data)
            .then(response => {
                console.log("Response Status: " + response.status);
                if(response.status === 200){
                    //console.log(response.data)
                    this.setState({
                        name : response.data.name,
                        address : response.data.address,
                        contact : response.data.contact,
                        password : response.data.password,
                        confirmpassword : response.data.password
                    })
                    //console.log(this.state);

                } else {
                    console.log("Error Response");
                }
            })
        }
    }
    onSubmit(e){
        e.preventDefault();

        if(this.state.password != this.state.confirmpassword){
            alert("Passwords do no match! Please try again");
        } else {
            console.log("Updating Profile");

            const data = {
                name : this.state.name,
                contact : this.state.contact,
                address : this.state.address,
                password : this.state.password,
                email : this.state.username
            }

            axios.post('http://localhost:3001/UserProfile', data)
            .then(response => {
                console.log("Response Status: " + response.status);
                if(response.status === 200){
                    console.log(response.data)
                    this.setState({
                        updateStatus : true
                    })
                    alert("Profile Updated Successfully");

                } else {
                    console.log("Error Response");
                }
            })

        }
    }

    render() {

        let redirectVar = null;
        if(this.state.restname != ""){
            localStorage.setItem('restname', this.state.restname);
            redirectVar = <Redirect to = {{pathname: '/ViewRestaurant', state: { restname: this.state.restname }}}/>
        }
        return (
            <div>
                <NavBarLogin />
                
                <div>
                <div class="container">
                <h2 >User Profile</h2>
                <form class="form-horizontal">
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="name">Username:</label>
                    <div class="col-sm-10">
                        <input type="text" onChange = {this.changeHandler} value={this.state.username} class="form-control" id="username"  placeholder="Name" name="name" disabled />
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="name">Name:</label>
                    <div class="col-sm-10">
                        <input type="text" onChange = {this.changeHandler} value={this.state.name} class="form-control" id="name"  placeholder="Name" name="name" required />
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="contact">Contact:</label>
                    <div class="col-sm-10">
                        <input type="text" onChange = {this.changeHandler} value={this.state.contact} class="form-control" id="contact" placeholder="Contact" name="contact" required/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="address">Address:</label>
                    <div class="col-sm-10">
                        <input type="text" onChange = {this.changeHandler} value={this.state.address} class="form-control" id="address" placeholder="Address" name="address" required/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="password">Password:</label>
                    <div class="col-sm-10">
                        <input type="password" onChange = {this.changeHandler} value={this.state.password} class="form-control" id="password" placeholder="Password" name="password" required/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="confirmpassword">Confirm Password:</label>
                    <div class="col-sm-10">
                        <input type="password" onChange = {this.changeHandler} value={this.state.confirmpassword} class="form-control" id="confirmpassword" placeholder="Confirm Password" name="confirmpassword" required/>
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
                        <button type="submit" class="btn btn-danger" onClick={this.onSubmit}>Submit</button>
                        <Link to="/UserDashboard"><button type="button" class="btn btn-danger">Cancel</button></Link>
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
