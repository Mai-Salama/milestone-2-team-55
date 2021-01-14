import React, { Component } from 'react';
import axios from "axios";
import {Button} from 'react-bootstrap';
import Navbar from '../NavbarHR.js';

export default class ViewStaffAttendanceHR extends Component {
    constructor(props){
        super(props);
        this.state = {
            attendance: [],
            signs:[],
            id:'',
        submitted:null};
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
            staffcategory: "AM",
            staffid: this.state.id
        }
        axios.post('/viewStaffAttendance', inputData, {headers: {
            'x-auth-token': localStorage.getItem('savedToken')
        }}).then(response =>{
            this.setState({attendance: response.data});
            //this.setState({signs: this.state.attendance.signs});
           let signslist = [];
           this.state.attendance.map((item =>{
            signslist.push(item.signs);
           }))
           this.setState({signs: signslist});
           console.log(this.state.attendance[0]);
           console.log(this.state.signs);
           let finalizedsigns = [];
           for(let i = 0; i < this.state.signs.length; i++){
               if(this.state.signs[i].length > 0){
                finalizedsigns.push(this.state.signs[i][0]);
               }
           }
           this.setState({signs: finalizedsigns});
           this.setState({submitted: "true"});
            //maybe a pop up message with response.data
        }).catch(err =>{
            console.log(err);
        });
        event.preventDefault();
    };
    render() {

        if(this.state.submitted){
            return (
                <div>
                <Navbar />
                 <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/Home">Home</a></li>
            <li className="breadcrumb-item"><a href="/Staff">Staff</a></li>
            <li className="breadcrumb-item"><a href="/Staff/AcademicMembers">AcademicMembers</a></li>
            <li className="breadcrumb-item"><a href="/Staff/AcademicMembers/AttendanceAM">Attendance</a></li>
            <li className="breadcrumb-item active" aria-current="page">ViewStaffAttendance</li>
          </ol>
        </nav>
            <div>

                <table className="table table-bordered">
                    <thread className="table-warning">
                        <tr>
                            <th>Day</th>
                            <th>Date</th>
                            <th>Month</th>
                            <th colSpan="2">SignIn</th>
                            <th colSpan="2">SignOut</th>
                        </tr>
                    </thread>
                    <tbody>
                       {this.state.attendance.map((item =>
                            <tr>
                                <td>{item.day}</td>
                                <td>{item.date}</td>
                                <td>{item.month}</td>
                                <td>
                                    <table className= "table table-bordered">
                                        <thread className="table-warning">
                                            <tr>
                                                <th>Timing</th>
                                            </tr>
                                        </thread>
                                        <tbody>
                                            {item.signs.map((smalleritem =>
                                            <tr>
                                                <td>{smalleritem.hourin}</td>
                                                <td>{smalleritem.minutein}</td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                <table className= "table table-bordered">
                                        <thread className="table-warning">
                                            <tr>
                                                <th>Timing</th>
                                            </tr>
                                        </thread>
                                        <tbody>
                                            {item.signs.map((smalleritem =>
                                            <tr>
                                                <td>{smalleritem.hourout}</td>
                                                <td>{smalleritem.minuteout}</td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                       ))}
                    </tbody>
                </table>

</div>
</div>)
        }
        return (
                <div>
                <form onSubmit = {this.handleSubmit}>
                <label>
                    <input name="id" placeholder="ID..." type="text" ide={this.state.id} onChange={this.handleChange}/>
                </label>
                <input type="submit" id="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
