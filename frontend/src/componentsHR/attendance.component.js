import React, {Component} from 'react';
import Navbar from "../NavbarHR.js";

export default class Attendance extends Component{
    render(){
        return(
            <div>
            <div className='container'>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="HomeHR">Home</a></li>
              <li className="breadcrumb-item active text-danger" aria-current="page">Attendance</li>
            </ol>
          </nav>
          </div>
          <div className='container'>
                <h3>Attendance</h3>
               <a href="/ViewAllAttendanceRecords"> <button className="btn btn-warning"> View all attendance records </button> </a>
               <a href="/Leaves"> <button className="btn btn-warning">  Leaves </button> </a>
               </div>
            </div>
        )
    }
}