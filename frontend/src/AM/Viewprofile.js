import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-modal';
import {Redirect} from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.css';
import {useHistory} from 'react-router-dom';
import Navbar from '../NavbarAM'
//
export default class Viewprofile extends Component {
    constructor(){
        super();
        this.state={
            weather:"Not yet gotten"
        };

    
 
    axios.get('/viewprofile',{headers:{
        'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTQiLCJlbWFpbCI6InJhbmEuYWhtZWRAZ3VjLmVkdS5lZyIsInJvbGUiOiJBTSIsImlhdCI6MTYwODkwMzIzOH0.JMVKdzKRV0DjbypXnWWSkaGN1ytn11B0CbdCOPU7JGA'
    }})
      .then (response =>{
        this.setState({
            name:response.data.name,
            office:response.data.office,
            email:response.data.email,
           dayoff:response.data.dayoff,
           salary:response.data.Salary

        })
        console.log("hiiiii")
       console.log(response.data)
      })
      this.setState({
        statemodal:true
    })

      
    }
  
    
   


    //style="background-image: /merhans.png"
    
  render() {
    return (
       
      <div> 

        <Navbar/>
      <Modal isOpen={this.state.statemodal} >
      

    

      <h3>name is {this.state.name}</h3>
      <h3>office is {this.state.office}</h3>
      <h3>email is {this.state.email}</h3>
      <h3>day-off is {this.state.dayoff}</h3>
      <h3>salary is {this.state.salary}</h3>
      </Modal>
      </div>
      
    );
  }
}