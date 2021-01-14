

import React,{Component  } from 'react';
import {MenuItems} from "./MenuItems"
import {Button} from './CourseInstructor/Button';

import './Navbar.css'
import HomeC from './CourseCoordinator/CoordinatorHomeCont'
import {Redirect} from 'react-router-dom'
import StaffAM from './CourseInstructor/StaffAM';
import NotificationsAM from './NotificationsAM';
import Logout from './logout';
//import CourseSlotsC from './CourseCoordinator/CourseSlotsC';

class Navbar extends Component{

    constructor(){
        super();
        this.state={
            RedirectToHomeC:null,
            RedirectToProfile:null,
            RedirectToNotification:null,
            RedirectOnLogout:null
        }
        this.HomeC=this.HomeC.bind(this);
        this.ProfileInstructor=this.ProfileInstructor.bind(this);
        this.Notifications=this.Notifications.bind(this);
        this.Logout=this.Logout.bind(this);
    }

    HomeC(event){
        this.setState({RedirectToHomeC:"/HomeC"})
        event.preventDefault()
    }
    ProfileInstructor(event){
        this.setState({RedirectToProfile:"/StaffAM"})
        event.preventDefault()
    }
    Notifications(event){
        this.setState({RedirectToNotification:"/NotificationsAM"})
        event.preventDefault()
    }
    state={ clicked:false}
    handleClick =() =>{
        this.setState({clicked:!this.state.clicked})
    }
    Logout(event){
        console.log("Logged Out");
        this.setState({RedirectOnLogout:"/Logout"})
        event.preventDefault()
    }

    render(){
        if(this.state.RedirectToHomeC){
            return<Redirect to ={this.state.RedirectToHomeC} Component={HomeC}/>
        }
        if(this.state.RedirectToProfile){
            return<Redirect to ={this.state.RedirectToProfile} Component={StaffAM}/>
        }
        if(this.state.RedirectToNotification){
            return<Redirect to ={this.state.RedirectToNotification} Component={NotificationsAM}/>
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

        {/* <ul className={this.state.clicked? 'nav-menu active': 'nav-menu'}>
        {MenuItems.map((item,index)=>{
    return (
    <li key={index}>
        <a className={item.cName} href={item.url} onClick={this.HomeInstructor}>
        {item.title}
        <i class={item.icon}></i>
        
        </a>
    </li>
)
        })}
        
        </ul> */}

        {/* //<a href="www.mypage.com" onclick="window.history.go(-1); return false;"> Go to previous </a> */}
        <Button onClick={this.HomeC}> {MenuItems[0].title}<i class={MenuItems[0].icon}></i> </Button>
        <Button onclick={this.ProfileInstructor}>{MenuItems[1].title}<i class={MenuItems[1].icon}></i> </Button>
        <Button onClick={this.Notifications}>{MenuItems[2].title}<i class={MenuItems[2].icon}></i> </Button>        
        <Button >{MenuItems[3].title}<i class={MenuItems[3].icon}></i> </Button>
        <Button onClick={this.Logout}>{MenuItems[4].title}<i class={MenuItems[4].icon}></i> </Button>

        {/* <Button></Button> */}
             </nav>
             
        )
    }
}

export default Navbar