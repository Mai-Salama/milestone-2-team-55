import React, { Component } from 'react';
import axios from "axios";
import HomeHR from './home-hr.component';
import { Redirect } from 'react-router-dom';

export default class ChangePasswordHR extends Component {
    constructor(props){
        super(props);
        this.state = {
            pass: '',
            redirect:null
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
            password: this.state.pass
        }
        axios.post('/changePasswordHR', inputData, {headers: {
            'x-auth-token': localStorage.getItem('savedToken')
        }}).then(response =>{
            console.log(response.data);
            //maybe a pop up message with response.data
            this.setState({redirect: "/HomeHR"});
        }).catch(err =>{
            console.log(err);
        });
        event.preventDefault();
    };
    render() {
        if(this.state.redirect){
            console.log(this.state.redirect);
            return <Redirect to={this.state.redirect} Component={HomeHR}/>
        }
        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <br></br>
                    <br></br>
                    <label id="loginText">
                        Please Change The Default Password 
                    </label>
                    <br></br>
                    <label>
                        <input name="pass" placeholder="New Password..." type="text" pass={this.state.pass} onChange={this.handleChange}/>
                    </label>
                    
                    <input id="loginSubmit" type="submit" value="Submit" />
                </form>                
            </div>
        )
    }
}
