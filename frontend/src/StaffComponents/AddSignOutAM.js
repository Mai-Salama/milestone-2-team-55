import React, { Component } from 'react';
import axios from "axios";
import Navbar from '../NavbarHR.js';

export default class AddSignOutAM extends Component {
    constructor(props){
        super(props);
        this.state = {
        id: '',
        hour: '',
        minute:'',
        datee:'',
        monthe:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]:value});
    }

    handleSubmit(event){
        const inputData = {
            staffid: this.state.id,
            hourout: this.state.hour,
            minuteout: this.state.minute,
            date: this.state.datee,
            month: this.state.monthe,
            staffcategory:"AM"
        }
        axios.post('/addmissingSignOut', inputData, {headers: {
            'x-auth-token': localStorage.getItem('savedToken')
        }}).then(response =>{
            console.log(response.data);
            //maybe a pop up message with response.data
        }).catch(err =>{
            console.log(err);
        });
        event.preventDefault();
    };
    render() {
        return (
            <div>
            <Navbar />
                    <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/Home">Home</a></li>
            <li className="breadcrumb-item"><a href="/Staff">Staff</a></li>
            <li className="breadcrumb-item"><a href="/Staff/AcademicMembers">AcademicMembers</a></li>
            <li className="breadcrumb-item"><a href="/Staff/AcademicMembers/AttendanceAM">Attendance</a></li>
            <li className="breadcrumb-item active" aria-current="page">AddSignOut</li>
          </ol>
        </nav>
            <h2>Add Missing Sign Out</h2>
            <br></br>
            <form onSubmit = {this.handleSubmit}>
            <div class="row">
                <label>
                <input name="id" placeholder="ID..." type="text" id={this.state.id} onChange={this.handleChange}/>
                </label>
            </div>
            <div class="row">
                <label>
                <input name="datee" placeholder="Date..." type="text" datee={this.state.datee} onChange={this.handleChange}/>
                </label>
                <label>
                <input name="monthe" placeholder="Month..." type="text" monthe={this.state.monthe} onChange={this.handleChange}/>
                </label>
            </div>
            <div class="row">
                <label>
                <input name="hour" placeholder="Hour..." type="text" hour={this.state.hour} onChange={this.handleChange}/>
                </label>
                <label>
                <input name="minute" placeholder="Minute..." type="text" minute={this.state.minute} onChange={this.handleChange}/>
                </label>
            </div>
            <input type="submit" id="submit" value="Submit" />
            </form>
        </div>
        )
    }
}
