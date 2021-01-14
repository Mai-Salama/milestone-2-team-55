import React, {Component} from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import Faculties from './FacComponents/Faculties';
import Staff from "./StaffComponents/Staff"
import Navbar from "./NavbarHR.js";


export default class HomeHR extends Component{
    constructor(){
        super();
        this.state = {
            redirectToFaculties: null,
            redirectToStaff: null
        };
        this.toFaculties = this.toFaculties.bind(this);
        this.toStaff = this.toStaff.bind(this);
    }
    toFaculties(event){
        this.setState({redirectToFaculties: "/Faculties"});
        console.log("set faculties");
        console.log(this.state.redirectToFaculties);
        event.preventDefault();
    }

    toStaff(event){
        this.setState({redirectToStaff: "/Staff"});
        event.preventDefault();
    }

    onSignIn(){
        axios.get('/signinHR',{headers:{'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImhyLTMiLCJlbWFpbCI6IlllaGlhQGdtYWlsLmNvbSIsInJvbGUiOiJIUiIsImlhdCI6MTYxMDQxMzgxOH0.yLuTAkZUrQScAzILJXFJRi80eCDZtXt4mpiZhK0BDiU'}})
        .then((res)=>{
            console.log(res.data)}
           
        )

    .catch((error)=> { 
    console.log(error);
})

window.location='/Success'


}

onSignOut(){
    axios.get('/signoutHR',{headers:{'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImhyLTMiLCJlbWFpbCI6IlllaGlhQGdtYWlsLmNvbSIsInJvbGUiOiJIUiIsImlhdCI6MTYxMDQxMzgxOH0.yLuTAkZUrQScAzILJXFJRi80eCDZtXt4mpiZhK0BDiU'}})
    .then((res)=>{
        console.log(res.data)}
       
    )

.catch((error)=> { 
console.log(error);
})

window.location='/Success'


}

    render(){
        if(this.state.redirectToFaculties){
            return <Redirect to={this.state.redirectToFaculties} Component={Faculties}/>
        }
        if(this.state.redirectToStaff){
            return <Redirect to={this.state.redirectToStaff} Component={Staff}/>
        }
        return(

            <div>
                <Navbar/>
            <div className='container'>
                <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              
              <li className="breadcrumb-item active text-danger" aria-current="page">Home</li>
            </ol>
          </nav>
                <h3>Welcome to your Home Page</h3>
               <a href="/Attendance"> <button className="btn btn-warning">  Attendance </button> </a>
               <a href="/Locations"> <button className="btn btn-warning">  Locations </button> </a> 
               <br/>
               <br/>
               <button onClick={this.onSignIn} type="button" className="btn btn-warning" >  Sign In </button> 
               <br/>
               <br/>
               <button onClick={this.onSignOut} type= "button" className="btn btn-warning" >  Sign Out </button> 
               <br/>
               <br/>
               <div>
                <Button className="btn btn-warning" onClick={this.toFaculties}>Faculties</Button>
                <br/>
               <br/>
                <Button className="btn btn-warning" onClick={this.toStaff}>Staff</Button>
                <br/>
               <br/>
            </div>
            </div>
            </div>
        )
            

           
        
    }
}
