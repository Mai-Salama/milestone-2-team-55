import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Dropdown} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import AddNewHR from './AddNewHR';
import UpdateHR from './UpdateHR';
import DeleteHR from './DeleteHR';
import AttendanceHR from './AttendanceHR';
import Navbar from '../NavbarHR.js';

export default class HRstaff extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToAdd: null,
            redirectToUpdate: null,
            redirectToDelete: null,
            redirectToAttendance: null
        };
        this.addNew = this.addNew.bind(this);
        this.editUpdate = this.editUpdate.bind(this);
        this.editDelete = this.editDelete.bind(this);
        this.attendance = this.attendance.bind(this);
    }

    addNew(event){
        this.setState({redirectToAdd: "/Staff/HRstaff/AddNewHR"});
        event.preventDefault();
    }

    editUpdate(event){
        this.setState({redirectToUpdate: "/Staff/HRstaff/UpdateHR"});
        event.preventDefault();
    }

    editDelete(event){
        this.setState({redirectToDelete: "/Staff/HRstaff/DeleteHR"});
        event.preventDefault();
    }

    attendance(event){
        this.setState({redirectToAttendance: "/Staff/HRstaff/AttendanceHR"});
        event.preventDefault();
    }
    render() {
        if(this.state.redirectToAdd){
            return <Redirect to={this.state.redirectToAdd} Component={AddNewHR}/>
        }
        if(this.state.redirectToUpdate){
            return <Redirect to={this.state.redirectToUpdate} Component={UpdateHR}/>
        }
        if(this.state.redirectToDelete){
            return <Redirect to={this.state.redirectToDelete} Component={DeleteHR}/>
        }
        if(this.state.redirectToAttendance){
            return <Redirect to={this.state.redirectToAttendance} Component={AttendanceHR}/>
        }
        return (
            <div>
            <Navbar />
            <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/Home">Home</a></li>
            <li className="breadcrumb-item"><a href="/Staff">Staff</a></li>
            <li className="breadcrumb-item active" aria-current="page">HRstaff</li>
          </ol>
        </nav>

            <br></br>
                <div>
                
                <Button id="add" onClick={this.addNew}>Add new staff member</Button> 
            </div>
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="drop">
                    Edit  
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.editUpdate}>Update</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.editDelete}>Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div>
                <Button id="add" onClick={this.attendance}>Attendance</Button> 
            </div>
            </div>   
        )
    }
}
