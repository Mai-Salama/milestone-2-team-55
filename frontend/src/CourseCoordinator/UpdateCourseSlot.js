import React, { Component } from 'react';
import axios from "axios";
import Navbar from '../NavbarCC';

export default class UpdateCourseSlot extends Component {
    constructor(props){
        super(props);
        this.state = {
            faculty: '',
            dep: '',
            course: '',
            daye: '',
            slote:'',
            oldroom:'',
            newroom:''};
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
        console.log(this.state.namec);
        const inputData = {
            facultyname: this.state.faculty,
            departmentid:this.state.dep,
            courseid: this.state.course,
            day: this.state.daye,
            slot: this.state.slote,
            oldlocation: this.state.oldroom,
            newlocation: this.state.newroom
        }
        axios.post('/updatecourseslot', inputData, {headers: {
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
              <li className="breadcrumb-item"><a href="/HomeC">Home</a></li>
              <li className="breadcrumb-item"><a href="/CourseSlotsC">CourseSlots</a></li>
              <li className="breadcrumb-item active" aria-current="page">UpdateCourseSlots</li>
            </ol>
          </nav>
            <form onSubmit = {this.handleSubmit}>
            <div class="row">
                <label>
                    <input name="faculty" placeholder="Faculty Name..." type="text" faculty={this.state.faculty} onChange={this.handleChange}/>
                </label>
                <label>
                    <input name="dep" placeholder="Department ID..." type="text" dep={this.state.dep} onChange={this.handleChange}/>
                </label>
                <label>
                    <input name="course" placeholder="Course ID..." type="text" course={this.state.course} onChange={this.handleChange}/>
                </label>
            </div>
            <div class="row">
                <label>
                   <input name="daye" placeholder="Day Of The Week..." type="text" daye={this.state.daye} onChange={this.handleChange}/>
                </label>
                <label>
                    <input name="slote" placeholder="Slot..." type="text" slote={this.state.slote} onChange={this.handleChange}/>
                </label>
            </div>
            <div class="row">
                <label>
                    <input name="oldroom" placeholder="Current Location..." type="text" oldroom={this.state.oldroom} onChange={this.handleChange}/>
                </label>
                <label>
                    <input name="newroom" placeholder="New Location..." type="text" newroom={this.state.newroom} onChange={this.handleChange}/>
                </label>
            </div>
            <input id="submit" type="submit" value="Submit" />
            </form>
        </div>
        )
    }
}
