import React, { Component } from 'react';
import axios from "axios";

export default class UpdateAM extends Component {
    constructor(props){
        super(props);
        this.state = {
        ide: '',
        officee: '',
        namee:'',
        gendere:'',
        extrainfoe:'',
        salarye:'',
        facultye:'',
        departmente:''};
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
            id: this.state.ide,
            name: this.state.namee,
            gender: this.state.gendere,
            office: this.state.officee,
            salary: this.state.salarye,
            extrainfo: this.state.extrainfoe,
            facultyname: this.state.facultye,
            departmentname: this.state.departmente
        }
        axios.post('/updateAM', inputData, {headers: {
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
            <h1>Update HR member</h1>
            <form onSubmit = {this.handleSubmit}>
            <label>
                ID:
                <input name="ide" type="text" ide={this.state.ide} onChange={this.handleChange}/>
                Name(update or resubmit original):
                <input name="namee" type="text" namee={this.state.namee} onChange={this.handleChange}/>
                Gender:
                <input name="gendere" type="text" gendere={this.state.gendere} onChange={this.handleChange}/>
                Office:
                <input name="officee" type="text" officee={this.state.officee} onChange={this.handleChange}/>
                Salary:
                <input name="salarye" type="text" salarye={this.state.salarye} onChange={this.handleChange}/>
                Extra Info:
                <input name="extrainfoe" type="text" extrainfoe={this.state.extrainfoe} onChange={this.handleChange}/>
                Faculty:
                <input name="facultye" type="text" facultye={this.state.facultye} onChange={this.handleChange}/>
                Department:
                <input name="departmente" type="text" departmente={this.state.departmente} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit" />
            </form>
        </div>
        )
    }
}
