import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


export default class ViewAttendance extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async handleSubmit(event){
        axios.get('/viewAllAttendanceRecords', {headers: {
            'x-auth-token': localStorage.getItem('savedToken')
        }}).then(response =>{
            console.log(response.data);
           // console.log(response.headers);
        }).catch(err =>{
            console.log(err);
        });
        event.preventDefault();
    };


    
    render() {
        console.log("in Attendance render");
        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                <input type="submit" value="Submit" />
            </form>
            </div>
        )
    }
}
