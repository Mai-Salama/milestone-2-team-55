import React,{Component  } from 'react';
import {Button} from "./Button"
import Staff from './StaffAM';
import Course from './Course'
import './Button.css'
import {Redirect} from "react-router-dom"

import Navbar from '../NavbarInstructor'
class HomeInstructor extends Component{
    constructor(props){
        super(props);
        this.state={
            RedirectToStaff:null,
            RedirectToCourses:null
            
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
    render(){
        if(this.state.RedirectToStaff){
            return<Redirect to ={this.state.RedirectToStaff} Component={Staff}/>
        }
        if(this.state.RedirectToCourses){
            return<Redirect to ={this.state.RedirectToCourses} Component={Course}/>
        }
        return(
            
            <div className="HomeInstructor">
                <Navbar/>
            <h1 style={{fontFamily:'Montserrat', textAlign:'center'}}> Welcome to your home page </h1>
            
            <Button style={{alignSelf:"center",marginLeft:550, marginTop:70 }} class="btn btn-primary btn-round" onClick={this.viewStaff}>
            <i class="fas fa-users"></i> Staff
            </Button>
            <Button style={{alignSelf:"center",marginLeft:550, marginTop:70 ,marginBottom:300 }} class="btn btn-primary btn-round"onClick={this.viewCourses}>
            <i class="fas fa-book-open"></i> Courses
            </Button>
            </div>
        )}

}
export default  HomeInstructor