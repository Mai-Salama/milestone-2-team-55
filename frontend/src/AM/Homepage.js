import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Signin from './Signin'
import Viewprofile from './Viewprofile';
import AttendanceAMM from './AttendanceAMM';
import Requests from './Requests';
import Replacement from './Replacement';
import ViewReplacement from './ViewReplacement';
import ViewSchedule from './ViewSchedule';
import Navbar from '../NavbarAM'

 import Modal from 'react-modal';
export default class Homepage extends Component {
    constructor(props){
        super(props)
   this.state={
            redirectToViewprofile:null,
            redirectToSignin:null,
            redirectToAttendance:null,
            redirectToRequests:null,
            redirectToViewprofile:null,
            redirectToViewreplacement:null,
            redirectToViewSchedule:null,

        };
        this.viewprofile=this.viewprofile.bind(this);
        this.signin=this.signin.bind(this);
        this.attendance=this.attendance.bind(this);
        this.requests=this.requests.bind(this);
        this.viewreplacement=this.viewreplacement.bind(this);
        this.viewschedule=this.viewschedule.bind(this)


}
viewprofile=()=>{
axios.get('/viewprofile',{headers:{
    'x-auth-token':localStorage.getItem('savedToken')
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





    viewprofile(event){
        this.setState({redirectToViewprofile:"/Homepage/Viewprofile"});
        event.preventDefault();
    }
    signin(event){
        this.setState({redirectToSignin:"/Homepage/Signin"});
        event.preventDefault();
    }
    attendance(event){
        this.setState({redirectToAttendance:"/Homepage/AttendanceAMM"});
        event.preventDefault();
    }

    requests(event){
        this.setState({redirectToRequests:"/Homepage/Requests"});
        event.preventDefault();
    }
    
    viewreplacement(event){
        this.setState({redirectToViewreplacement:"/Homepage/ViewReplacement"});
        event.preventDefault();
    }

    viewschedule(event){
        this.setState({redirectToViewSchedule:"/Homepage/ViewSchedule"});
        event.preventDefault();
    }
    
    

render(){
    if(this.state.redirectToViewprofile){
        return<Redirect to={this.state.redirectToViewprofile} Component={Viewprofile}/>
    }
    if(this.state.redirectToSignin){
        return<Redirect to={this.state.redirectToSignin} Component={Signin}/>
    }
    if(this.state.redirectToAttendance){
        return<Redirect to={this.state.redirectToAttendance} Component={AttendanceAMM}/>
    }
    if(this.state.redirectToRequests){
        return<Redirect to={this.state.redirectToRequests} Component={Requests}/>
    }

    if(this.state.redirectToViewreplacement){
        return<Redirect to={this.state.redirectToViewreplacement} Component={ViewReplacement}/>
    }

    if(this.state.redirectToViewSchedule){
        return<Redirect to={this.state.redirectToViewSchedule} Component={ViewSchedule}/>
    }
      
        return(

            
           
          <div class="text-left" >
<Navbar/>
            <h3>Welcome to your home page!</h3>


            <Modal isOpen={this.state.statemodal} >
      

    

      <h3>name is {this.state.name}</h3>
      <h3>office is {this.state.office}</h3>
      <h3>email is {this.state.email}</h3>
      <h3>day-off is {this.state.dayoff}</h3>
      <h3>salary is {this.state.salary}</h3>
      </Modal>
            <button onClick={this.viewprofile}  class="homebutton" type="button" id="loginSubmit">View Profile</button>
            <button onClick={this.signin} class="homebutton" type="button"id="loginSubmit">Sign In Page</button>
            <button  type="button" class="homebutton" id="loginSubmit">View Schedule</button>
            <button onClick={this.requests} class="homebutton" type="button" id="loginSubmit">Requests</button>
            <button onClick={this.attendance} class="homebutton" type="button" id="loginSubmit">View Attendance</button>
            <button onClick={this.viewreplacement} class="homebutton" type="button" id="loginSubmit">View replacement</button>
            <button onClick={this.viewschedule} class="homebutton" type="button" id="loginSubmit">View Your schedule</button>

          </div>
        
        )
    }

}




