import React, {Component} from 'react';
import Navbar from "../NavbarHR.js";

export default class SubmitALeaveRequest extends Component{
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
              <li className="breadcrumb-item active text-danger" aria-current="page">Submit A Leave Request</li>
            </ol>
          </nav>
         
          <a href="/SubmitAMaternityLeaveRequest"> <button className="btn btn-warning">  Submit a maternity leave request </button> </a>
          <br/>
          <br/>
          <a href="/SubmitACompensationLeaveRequest"> <button className="btn btn-warning">  Submit a compensation leave request </button> </a>
          <br/>
          <br/>
          <a href="/SubmitAnAccidentalLeaveRequest"> <button className="btn btn-warning">  Submit an accidental leave request </button> </a>
          <br/>
          <br/>
          <a href="/SubmitASickLeaveRequest"> <button className="btn btn-warning">  Submit a sick leave request </button> </a>
          <br/>
          <br/>
          <a href="/SubmitAnAnnualLeaveRequest"> <button className="btn btn-warning">  Submit an annual leave request </button> </a>

          </div>
            </div>
        )
    }
}
