import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import ViewStaffAttendanceAM from './ViewStaffAttendanceAM';
import AddSignInAM from './AddSignInAM';
import AddSignOutAM from './AddSignOutAM';
import ViewStaffWithMissingAM from './ViewStaffWithMissingAM';
import ViewAmmissingDays from './ViewAmmissingDays';
import Navbar from '../NavbarHR.js';

export default class AttendanceAM extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToView: null,
            redirectToSignIn: null,
            redirectToSignOut:null,
            redirectToMissing:null,
            redirectToDays:null
        };
        this.toAttendance = this.toAttendance.bind(this);
        this.toSignIn = this.toSignIn.bind(this);
        this.toSignOut = this.toSignOut.bind(this);
        this.toMissing = this.toMissing.bind(this);
        this.toDays = this.toDays.bind(this);
    }

    toAttendance(event){
        this.setState({redirectToView: "/Staff/AcademicMembers/Attendance/ViewStaffAttendanceAM"});
        event.preventDefault();
    }
    toSignIn(event){
        this.setState({redirectToView: "/Staff/AcademicMembers/Attendance/AddSignInAM"});
        event.preventDefault();
    }
    toSignOut(event){
        this.setState({redirectToView: "/Staff/AcademicMembers/Attendance/AddSignOutAM"});
        event.preventDefault();
    }
    toMissing(event){
        this.setState({redirectToView: "/Staff/AcademicMembers/Attendance/ViewStaffWithMissingHoursOrDaysAM"});
        event.preventDefault();
    }
    toDays(event){
        this.setState({redirectToView: "/Staff/AcademicMembers/Attendance/AMMissingDays"});
        event.preventDefault();
    }

    render() {
        if(this.state.redirectToView){
            return <Redirect to={this.state.redirectToView} Component={ViewStaffAttendanceAM}/>
        }
        if(this.state.redirectToSignIn){
            return <Redirect to={this.state.redirectToSignIn} Component={AddSignInAM}/>
        }
        if(this.state.redirectToSignOut){
            return <Redirect to={this.state.redirectToSignOut} Component={AddSignOutAM}/>
        }
        if(this.state.redirectToMissing){
            return <Redirect to={this.state.redirectToMissing} Component={ViewStaffWithMissingAM}/>
        }
        if(this.state.redirectToDays){
            return <Redirect to={this.state.redirectToDays} Component={ViewAmmissingDays}/>
        }
        return (
            <div>
            <Navbar />
             <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/Home">Home</a></li>
            <li className="breadcrumb-item"><a href="/Staff">Staff</a></li>
            <li className="breadcrumb-item"><a href="/Staff/AcademicMembers">AcademicMembers</a></li>
            <li className="breadcrumb-item active" aria-current="page">Attendance</li>
          </ol>
        </nav>
            <h2>Academic Members Attendance</h2>
            <br></br>
            <Button id="add" onClick={this.toAttendance}>View Staff Attendance</Button> 
            <Button id="add" onClick={this.toSignIn}>Add a Missing Sign In</Button>
            <Button id="add" onClick={this.toSignOut}>Add a Missing Sign Out</Button>
            <Button id="add" onClick={this.toMissing}>View Staff With Missing Hours</Button>
            <Button id="add" onClick={this.toDays}>View Staff's Missing Days</Button>
        </div>
        )
    }
}
