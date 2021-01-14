import React, { Component } from 'react';
import axios from "axios";
import {Button} from 'react-bootstrap';
import Navbar from '../NavbarCC';
export default class SlotLinkingC extends Component {
    constructor(props){
        super(props);
        this.state = {
            requests: [],
            id:'',
            day:'',
            faculty:'',
            department:''};
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
            AMid: this.state.id,
            requestedday: this.state.day,
            facultyname: this.state.faculty,
            departmentid: this.state.department
        }
        axios.post('/acceptslotlinking', inputData, {headers: {
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
            AMid: this.state.id,
            requestedday: this.state.day
        }
        axios.post('/rejectslotlinking', inputData, {headers: {
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
       axios.get('/viewslotlinkingrequests', {headers: {
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
            <Navbar/>
              <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/HomeC">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">SlotLinking</li>
            </ol>
          </nav>
            <div>
                <table id="requeststable">
                <thead>
                    <tr>
                        <th>Requester ID</th>
                        <th>Requested Day</th>
                        <th>Slot Number</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.requests.map((item =>
                        <tr>
                        <td>{item.id}</td>
                        <td>{item.requestedDay}</td>
                        <td>{item.slotNumber}</td>
                        </tr>
                    ))}
                </tbody>
                </table>  
            </div>
            <div>
            <div class="row">
                <label>
                    <input name="faculty" placeholder="Faculty Name..." data-inline="true" type="text" faculty={this.state.faculty} onChange={this.handleChange} required/>
                </label>
                <label>
                    <input name="department" placeholder="Department ID..." data-inline="true" type="text" department={this.state.department} onChange={this.handleChange}/>
                </label> 
            </div>
            <br></br>
            <div class="row">
                <label>
                    <input name="id" placeholder="Requester ID..." type="text" id={this.state.id} onChange={this.handleChange}/>
                </label>
                <label>
                <input name="day" placeholder="Requested Day..." type="text" day={this.state.day} onChange={this.handleChange}/>
                </label>
            </div>
            <div class="row">
            <span>
                <Button onClick={this.acceptreq}>Accept</Button>{' '}
                <Button onClick={this.rejectreq}>Reject</Button>{' '}
            </span>
            </div>              
            </div>
            </div>
        )
    }
}
