import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import Faculties from './FacComponents/Faculties';
import Staff from './StaffComponents/Staff';

export default class HomeHR extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToFaculties: null,
            redirectToStaff: null
        };
        this.toFaculties = this.toFaculties.bind(this);
        this.toStaff = this.toStaff.bind(this);
    }

    toFaculties(event){
        this.setState({redirectToFaculties: "/Faculties"});
        console.log("set faculties");
        console.log(this.state.redirectToFaculties);
        event.preventDefault();
    }

    toStaff(event){
        this.setState({redirectToStaff: "/Staff"});
        event.preventDefault();
    }
    render() {
        if(this.state.redirectToFaculties){
            return <Redirect to={this.state.redirectToFaculties} Component={Faculties}/>
        }
        if(this.state.redirectToStaff){
            return <Redirect to={this.state.redirectToStaff} Component={Staff}/>
        }
        return (
            <div>
                <Button onClick={this.toFaculties}>Faculties</Button>
                <Button onClick={this.toStaff}>Staff</Button>
            </div>
        )
    }
}
