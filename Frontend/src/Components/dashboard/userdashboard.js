import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import NavBarLogin from "../navbarlogin";
import "./userdashboard.css";
import axios from 'axios'

class UserDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            search : "",
            searchResults : [],
            itemname : "",
            searchCheck : "false"
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.itemname == "") {
            alert("Search Field cannot be empty");
        } else {
            //console.log(this.state.itemname);
            const data = {
                itemname : this.state.itemname
            }
            console.log(data);
            axios.post('http://localhost:3001/UserDashboard', data)
            .then(response => {
                console.log("Response Status: " + response.status);
                if(response.status === 200){
                    this.setState({
                        searchResults : response.data,
                        searchCheck : true
                    })
                    console.log(this.state.searchResults);
                } else {
                    this.setState({
                        searchCheck : false
                    })
                    console.log("No Items found");
                }
            })
        }
    }


    
    render(){
        var searchDetails = this.state.searchResults.map(result => {
                return(
                    <tr>
                        <td>{result.rest_name}</td>
                        <td>{result.cuisine}</td>
                        <td value={result.rest_name}><button class="btn btn-danger">Go to Restaurant</button></td>
                    </tr>
                );
        });

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
            <div class="input-group mb-3">
                <input type="text" onChange = {this.changeHandler} class="form-control" name="itemname" placeholder="Search"/>
                <div class="input-group-append">
                <button class="btn btn-danger" type="submit" onClick = {this.onSubmit}>Search</button>  
                </div>
            </div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Restaurant Name</th>
                            <th>Cuisine</th>
                            <th></th>
                        </tr>
                    </thead>
                        <tbody>
                            {searchDetails}
                        </tbody>
                </table>
            </div>
            </div>
        )
    }
}

export default UserDashboard;