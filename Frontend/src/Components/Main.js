import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './home/home';
import UserSignUp from "./usersignup/usersignup";
import OwnerSignUp from './ownersignup/ownersignup';
import UserLogin from './userlogin/userlogin';
import OwnerLogin from './ownerlogin/ownerlogin';
import UserProfile from './userprofile/userprofile';
import OwnerProfile from './ownerprofile/ownerprofile';
import UserDashboard from './dashboard/userdashboard';
import cookie from 'react-cookies';

class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path='/' component={Home} />
                
                <Route path="/UserSignUp" component={UserSignUp}/>
                <Route path="/OwnerSignUp" component={OwnerSignUp}/>
                <Route path="/UserLogin" component={UserLogin}/>
                <Route path="/OwnerLogin" component={OwnerLogin}/>
                <Route path="/UserProfile" component={UserProfile}/>
                <Route path="/OwnerProfile" component={OwnerProfile}/>
                <Route path="/UserDashboard" component={UserDashboard}/>
                
            </div>
        )
    }
}


//Export The Main Component
export default Main;