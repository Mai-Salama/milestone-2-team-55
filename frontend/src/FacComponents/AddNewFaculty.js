import React, { Component } from 'react';
import axios from "axios";
import {Redirect} from 'react-router-dom';
import Navbar from '../NavbarHR.js';




export default class AddNewFaculty extends Component {
    constructor(props){
        super(props);
        this.state = {
        faculty: ''};
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
            name: this.state.faculty
        }
        //console.log("from inputData" + inputData);
        axios.post('/addfaculty', inputData, {headers: {
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
                <h2>Add new faculty</h2>
                <br></br>
                <form onSubmit = {this.handleSubmit}>
                <label>
                    <input name="faculty" placeholder="Name Of The New Faculty..." type="text" faculty={this.state.faculty} onChange={this.handleChange}/>
                </label>
                <input type="submit" id="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
