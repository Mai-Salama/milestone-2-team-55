import React,{Component  } from 'react';
import {useState} from 'react'
import {Button} from "./Button"
import Staff from './StaffAM';
import Course from './Course'
import './Button.css'
import {Redirect} from "react-router-dom"
import Select from 'react-select';
import Navbar from '../NavbarInstructor'
import axios from 'axios';
import {Dropdown} from "react-bootstrap";
import HomeCC from '../CourseCoordinator/CoordinatorHomeCont';
import HomeHOD from '../hod/HODhomepage';


   


    class HomeInstructor extends Component{
    constructor(props){
        super(props);
        this.state={
            RedirectToHomeAM:null,
            RedirectToHomeCC:null,
            RedirectToHomeCI:null,
            RedirectToHomeHOD:null,
            stateCC:"",
            stateCI:"",
            stateHOD:"",
            DisabledCC:false,
            DisabledCI:false,
            DisabledHOD:false

            
        }
        
        this.viewStaff=this.viewStaff.bind(this);
        this.viewCourses=this.viewCourses.bind(this);

    }
   
    viewStaff(event){
        this.setState({RedirectToStaff:"/StaffAM"})
        event.preventDefault()
    }
    viewCourses(event){
        this.setState({RedirectToCourses:"/Course"})
        event.preventDefault()


    }

    HomeAM(event){
        this.setState({RedirectToHomeAM:"/StaffAM/AddStaffMember"})
        event.preventDefault()
    }
    HomeCC(event){
        this.setState({RedirectToHomeCC:"/HomeC"})
        event.preventDefault()
    }
    HomeCI(event){
        this.setState({RedirectToHomeCI:"/HomeInstructor"})
        event.preventDefault()
    }
    HomeHOD(event){
        this.setState({RedirectToHomeHOD:"/HODhomepage"})
        event.preventDefault()
    }



    componentDidMount=()=>{
        axios.get('/getRole', {
            headers:{
'x-auth-token':localStorage.getItem('savedToken')
            }
           
          })
          .then(response => {
            this.setState({
                
                stateCC:response.data.CC,
                stateCI:response.data.CI,
                stateHOD:response.data.HOD

            })

            if(this.state.stateCC=="0"){
                this.setState({
                    DisabledCC:true
                })
            }

            if(this.state.stateCI=="0"){
                this.setState({
                    DisabledCI:true
                })
            }

            if(this.state.stateHOD=="0"){
                this.setState({
                    DisabledHOD:true
                })
            }
          //console.log(this.state.Roles);

        })
          .catch(function (error) {
            console.log(error);
          });

        
    }
    render(){
        if(this.state.RedirectToStaff){
            return<Redirect to ={this.state.RedirectToStaff} Component={Staff}/>
        }
        if(this.state.RedirectToCourses){
            return<Redirect to ={this.state.RedirectToCourses} Component={Course}/>
        }
        if(this.state.RedirectToHomeCC){
            return<Redirect to ={this.state.RedirectToHomeCC} Component={HomeCC}/>
        }
        if(this.state.RedirectToHomeHOD){
            return<Redirect to ={this.state.RedirectToHomeHOD} Component={HomeHOD}/>
        }
        return(
            
            <div className="HomeInstructor">
                <Navbar/>
            <h1 style={{fontFamily:'Montserrat', textAlign:'center'}}> Welcome to your home page </h1>
           
            <Dropdown>
                <Dropdown.Toggle  id="dropdown1"style={{alignSelf:"center",marginLeft:550, marginTop:70 }}>
                <i class="fas fa-eye"></i>  Navigate 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.HomeAM.bind(this)} >Academic Member</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.HomeCC.bind(this)} disabled={this.state.DisabledCC}>Course Coordinator</Dropdown.Item> 
                    <Dropdown.Item as="button" onClick={this.HomeCI.bind(this)} disabled="true">Course Instructor</Dropdown.Item> 
                    <Dropdown.Item as="button" onClick={this.HomeHOD.bind(this)} disabled={this.state.DisabledHOD}>Head Of Department</Dropdown.Item> 
                </Dropdown.Menu>
            </Dropdown>
            <Button style={{alignSelf:"center",marginLeft:550, marginTop:70 }} class="btn btn-primary btn-round" onClick={this.viewStaff}>
            <i class="fas fa-users"></i> Staff
            </Button>
            <Button style={{alignSelf:"center",marginLeft:550, marginTop:70 ,marginBottom:300 }} class="btn btn-primary btn-round"onClick={this.viewCourses}>
            <i class="fas fa-book-open"></i> Courses
            </Button>
            </div>
        )}

}



export default HomeInstructor