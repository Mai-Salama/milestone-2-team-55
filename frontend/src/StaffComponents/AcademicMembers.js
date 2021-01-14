import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Dropdown} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import Navbar from '../NavbarHR.js';
import AddNewAM from './AddNewAM';
import UpdateAM from './UpdateAM';
import DeleteAM from './DeleteAM';
import AttendanceAM from './AttendanceAM';

export default class AcademicMembers extends Component {
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
        this.setState({redirectToAdd: "/Staff/AcademicMembers/AddNewAM"});
        event.preventDefault();
    }

    editUpdate(event){
        this.setState({redirectToUpdate: "/Staff/AcademicMembers/UpdateAM"});
        event.preventDefault();
    }

    editDelete(event){
        this.setState({redirectToDelete: "/Staff/AcademicMembers/DeleteAM"});
        event.preventDefault();
    }

    attendance(event){
        this.setState({redirectToAttendance: "/Staff/AcademicMembers/AttendanceAM"});
        event.preventDefault();
    }
    render() {
        if(this.state.redirectToAdd){
            return <Redirect to={this.state.redirectToAdd} Component={AddNewAM}/>
        }
        if(this.state.redirectToUpdate){
            return <Redirect to={this.state.redirectToUpdate} Component={UpdateAM}/>
        }
        if(this.state.redirectToDelete){
            return <Redirect to={this.state.redirectToDelete} Component={DeleteAM}/>
        }
        if(this.state.redirectToAttendance){
            return <Redirect to={this.state.redirectToAttendance} Component={AttendanceAM}/>
        }
        return (
            <div>
            <Navbar />
            <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/Home">Home</a></li>
            <li className="breadcrumb-item"><a href="/Staff">Staff</a></li>
            <li className="breadcrumb-item active" aria-current="page">AcademicMembers</li>
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
