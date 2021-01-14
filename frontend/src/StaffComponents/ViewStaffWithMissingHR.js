import React, { Component } from 'react'
import axios from "axios";
import Navbar from '../NavbarHR.js';

export default class ViewStaffWithMissingHR extends Component {
    constructor(props){
        super(props);
        this.state = {
            staffids: [],
            missingH: [],
            missingM: []
        };
    }
    componentDidMount= ()=>{
        const inputData = {
            category: "HR"
        }
        axios.post('/staffWithMissingHours', inputData, {headers: {
         'x-auth-token': localStorage.getItem('savedToken')
     }}).then(response =>{
         let list = response.data;
         console.log(list.staffid);
         this.setState({staffids: list.staffid});
         this.setState({missingH: list.missinghours});
         this.setState({missingM: list.missingminutes});
         console.log(this.state.staffids);
     }).catch(err =>{
         console.log(err);
     })
    };
    render() {
        return (
            <div>
            <Navbar />
                     <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/Home">Home</a></li>
            <li className="breadcrumb-item"><a href="/Staff">Staff</a></li>
            <li className="breadcrumb-item"><a href="/Staff/HRstaff">HRstaff</a></li>
            <li className="breadcrumb-item"><a href="/Staff/HRstaff/AttendanceHR">AttendanceHR</a></li>
            <li className="breadcrumb-item active" aria-current="page">StaffWithMissingHours</li>
          </ol>
        </nav>
            <table id="attendancetable">
            <thead className="table-warning">
                <tr>
                    <th>Staff ID</th>
                </tr>
            </thead>
            <tbody>
            {this.state.staffids.map((item =>
                    <tr>
                    <td>{item}</td>
                    </tr>
                ))}
            
            </tbody>
            </table> 
            <table id="attendancetable">
            <thead className="table-warning">
                <tr>
                    <th>Hours</th>
                </tr>
            </thead>
            <tbody>
            {this.state.missingH.map((item =>
                    <tr>
                    <td>{item}</td>
                    </tr>
                ))}
            
            </tbody>
            </table>
            <table id="attendancetable">
            <thead className="table-warning">
                <tr>
                    <th>Minutes</th>
                </tr>
            </thead>
            <tbody>
            {this.state.missingM.map((item =>
                    <tr>
                    <td>{item}</td>
                    </tr>
                ))}
            
            </tbody>
            </table>   
        </div>
        )
    }
}
