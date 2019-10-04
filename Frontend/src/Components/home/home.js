import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../navbar";
import './home.css';

class Home extends Component{

    render() {

        return (
            <div>
                <NavBar />
                <header class="masthead">
                </header>
            </div>
        )
    }

}

export default Home;
