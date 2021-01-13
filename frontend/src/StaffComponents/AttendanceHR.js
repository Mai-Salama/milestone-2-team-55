import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import ViewStaffAttendanceHR from './ViewStaffAttendanceHR';
import AddSignInHR from './AddSignInHR';
import AddSignOutHR from './AddSignOutHR';
import ViewStaffWithMissingHR from './ViewStaffWithMissingHR';
import StaffLeavesHR from './StaffLeavesHR';
import ViewHRmissingDays from './ViewHRmissingDays';

export default class AttendanceHR extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToView: null,
            redirectToSignIn: null,
            redirectToSignOut:null,
            redirectToMissing:null,
            redirectToLeaves:null,
            redirectToDays:null
        };
        this.toAttendance = this.toAttendance.bind(this);
        this.toSignIn = this.toSignIn.bind(this);
        this.toSignOut = this.toSignOut.bind(this);
        this.toMissing = this.toMissing.bind(this);
        this.toLeaves = this.toLeaves.bind(this);
        this.toDays = this.toDays.bind(this);
    }

    toAttendance(event){
        this.setState({redirectToView: "/Staff/HRstaff/Attendance/ViewStaffAttendanceHR"});
        event.preventDefault();
    }
    toSignIn(event){
        this.setState({redirectToView: "/Staff/HRstaff/Attendance/AddSignInHR"});
        event.preventDefault();
    }
    toSignOut(event){
        this.setState({redirectToView: "/Staff/HRstaff/Attendance/AddSignOutHR"});
        event.preventDefault();
    }
    toMissing(event){
        this.setState({redirectToView: "/Staff/HRstaff/Attendance/ViewStaffWithMissingHoursOrDaysHR"});
        event.preventDefault();
    }
    toLeaves(event){
        this.setState({redirectToView: "/Staff/HRstaff/Attendance/StaffLeaves"});
        event.preventDefault();
    }
    toDays(event){
        this.setState({redirectToDays: "/Staff/HRstaff/Attendance/HRMissingDays"});
        event.preventDefault();
    }
    render() {
        if(this.state.redirectToView){
            return <Redirect to={this.state.redirectToView} Component={ViewStaffAttendanceHR}/>
        }
        if(this.state.redirectToSignIn){
            return <Redirect to={this.state.redirectToSignIn} Component={AddSignInHR}/>
        }
        if(this.state.redirectToSignOut){
            return <Redirect to={this.state.redirectToSignOut} Component={AddSignOutHR}/>
        }
        if(this.state.redirectToMissing){
            return <Redirect to={this.state.redirectToMissing} Component={ViewStaffWithMissingHR}/>
        }
        if(this.state.redirectToLeaves){
            return <Redirect to={this.state.redirectToLeaves} Component={StaffLeavesHR}/>
        }
        if(this.state.redirectToDays){
            return <Redirect to={this.state.redirectToDays} Component={ViewHRmissingDays}/>
        }
        return (
            <div>
            <Button onClick={this.toAttendance}>View Staff Attendance</Button> 
            <Button onClick={this.toSignIn}>Add a Missing Sign In</Button>
            <Button onClick={this.toSignOut}>Add a Missing Sign Out</Button>
            <Button onClick={this.toMissing}>View Staff With Missing Hours</Button>
            <Button onClick={this.toDays}>View Staff's Missing Days</Button>
            <Button onClick={this.toLeaves}>Leave Requests</Button>
        </div>
        )
    }
}
