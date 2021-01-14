// for academic member saaaaada

import React,{Component  } from 'react';
import {MenuItems} from "./MenuItems"
import {Button} from './CourseInstructor/Button';

import './Navbar.css'
import HomeHR from './home-hr.component'
import {Redirect} from 'react-router-dom'
import ViewProfileHR from './componentsHR/view-profile-hr.component';
import NotificationsHR from './NotificationsHR';
import Logout from './logout';

class Navbar extends Component{

    constructor(){
        super();
        this.state={
            RedirectToHomeHR:null,
            RedirectToProfile:null,
            RedirectToNotification:null,
            RedirectOnLogout:null
        }
        this.HomeHR=this.HomeHR.bind(this);
        this.ProfileHR=this.ProfileHR.bind(this);
        this.NotificationsHR=this.NotificationsHR.bind(this);
        this.Logout=this.Logout.bind(this);
    }

    HomeHR(event){
        console.log("home");
        this.setState({RedirectToHomeHR:"/HomeHR"})
        event.preventDefault()
    }
    ProfileHR(event){
        console.log("profile");
        this.setState({RedirectToProfile:"/ViewProfileHR"})
        event.preventDefault()
    }
    NotificationsHR(event){
        console.log("notti");
        this.setState({RedirectToNotification:"/NotificationsHR"});
        event.preventDefault();
    }

    Logout(event){
        console.log("Logged Out");
        this.setState({RedirectOnLogout:"/Logout"})
        event.preventDefault()
    }
    state={ clicked:false}
    handleClick =() =>{
        this.setState({clicked:!this.state.clicked})
    }

    render(){
        if(this.state.RedirectToHomeHR){
            return<Redirect to ={this.state.RedirectToHomeHR} Component={HomeHR}/>
        }
        if(this.state.RedirectToProfile){
            return<Redirect to ={this.state.RedirectToProfile} Component={ViewProfileHR}/>
        }
        if(this.state.RedirectToNotification){
            return<Redirect to ={this.state.RedirectToNotification} Component={NotificationsHR}/>
        }
        if(this.state.RedirectOnLogout){
            return<Redirect to ={this.state.RedirectOnLogout} Component={Logout}/>
        }

        return(
            <nav className="NavbarItems">
    <h1 className="navbar-logo">GUC<i class="fas fa-university"></i></h1>
    <div className="menu-icon" onClick={this.handleClick}>
            <i className={this.state.clicked ? 'fas fa-times': 'fas fa-bars'}></i>
    </div>

        <Button onClick={this.HomeHR}> {MenuItems[0].title}<i class={MenuItems[0].icon}></i> </Button>
        <Button onClick={this.ProfileHR}>{MenuItems[1].title}<i class={MenuItems[1].icon}></i> </Button>
        <Button onClick={this.NotificationsHR}>{MenuItems[2].title}<i class={MenuItems[2].icon}></i> </Button>
        <Button >{MenuItems[3].title}<i class={MenuItems[3].icon}></i> </Button>
        <Button onClick={this.Logout}>{MenuItems[4].title}<i class={MenuItems[4].icon}></i> </Button>

        {/* <Button></Button> */}
             </nav>
             
        )
    }
}

export default Navbar