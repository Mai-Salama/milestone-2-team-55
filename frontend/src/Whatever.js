import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button} from 'react-bootstrap';


export default class Whatever extends Component {
    constructor(){
        super();
        this.state = {
            weather : "Not yet gotten"
        };
    }
    handleButton = () =>{
        //http request to the backend
        axios.get("/viewAllAttendanceRecords", {headers: {"x-auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImhyLTQiLCJlbWFpbCI6ImhyIiwicm9sZSI6IkhSIiwiaWF0IjoxNjA5MDc5OTcwfQ.WUl_2IaeJWJwb1_swydnglkEuLLFLyB55ax0YS9bmdc"}}).then(response =>{
            this.setState({
                weather : response.data
            });
        });

    };
    render() {
        return (
            <div>

            <Button onClick={this.handleButton}>click the damned button</Button>
                <h1>I'm testing with this : {this.state.weather}</h1>
            </div>
        )
    }
}
