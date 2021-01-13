import React, { Component } from 'react';
import axios from "axios";
import {Button} from 'react-bootstrap';

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
            staffcategory: "HR",
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
    // componentDidMount= ()=>{
    //     const inputData = {
    //         staffcategory: "HR",
    //         staffid: "hr-4"
    //     }
    //     axios.post('/viewStaffAttendance', inputData, {headers: {
    //      'x-auth-token': localStorage.getItem('savedToken')
    //  }}).then(response =>{
    //      console.log(response.data);
    //       }).catch(err =>{
    //      console.log(err);
    //  })
    // }
    render() {
        if(this.state.submitted){
            return (
                <div>
            <div>
    <table>
    <thead>
        <tr>
            <th>Date</th>
            <th>Month</th>
            <th>Day</th>
        </tr>
    </thead>
    <tbody>
    {this.state.attendance.map((item =>
            <tr>
            <td>{item.date}</td>
            <td>{item.month}</td>
            <td>{item.day}</td>
            </tr>
        ))}
    </tbody>
    </table>  
</div>
<div>
    <table>
    <thead>
           
        <tr>
            <th colSpan="2">Sign In</th>
            <th colSpan="2">Sign Out</th>
        </tr>
        <tr>
            <th>Hour In</th>
            <th>Minute In</th>
            <th>Hour Out</th>
            <th>Minute Out</th>
        </tr>
    </thead>
    <tbody>
    {this.state.signs.map((item =>
        <tr>
           <td>{item.hourin}</td>
           <td>{item.minutein}</td>
           <td>{item.hourout}</td>
           <td>{item.minuteout}</td> 
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
                    ID:
                    <input name="id" type="text" ide={this.state.id} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
