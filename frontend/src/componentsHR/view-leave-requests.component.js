import React, {Component} from 'react';
import axios from 'axios';
import Navbar from "../NavbarHR.js";

export default class ViewLeaveRequests extends Component{
    constructor(){
        super();
        
        this.state={
            
        }
    }

 
    render(){
        return(
            <div>

<Navbar/>
            <div className='container'>
                <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="HomeHR">Home</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="Attendance">Attendance</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="Leaves">Leaves</a></li>
              <li className="breadcrumb-item active text-danger" aria-current="page">View Leave Requests</li>
            </ol>
          </nav>
           <a href="/ViewMaternityStatus"> <button className="btn btn-warning">  View maternity leave requests </button> </a>
           <br/>
          <br/>
          <a href="/ViewCompensationStatus"> <button className="btn btn-warning">  View compensation leave requests </button> </a>
          <br/>
          <br/>
          <a href="/ViewAccidentalStatus"> <button className="btn btn-warning">  View accidental leave requests </button> </a>
          <br/>
          <br/>
          <a href="/ViewSickStatus"> <button className="btn btn-warning">  View sick leave requests </button> </a>
          <br/>
          <br/>
          <a href="/ViewAnnualStatus"> <button className="btn btn-warning">  View annual leave requests </button> </a>
            </div>
            </div>
        )
    }
}
