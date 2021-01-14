

import React,{Component  } from 'react';
import {MenuItems} from "./MenuItems"
import {Button} from './CourseInstructor/Button';
import './Navbar.css'
import Homepage from './AM/Homepage';
import {Redirect} from 'react-router-dom'
import StaffAM from './CourseInstructor/StaffAM';
import NotificationsAM from './NotificationsAM';
import Logout from './logout';
import axios from "axios";
import Modal from 'react-modal'

class Navbar extends Component{

    constructor(){
        super();
        this.state={
            RedirectToHomeAM:null,
            RedirectToProfile:null,
            statemodal:true
        }
        this.HomeAM=this.HomeAM.bind(this);
        this.ProfileAM=this.ProfileAM.bind(this);
        this.Notifications=this.Notifications.bind(this);
        this.Logout=this.Logout.bind(this);
    }

    HomeAM(event){
        this.setState({RedirectToHomeAM:"/HomepageAM"})
        event.preventDefault()
    }
   
    Notifications(event){
        this.setState({RedirectToNotification:"/NotificationsAM"})
        event.preventDefault()
    }


ProfileAM(){

    axios.get('/viewprofile',{headers:{
        'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTQiLCJlbWFpbCI6InJhbmEuYWhtZWRAZ3VjLmVkdS5lZyIsInJvbGUiOiJBTSIsImlhdCI6MTYwODkwMzIzOH0.JMVKdzKRV0DjbypXnWWSkaGN1ytn11B0CbdCOPU7JGA'
    }})
      .then (response =>{
        this.setState({
            name:response.data.name,
            office:response.data.office,
            email:response.data.email,
           dayoff:response.data.dayoff,
           salary:response.data.Salary

        })
        console.log("hiiiii")
       console.log(response.data)
      })
      this.setState({
        statemodal:true
    })
     
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

    handleClose(){
        this.setState({
            statemodal:false

        })
    }s


    render(){
        if(this.state.RedirectToHomeAM){
            return<Redirect to ={this.state.RedirectToHomeAM} Component={this.HomeAM}/>
        }
        
        if(this.state.RedirectToNotification){
            return<Redirect to ={this.state.RedirectToNotification} Component={NotificationsAM}/>
        }
        if(this.state.RedirectOnLogout){
            return<Redirect to ={this.state.RedirectOnLogout} Component={Logout}/>
        }
        return(
            <nav className="NavbarItems">
                 <Modal isOpen={this.state.statemodal} >
      

    

      <h3>name is {this.state.name}</h3>
      <h3>office is {this.state.office}</h3>
      <h3>email is {this.state.email}</h3>
      <h3>day-off is {this.state.dayoff}</h3>
      <h3>salary is {this.state.salary}</h3>

      <button onClick={this.handleClose.bind(this)} >
            close 
            </button>
      </Modal>
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
        <Button onClick={this.HomeAM}> {MenuItems[0].title}<i class={MenuItems[0].icon}></i> </Button>
        <Button onclick={this.ProfileAM}>{MenuItems[1].title}<i class={MenuItems[1].icon}></i> </Button>
        <Button onClick={this.Notifications}>{MenuItems[2].title}<i class={MenuItems[2].icon}></i> </Button>
        <Button >{MenuItems[3].title}<i class={MenuItems[3].icon}></i> </Button>
        <Button onClick={this.Logout}>{MenuItems[4].title}<i class={MenuItems[4].icon}></i> </Button>

        {/* <Button></Button> */}
             </nav>
             
        )
    }
}

export default Navbar