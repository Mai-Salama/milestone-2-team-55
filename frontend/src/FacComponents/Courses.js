import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Dropdown} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import Navbar from '../NavbarHR.js';
import AddNewCourse from '../FacComponents/AddNewCourse';
import UpdateCourse from '../FacComponents/UpdateCourse';
import DeleteCourse from '../FacComponents/DeleteCourse';


export default class Courses extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToAdd: null,
            redirectToUpdate: null,
            redirectToDelete: null
        };
        this.addNew = this.addNew.bind(this);
        this.editUpdate = this.editUpdate.bind(this);
        this.editDelete = this.editDelete.bind(this);
    }

    addNew(event){
        this.setState({redirectToAdd: "/Faculties/Departments/Courses/AddNewCourse"});
        event.preventDefault();
    }

    editUpdate(event){
        this.setState({redirectToUpdate: "/Faculties/Departments/Courses/UpdateCourse"});
        event.preventDefault();
    }

    editDelete(event){
        this.setState({redirectToDelete: "/Faculties/Departments/Courses/DeleteCourse"});
        event.preventDefault();
    }
    render() {
        if(this.state.redirectToAdd){
            return <Redirect to={this.state.redirectToAdd} Component={AddNewCourse}/>
        }
        if(this.state.redirectToUpdate){
            return <Redirect to={this.state.redirectToUpdate} Component={UpdateCourse}/>
        }
        if(this.state.redirectToDelete){
            return <Redirect to={this.state.redirectToDelete} Component={DeleteCourse}/>
        }
        return (
            <div>
            <Navbar />
            <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="Home">Home</a></li>
            <li className="breadcrumb-item"><a href="Home/Faculties">Faculties</a></li>
            <li className="breadcrumb-item"><a href="Home/Faculties/Departments">Departments</a></li>
            <li className="breadcrumb-item active" aria-current="page">Courses</li>
          </ol>
        </nav>
                <div>
                <Button id="add" onClick={this.addNew}>Add new Course</Button> 
            </div>
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="drop">
                    Edit Course 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.editUpdate}>Update</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.editDelete}>Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
        )
    }
}
