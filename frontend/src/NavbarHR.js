// for academic member saaaaada

import React,{Component  } from 'react';
import {MenuItems} from "./MenuItems"
import {Button} from './CourseInstructor/Button';

import './Navbar.css'
import HomeHR from './home-hr.component'
import {Redirect} from 'react-router-dom'
import ViewProfileHR from './componentsHR/view-profile-hr.component';
class Navbar extends Component{

    constructor(){
        super();
        this.state={
            RedirectToHomeHR:null,
            RedirectToProfile:null
        }
        this.HomeHR=this.HomeHR.bind(this);
        this.ProfileHR=this.ProfileHR.bind(this);
    }

    HomeHR(event){
        this.setState({RedirectToHomeHR:"/HomeHR"})
        event.preventDefault()
    }
    ProfileHR(event){
        this.setState({RedirectToProfile:"/ViewProfileHR"})
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
        <Button onClick={this.HomeHR}> {MenuItems[0].title}<i class={MenuItems[0].icon}></i> </Button>
        <Button onclick={this.ProfileHR}>{MenuItems[1].title}<i class={MenuItems[1].icon}></i> </Button>
        <Button >{MenuItems[2].title}<i class={MenuItems[2].icon}></i> </Button>
        <Button >{MenuItems[3].title}<i class={MenuItems[3].icon}></i> </Button>
        <Button >{MenuItems[4].title}<i class={MenuItems[4].icon}></i> </Button>

        {/* <Button></Button> */}
             </nav>
             
        )
    }
}

export default Navbar