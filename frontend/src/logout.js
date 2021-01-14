import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from 'react-router-dom';
import UpdatedLogin from './UpdatedLogin';




export default class Logout extends Component {
    constructor(props){
        super(props);
        this.state = {
        redirect: null};

        this.handleSubmit = this.handleSubmit.bind(this);
    }



    async handleSubmit(event){
       
        axios.get('/logout').then(response =>{
            console.log(response.data);
            let token = response.headers['x-auth-token'];
            localStorage.deleteItem("savedToken", token);
            
        }).catch(err =>{
            console.log(err);
        });
        event.preventDefault();
    };
   
    render() {
      
        if(this.state.redirect == "/Logout"){
            return <Redirect to={this.state.redirect} Component={UpdatedLogin}/>
        }
    
    }
}
