import React, { Component } from 'react';
import axios from "axios";

export default class AddSignOutHR extends Component {
    constructor(props){
        super(props);
        this.state = {
        id: '',
        hour: '',
        minute:'',
        datee:'',
        monthe:''};
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
            staffid: this.state.id,
            hourout: this.state.hour,
            minuteout: this.state.minute,
            date: this.state.datee,
            month: this.state.monthe,
            staffcategory:"HR"
        }
        axios.post('/addmissingSignOut', inputData, {headers: {
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
            <form onSubmit = {this.handleSubmit}>
            <label>
                Staff ID:
                <input name="id" type="text" id={this.state.id} onChange={this.handleChange}/>
                Date:
                <input name="datee" type="text" datee={this.state.datee} onChange={this.handleChange}/>
                Month:
                <input name="monthe" type="text" monthe={this.state.monthe} onChange={this.handleChange}/>
                Hour:
                <input name="hour" type="text" hour={this.state.hour} onChange={this.handleChange}/>
                Minute:
                <input name="minute" type="text" minute={this.state.minute} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit" />
            </form>
        </div>
        )
    }
}
