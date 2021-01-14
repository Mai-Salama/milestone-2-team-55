import React, { Component } from 'react';
import axios from "axios";
import Navbar from '../NavbarHR.js';

export default class AddNewAM extends Component {
    constructor(props){
        super(props);
        this.state = {
        officeloc: '',
        namee: '',
        emaile: '',
        salarye: '',
        gendere: '',
        dayoffe: '',
        facultye: '',
        departmente: ''};
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
            name: this.state.namee,
            email: this.state.emaile,
            gender: this.state.gendere,
            office: this.state.officeloc,
            salary: this.state.salarye,
            dayoff: this.state.dayoffe,
            faculty: this.state.facultye,
            department: this.state.departmente
        }
        //console.log("from inputData" + inputData);
        axios.post('/addAM', inputData, {headers: {
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
            <li className="breadcrumb-item"><a href="/Home">Home</a></li>
            <li className="breadcrumb-item"><a href="/Staff">Staff</a></li>
            <li className="breadcrumb-item"><a href="/Staff/AcademicMembers">AcademicMembers</a></li>
            <li className="breadcrumb-item active" aria-current="page">AddNewAcademicMember</li>
          </ol>
        </nav>
            <h1>Add new Academic Member</h1>
            <form onSubmit = {this.handleSubmit}>
            <div class="row">
                <label>
                <input name="namee" placeholder="Name..." type="text" namee={this.state.namee} onChange={this.handleChange}/>
                </label>
                <label>
                <input name="emaile" placeholder="Email..." type="text" emaile={this.state.emaile} onChange={this.handleChange}/>
                </label>
                <label>
                <input name="gendere" placeholder="Gender..." type="text" gendere={this.state.gendere} onChange={this.handleChange}/>
                </label>
            </div>
            <div class="row">
                <label>
                <input name="officeloc" placeholder="Office..." type="text" officeloc={this.state.officeloc} onChange={this.handleChange}/>
                </label>
                <label>
                <input name="salarye" placeholder="Salary..." type="text" salarye={this.state.salarye} onChange={this.handleChange}/>
                </label>
                <label>
                <input name="dayoffe" placeholder="Day Off..." type="text" dayoffe={this.state.dayoffe} onChange={this.handleChange}/>
                </label>
            </div>
            <div class="row">
                <label>
                <input name="facultye" placeholder="Faculty..." type="text" facultye={this.state.facultye} onChange={this.handleChange}/>
                </label>
                <label>
                <input name="departmente" placeholder="Department..." type="text" departmente={this.state.departmente} onChange={this.handleChange}/>
                </label>
            </div>
            <input type="submit" id="submit" value="Submit" />
            </form>
        </div>
        )
    }
}
