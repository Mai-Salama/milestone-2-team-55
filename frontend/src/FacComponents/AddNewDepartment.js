import React, { Component } from 'react';
import axios from "axios";
import {Redirect} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Navbar from '../NavbarHR.js';

export default class AddNewDepartment extends Component {
    constructor(props){
        super(props);
        this.state = {
        faculty: '',
        depname: '',
        hodid: ''};
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
        console.log(this.state.faculty);
        const inputData = {
            facultyname: this.state.faculty,
            name: this.state.depname,
            HODid: this.state.hodid
        }
        //console.log("from inputData" + inputData);
        axios.post('/adddepartment', inputData, {headers: {
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
              <li className="breadcrumb-item"><a href="Home">Home</a></li>
              <li className="breadcrumb-item"><a href="Home/Faculties">Faculties</a></li>
              <li className="breadcrumb-item active" aria-current="page">AddNewFaculty</li>
            </ol>
          </nav>
          <br></br>
                <h1>Add new Department</h1>
                <form onSubmit = {this.handleSubmit}>
                <div class="row">
                    <label>
                        <input name="faculty" placeholder="Faculty Name..." type="text" faculty={this.state.faculty} onChange={this.handleChange}/>
                    </label>
                </div>
                <div class="row">
                    <label>
                        <input name="depname" placeholder="Name Of The New Department..." type="text" depname={this.state.depname} onChange={this.handleChange}/>
                    </label>
                    <label>
                        <input name="hodid" placeholder="Head Of Department ID..." type="text" hodid={this.state.hodid} onChange={this.handleChange}/>
                    </label>
                </div>
                <input type="submit" id="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
