import React, { Component } from 'react';
import axios from "axios";
import Navbar from '../NavbarHR.js';

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
            <Navbar />
             <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/Home">Home</a></li>
            <li className="breadcrumb-item"><a href="/Staff">Staff</a></li>
            <li className="breadcrumb-item"><a href="/Staff/AcademicMembers">AcademicMembers</a></li>
            <li className="breadcrumb-item active" aria-current="page">UpdateAcademicMember</li>
          </ol>
        </nav>
            <h2>Update HR member</h2>
            <br></br>
            <form onSubmit = {this.handleSubmit}>
            <div class="row">
                <label>
                <input name="ide" placeholder="ID..." type="text" ide={this.state.ide} onChange={this.handleChange}/>
                </label>
                <label>
                <input name="namee" placeholder="Name..." type="text" namee={this.state.namee} onChange={this.handleChange}/>
                </label>
                <label>
                <input name="gendere" placeholder="Gender..." type="text" gendere={this.state.gendere} onChange={this.handleChange}/>
                </label>
            </div>
            <div class="row">
                <label>
                <input name="officee" placeholder="Office..." type="text" officee={this.state.officee} onChange={this.handleChange}/>
                </label>
                <label>
                <input name="salarye" placeholder="Salary..." type="text" salarye={this.state.salarye} onChange={this.handleChange}/>
                </label>
                <label>
                <input name="extrainfoe" placeholder="Extra Info..." type="text" extrainfoe={this.state.extrainfoe} onChange={this.handleChange}/>
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
