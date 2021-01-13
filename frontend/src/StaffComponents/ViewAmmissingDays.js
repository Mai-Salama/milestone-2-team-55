import React, { Component } from 'react';
import axios from "axios";

export default class ViewHRmissingDays extends Component {
    constructor(props){
        super(props);
        this.state = {
            missingdays:[],
            staffid: '',
            submitted:null
        };
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
            category: "AM",
            id: this.state.staffid   
        }
        console.log("in here");
    axios.post('/viewStaffWithMissingDays', inputData, {headers: {
         'x-auth-token': localStorage.getItem('savedToken')
     }}).then(response =>{
         this.setState({missingdays: response.data});
         this.setState({submitted: "true"});
         console.log(this.state.missingdays);
     }).catch(err =>{
         console.log(err);
     })
     event.preventDefault();
    };
    render() {
        if(this.state.submitted){
            return(
                <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Month</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.missingdays.map((item =>
                        <tr>
                        <td>{item.i}</td>
                        <td>{item.todaysMonth}</td>
                        </tr>
                    ))}
                
                </tbody>
                </table> 
            )
        }
        return (
            <form onSubmit = {this.handleSubmit}>
            <label>
                ID:
                <input name="staffid" type="text" staffid={this.state.staffid} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit" />
            </form>
        )
    }
}
