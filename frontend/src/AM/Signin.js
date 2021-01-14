import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

import {Redirect} from 'react-router-dom'
import Navbar from '../NavbarAM'


export default class Signin extends Component {
    constructor(){
        super();
    }
 handlebuttonClick = () =>{
   
    axios.get('/signinAM',{headers:{
        'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTYiLCJlbWFpbCI6IkAiLCJyb2xlIjoiQU0iLCJpYXQiOjE2MTAwMjczNDJ9.pRkBA4iwG2nCDTXd1pvdJ_qoIJ7jz3dYctyELvAs4EI'
    }})
      .then (response =>{
        this.setState({
           
             
        })
        
      })
      console.log("sign in successfully")
    }

    handlebuttonClick2 = () =>{
   
        axios.get('/signoutAM',{headers:{
            'x-auth-token':localStorage.getItem('savedToken')
        }})
          .then (response =>{
            this.setState({
               
                 
            })
            
          })
          console.log("sign out successfully")
        }
    

  render() {
    return (
     
      <div> 
         <Navbar/>   
    
     <button onClick={this.handlebuttonClick} type="button" id="loginSubmit">Sign In</button>
     <button onClick={this.handlebuttonClick2} type="button" id="loginSubmit">Sign Out</button>
      </div>
    );
  }
}


