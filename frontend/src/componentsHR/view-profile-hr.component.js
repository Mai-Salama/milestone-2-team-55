import React, {Component} from 'react';
import axios from 'axios';
import Navbar from "../NavbarHR.js";

export default class ViewProfileHR extends Component{
constructor(){
    super();
    this.state={
        name:'',
        office:'',
        email:'',
        dayOff:'',
        salary:''
    }

}

componentDidMount(){
    axios.get('/viewprofile',{headers:{'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImhyLTEiLCJlbWFpbCI6IkBndWMiLCJyb2xlIjoiSFIiLCJpYXQiOjE2MTAzMzU0MTJ9.XBfnhqT0VYcJiZzY4KiscpHGG-__d5ItiZ3gpbOIxx8'}})
    .then(response=> {
        this.setState({name: response.data.name,
                     office:response.data.office,
                     email: response.data.email,
                    dayoff: response.data.dayOff,
                    salary:response.data.Salary})

    }).catch((error)=> {
        console.log(error);
    })
}

    render(){
        return(
            <div>
                <Navbar/>
            <div className='container'>
               <h3>Here's your profile:</h3>
               <h4>username: {this.state.name}</h4>
               <h4>office: {this.state.office}</h4>
               <h4>email: {this.state.email}</h4>
               <h4>day off: {this.state.dayOff}</h4>
               <h4>salary: {this.state.salary}</h4>

               </div>
            </div>
        )
    }
}
