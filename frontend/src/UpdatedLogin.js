import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from 'react-router-dom';
import HomeHR from './home-hr.component';
import HomeC from './CourseCoordinator/CoordinatorHomeCont';
import ChangePasswordAM from './ChangePasswordAM';
import ChangePasswordHR from './ChangePasswordHR';

//import {Button} from 'react-bootstrap';


export default class UpdatedLogin extends Component {
    constructor(props){
        super(props);
        this.state = {email: '',
        password: '',
        redirect: null};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]:value});
    }

    async handleSubmit(event){
        const inputData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/loginHR', inputData).then(response =>{
            console.log(response.data);
            let token = response.headers['x-auth-token'];
            localStorage.setItem("savedToken", token);
            if(response.data.roleToSend == "AM" && response.data.reset == "reset"){
                this.setState({redirect: "/HomeC"});
            }
            if(response.data.roleToSend == "AM" && response.data.reset == "notreset"){
                this.setState({redirect: "/ChangePasswordAM"});
            }
            if(response.data.roleToSend == "HR" && response.data.reset == "reset"){
                this.setState({redirect: "/HomeHR"});
            }
            if(response.data.roleToSend == "HR" && response.data.reset == "notreset"){
                this.setState({redirect: "/ChangePasswordHR"});
            }
        }).catch(err =>{
            console.log(err);
        });
        event.preventDefault();
    };
   
    render() {
        if(this.state.redirect == "/HomeC"){
            return <Redirect to={this.state.redirect} Component={HomeC}/>
        }
        if(this.state.redirect == "/ChangePasswordAM"){
            return <Redirect to={this.state.redirect} Component={ChangePasswordAM}/>
        }
        if(this.state.redirect == "/HomeHR"){
            return <Redirect to={this.state.redirect} Component={HomeHR}/>
        }
        if(this.state.redirect == "/ChangePasswordHR"){
            return <Redirect to={this.state.redirect} Component={ChangePasswordHR}/>
        }
        return (
            
            <form onSubmit = {this.handleSubmit}>
            <div class="container">
                <br></br>
                <br></br>
                <br></br>
                <label id="loginText">
                    Email
                </label>
                <br></br>
                <input name="email" id="forLogin" placeholder="example@guc.edu.eg" type="text" email={this.state.email} onChange={this.handleChange}/>
                <br></br>
                <label id="loginText">
                    Password
                </label>
                <br></br>
                <input name="password" id="forLogin" type="password" password={this.state.password} onChange={this.handleChange}/>
                <br></br>
            <input type="submit" id="loginSubmit" value="Submit" />
            </div>
            </form>
            
         
        )
    }
}
