import React, { Component } from 'react';
import axios from "axios";
import {Redirect} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Navbar from '../NavbarHR.js';

export default class UpdateFaculty extends Component {
    constructor(props){
        super(props);
        this.state = {
        facultyold: '',
        facultynew: ''};
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
            facultyname: this.state.facultyold,
            newfacultyname: this.state.facultynew
        }
        axios.post('/updatefaculty', inputData, {headers: {
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
              <li className="breadcrumb-item"><a href="/Faculties">Faculties</a></li>
              <li className="breadcrumb-item active" aria-current="page">UpdateFaculty</li>
            </ol>
          </nav>
                <h1>Update Faculty</h1>
                <form onSubmit = {this.handleSubmit}>
                <div class="row">
                    <label>
                        <input name="facultyold" placeholder="Current Faculty Name..." type="text" facultyold={this.state.facultyold} onChange={this.handleChange}/>
                    </label>
                    <label>
                        <input name="facultynew" placeholder="New Faculty Name..." type="text" facultyold={this.state.facultynew} onChange={this.handleChange}/>
                    </label>
                </div>
                <input type="submit" id="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
