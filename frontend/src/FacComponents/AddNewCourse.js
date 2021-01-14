import React, { Component } from 'react';
import axios from "axios";
import Navbar from '../NavbarHR.js';

export default class AddNewCourse extends Component {
    constructor(props){
        super(props);
        this.state = {
        faculty: '',
        depid: '',
        coursename: '',
        courseid: '',
        slots:''};
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
            departmentid: this.state.depid,
            id: this.state.courseid,
            name: this.state.coursename,
            NoOfSlots: this.state.slots
        }
        //console.log("from inputData" + inputData);
        axios.post('/addcourse', inputData, {headers: {
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
              <li className="breadcrumb-item"><a href="Home/Faculties/Departments">Departments</a></li>
              <li className="breadcrumb-item"><a href="Home/Faculties/Departments/Courses">Courses</a></li>
              <li className="breadcrumb-item active" aria-current="page">AddNewCourse</li>
            </ol>
          </nav>
                <br></br>
                <h1>Add new Course</h1>
                <form onSubmit = {this.handleSubmit}>
                <div class="row">
                    <label>
                        <input name="faculty" placeholder="FacultyName..." type="text" faculty={this.state.faculty} onChange={this.handleChange}/>
                    </label>
                    <label>
                        <input name="depid" placeholder="Department..." type="text" depname={this.state.depid} onChange={this.handleChange}/>
                    </label>
                </div>
                <div class="row">
                    <label>
                        <input name="courseid" placeholder="New Course ID..." type="text" courseid={this.state.courseid} onChange={this.handleChange}/>    
                    </label>
                    <label>
                        <input name="coursename" placeholder="New Course Name..." type="text" coursename={this.state.coursename} onChange={this.handleChange}/>
                    </label>
                    <label>
                        <input name="slots" placeholder="New Course Number Of Slots..." type="text" slots={this.state.slots} onChange={this.handleChange}/>
                    </label>
                </div>
                <input type="submit" id="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
