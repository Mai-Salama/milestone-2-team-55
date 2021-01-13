import React, { Component } from 'react';
import axios from "axios";
import {Button} from 'react-bootstrap';

export default class StaffMaternity extends Component {
    constructor(props){
        super(props);
        this.state = {
            requests: [],
            reqid:''};
        this.handleChange = this.handleChange.bind(this);
        this.acceptreq = this.acceptreq.bind(this);
        this.rejectreq = this.rejectreq.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]:value});
    }
    acceptreq(event){
        const inputData = {
            reqID: this.state.reqid
        }
        axios.post('/AcceptMaternityLeaveHR', inputData, {headers: {
            'x-auth-token': localStorage.getItem('savedToken')
        }}).then(response =>{
            console.log(response.data);
            //maybe a pop up message with response.data
        }).catch(err =>{
            console.log(err);
        });
        event.preventDefault();
    };
    rejectreq(event){
        const inputData = {
            reqID: this.state.reqid
        }
        axios.post('/RejectMaternityLeaveHR', inputData, {headers: {
            'x-auth-token': localStorage.getItem('savedToken')
        }}).then(response =>{
            console.log(response.data);
            //maybe a pop up message with response.data
        }).catch(err =>{
            console.log(err);
        });
        event.preventDefault();
    };

   componentDidMount= ()=>{
       axios.get('/viewStaffRequestsHRmaternity', {headers: {
        'x-auth-token': localStorage.getItem('savedToken')
    }}).then(response =>{
        this.setState({requests: response.data});
    }).catch(err =>{
        console.log(err);
    })
   }
    render() {
        return (
            <div>
            <div>
                <table>
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Staff ID</th>
                        <th>Start Date</th>
                        <th>Month</th>
                        <th>End Date</th>
                        <th>Month</th>
                        <th>Documents</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.requests.map((item =>
                        <tr>
                        <td>{item.req_id}</td>
                        <td>{item.id}</td>
                        <td>{item.dateFrom}</td>
                        <td>{item.monthFrom}</td>
                        <td>{item.dateTo}</td>
                        <td>{item.monthTo}</td>
                        <td>{item.document}</td>
                        <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
                </table>  
            </div>
            <div>
                Request ID:
                <input name="reqid" type="text" reqid={this.state.reqid} onChange={this.handleChange}/>
                <Button onClick={this.acceptreq}>Accept</Button> 
                <Button onClick={this.rejectreq}>Reject</Button>               
            </div>
            </div>
        )
    }
}
