import React, { Component } from 'react'
import axios from "axios";

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
            category: "AM"
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
            <table id="requeststable">
            <thead>
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
            <table id="requeststable">
            <thead>
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
            <table id="requeststable">
            <thead>
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
