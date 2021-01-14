import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import HRstaff from './HRstaff';
import AcademicMembers from './AcademicMembers';
import Navbar from '../NavbarHR.js';


export default class Staff extends Component {
        constructor(props){
            super(props);
            this.state = {
                redirectToHR: null,
                redirectToAM: null
            };
            this.hrPage = this.hrPage.bind(this);
            this.amPage = this.amPage.bind(this);
        }
    
        hrPage(event){
            this.setState({redirectToHR: "/Staff/HRstaff"});
            event.preventDefault();
        }
    
        amPage(event){
            this.setState({redirectToAM: "/Staff/AcademicMembers"});
            event.preventDefault();
        }

    render() {
        if(this.state.redirectToHR){
            return <Redirect to={this.state.redirectToHR} Component={HRstaff}/>
        }
        if(this.state.redirectToAM){
            return <Redirect to={this.state.redirectToAM} Component={AcademicMembers}/>
        }
        return (
            <div>
            <Navbar />
            <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/Home">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Staff</li>
          </ol>
        </nav>
            <br></br>
            <label id="loginText">
            Choose a category
            </label>
            <br></br>
                <Button id="add" onClick={this.hrPage}>HR</Button> 
                <Button id="add" onClick={this.amPage}>Academic Members</Button> 
            </div>
        )
    }
}
