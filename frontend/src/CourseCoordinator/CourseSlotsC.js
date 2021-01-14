import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Dropdown} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import AddNewCourseSlot from './AddNewCourseSlot';
import UpdateCourseSlot from './UpdateCourseSlot';
import DeleteCourseSlot from './DeleteCourseSlot';
import Navbar from '../NavbarCC';
export default class CourseSlotsC extends Component {
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
        this.setState({redirectToAdd: "/HomeC/CourseSlotsC/AddNewCourseSlot"});
        event.preventDefault();
    }

    editUpdate(event){
        this.setState({redirectToUpdate: "/HomeC/CourseSlotsC/UpdateCourseSlot"});
        event.preventDefault();
    }

    editDelete(event){
        this.setState({redirectToDelete: "/HomeC/CourseSlotsC/DeleteCourseSlot"});
        event.preventDefault();
    }
    render() {
        if(this.state.redirectToAdd){
            return <Redirect to={this.state.redirectToAdd} Component={AddNewCourseSlot}/>
        }
        if(this.state.redirectToUpdate){
            return <Redirect to={this.state.redirectToUpdate} Component={UpdateCourseSlot}/>
        }
        if(this.state.redirectToDelete){
            return <Redirect to={this.state.redirectToDelete} Component={DeleteCourseSlot}/>
        }
        return (
            <div>
            <Navbar />
            <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/HomeC">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">CourseSlotsC</li>
          </ol>
        </nav>
            <div>
                <Button id="add" onClick={this.addNew}>Add new Course Slot</Button> 
            </div>
            <div>
            <Dropdown>
                <Dropdown.Toggle id="drop">
                    Edit Course Slots
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.editUpdate}>Update</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.editDelete}>Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
            </div>
        )
    }
}
