import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, DropdownButton, Dropdown} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import Navbar from '../NavbarHR.js';
import AddNewDepartment from './AddNewDepartment';
import UpdateDepartment from './UpdateDepartment';
import DeleteDepartment from './DeleteDepartment';
import Courses from './Courses';

export default class Departments extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToAdd: null,
            redirectToUpdate: null,
            redirectToDelete: null,
            redirectToCourses: null
        };
        this.addNew = this.addNew.bind(this);
        this.editUpdate = this.editUpdate.bind(this);
        this.editDelete = this.editDelete.bind(this);
        this.courses = this.courses.bind(this);
    }

    addNew(event){
        this.setState({redirectToAdd: "/Faculties/Departments/AddNewDepartment"});
        event.preventDefault();
    }

    editUpdate(event){
        this.setState({redirectToUpdate: "/Faculties/Departments/UpdateDepartment"});
        event.preventDefault();
    }

    editDelete(event){
        this.setState({redirectToDelete: "/Faculties/Departments/DeleteDepartment"});
        event.preventDefault();
    }

    courses(event){
        this.setState({redirectToCourses:"/Faculties/Departments/Courses"});
    }
    render() {
        if(this.state.redirectToAdd){
            return <Redirect to={this.state.redirectToAdd} Component={AddNewDepartment}/>
        }
        if(this.state.redirectToUpdate){
            return <Redirect to={this.state.redirectToUpdate} Component={UpdateDepartment}/>
        }
        if(this.state.redirectToDelete){
            return <Redirect to={this.state.redirectToDelete} Component={DeleteDepartment}/>
        }
        if(this.state.redirectToCourses){
            return <Redirect to={this.state.redirectToCourses} Component={Courses}/>
        }
        return (
            <div>
            <Navbar />
            <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="Home">Home</a></li>
            <li className="breadcrumb-item"><a href="Home/Faculties">Faculties</a></li>
            <li className="breadcrumb-item active" aria-current="page">Departments</li>
          </ol>
        </nav>
                <div>
                <br></br>
                <Button id="add" onClick={this.addNew}>Add new Department</Button> 
            </div>
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="drop">
                    Edit Department 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.editUpdate}>Update</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.editDelete}>Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div>
                <Button id="add" onClick={this.courses}>Courses</Button> 
            </div>
            </div>
        )
    }
}
