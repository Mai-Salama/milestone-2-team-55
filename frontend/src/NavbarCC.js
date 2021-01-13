

import React,{Component  } from 'react';
import {MenuItems} from "./MenuItems"
import {Button} from './CourseInstructor/Button';

import './Navbar.css'
import HomeCC from './CourseCoordinator/CoordinatorHomeCont';
import {Redirect} from 'react-router-dom'
import StaffAM from './CourseInstructor/StaffAM';
//import CourseSlotsC from './CourseCoordinator/CourseSlotsC';
//import HomeCC from './CourseCoordinator/CoordinatorHomeCont';
class Navbar extends Component{

    constructor(){
        super();
        this.state={
            RedirectToHomeCC:null,
            RedirectToProfile:null
        }
        this.HomeCC=this.HomeCC.bind(this);
        this.ProfileInstructor=this.ProfileInstructor.bind(this);
    }

    HomeCC(event){
        this.setState({RedirectToHomeCC:"/HomeC"})
        event.preventDefault()
    }
    ProfileInstructor(event){
        this.setState({RedirectToProfile:"/StaffAM"})
        event.preventDefault()
    }
    state={ clicked:false}
    handleClick =() =>{
        this.setState({clicked:!this.state.clicked})
    }

    render(){
        if(this.state.RedirectToHomeCC){
            return<Redirect to ={this.state.RedirectToHomeCC} Component={HomeCC}/>
        }
        if(this.state.RedirectToProfile){
            return<Redirect to ={this.state.RedirectToProfile} Component={StaffAM}/>
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
        <Button onClick={this.HomeCC}> {MenuItems[0].title}<i class={MenuItems[0].icon}></i> </Button>
        <Button onclick={this.ProfileInstructor}>{MenuItems[1].title}<i class={MenuItems[1].icon}></i> </Button>
        <Button >{MenuItems[2].title}<i class={MenuItems[2].icon}></i> </Button>
        <Button >{MenuItems[3].title}<i class={MenuItems[3].icon}></i> </Button>
        <Button >{MenuItems[4].title}<i class={MenuItems[4].icon}></i> </Button>

        {/* <Button></Button> */}
             </nav>
             
        )
    }
}

export default Navbar