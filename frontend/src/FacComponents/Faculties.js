import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Dropdown} from 'react-bootstrap';
import Navbar from '../NavbarHR.js';
import {Redirect} from 'react-router-dom';
import AddNewFaculty from '../FacComponents/AddNewFaculty';
import UpdateFaculty from '../FacComponents/UpdateFaculty';
import DeleteFaculty from '../FacComponents/DeleteFaculty';
import Departments from '../FacComponents/Departments';


export default class Faculties extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToAdd: null,
            redirectToUpdate: null,
            redirectToDelete: null,
            redirectToDepartments: null
        };
        this.addNew = this.addNew.bind(this);
        this.editUpdate = this.editUpdate.bind(this);
        this.editDelete = this.editDelete.bind(this);
        this.dep = this.dep.bind(this);
    }

    addNew(event){
        this.setState({redirectToAdd: "/Faculties/AddNewFaculty"});
        event.preventDefault();
    }

    editUpdate(event){
        this.setState({redirectToUpdate: "/Faculties/UpdateFaculty"});
        event.preventDefault();
    }

    editDelete(event){
        this.setState({redirectToDelete: "/Faculties/DeleteFaculty"});
        event.preventDefault();
    }

    dep(event){
        this.setState({redirectToDepartments: "/Faculties/Departments"});
        event.preventDefault();
    }

    render() {
        if(this.state.redirectToAdd){
            return <Redirect to={this.state.redirectToAdd} Component={AddNewFaculty}/>
        }
        if(this.state.redirectToUpdate){
            return <Redirect to={this.state.redirectToUpdate} Component={UpdateFaculty}/>
        }
        if(this.state.redirectToDelete){
            return <Redirect to={this.state.redirectToDelete} Component={DeleteFaculty}/>
        }
        if(this.state.redirectToDepartments){
            return <Redirect to={this.state.redirectToDepartments} Component={Departments}/>
        }
        return (
            <div>
            <Navbar />
            <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="Home">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Faculties</li>
          </ol>
        </nav>
        
                <div>
                <br></br>
                <Button id="add" onClick={this.addNew}>Add new faculty</Button> 
            </div>
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="drop">
                    Edit Faculty 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.editUpdate}>Update</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.editDelete}>Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div>
                <Button id="add" onClick={this.dep}>Departments</Button> 
            </div>
            </div>
            
           
        )
    }
}
