import React, {Component} from 'react';
import Navbar from "../NavbarHR.js";

export default class Leaves extends Component{
    render(){
        return(
            <div>
              <Navbar/>
            <div className='container'>
                <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="HomeHR">Home</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="Attendance">Attendance</a></li>
              <li className="breadcrumb-item active text-danger" aria-current="page">Leaves</li>
            </ol>
          </nav>
          <a href="/SubmitALeaveRequest"> <button className="btn btn-warning">  Submit a leave request </button> </a>
          <a href="/ViewLeaveRequests"> <button className="btn btn-warning">  View your leave requests </button> </a>
          </div>

            </div>
        )
    }
}
