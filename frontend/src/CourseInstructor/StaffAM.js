import React,{Component  } from 'react';
import {Button} from "./Button"
import './Button.css'
import {Dropdown} from "react-bootstrap";
import AddStaffMember from "./AddStaffMember";
import RemoveStaffMember from "./RemoveStaffMember";
import AssignCourseCoordinator from "./AssignCourseCoordinator";
import {Redirect} from 'react-router-dom';
import Navbar from '../NavbarInstructor'
import ViewStaffbyCourse from './ViewStaffbyCourse'
import ViewStaffbyDep from './ViewStaffbyDep'


class Staff extends Component{
    constructor(props){
        super(props);
        this.state={
            RedirectToAddStaffMember:null,
            RedirectToRemoveStaffMember:null,
            RedirectToAssignCourseCoordinator:null,
            RedirectToViewStaffbyDep:null,
            RedirectToViewStaffbyCourse:null
            
        }
        this.AddStaffMember=this.AddStaffMember.bind(this);
        this.RemoveStaffMember=this.RemoveStaffMember.bind(this);
        this.AssignCourseCoordinator=this.AssignCourseCoordinator.bind(this);
        this.ViewStaffbyDep=this.ViewStaffbyDep.bind(this);
        this.ViewStaffbyCourse=this.ViewStaffbyCourse.bind(this);
       
    }
  
    AddStaffMember(event){
        this.setState({RedirectToAddStaffMember:"/StaffAM/AddStaffMember"})
        event.preventDefault()
    }
    RemoveStaffMember(event){
        this.setState({RedirectToRemoveStaffMember:"/StaffAM/RemoveStaffMember"})
        event.preventDefault()
    }
    AssignCourseCoordinator(event){
        this.setState({RedirectToAssignCourseCoordinator:"/StaffAM/AssignCourseCoordinator"})
        event.preventDefault()
    }
    ViewStaffbyDep(event){
        this.setState({RedirectToAssignCourseCoordinator:"/StaffAM/ViewStaffbyDep"})
        event.preventDefault()
    }
    ViewStaffbyCourse(event){
        this.setState({RedirectToViewStaffbyCourse:"/StaffAM/ViewStaffbyCourse"})
        event.preventDefault()
    }
    render(){
        if(this.state.RedirectToAddStaffMember){
            return<Redirect to ={this.state.RedirectToAddStaffMember} Component={AddStaffMember}/>
        }
        if(this.state.RedirectToRemoveStaffMember){
            return<Redirect to ={this.state.RedirectToRemoveStaffMember} Component={RemoveStaffMember}/>
        }
        if(this.state.RedirectToAssignCourseCoordinator){
            return<Redirect to ={this.state.RedirectToAssignCourseCoordinator} Component={AssignCourseCoordinator}/>
        }
        if(this.state.RedirectToViewStaffbyCourse){
            return<Redirect to ={this.state.RedirectToViewStaffbyCourse} Component={ViewStaffbyCourse}/>
        }
        if(this.state.RedirectToViewStaffbyDep){
            return<Redirect to ={this.state.RedirectToViewStaffbyDep} Component={ViewStaffbyDep}/>
        }
        return(
            <div className="Staff">
           <Navbar/>

           <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="/HomeInstructor">Home</a></li>
             

              <li className="breadcrumb-item active text-danger" aria-current="page">Staff</li>
            </ol>
          </nav>
            <button style={{alignSelf:"center",marginLeft:550, marginTop:70 }} class="btn btn-primary btn-round" onClick={this.AddStaffMember}>
            <i class="fas fa-user"></i> Add staff member
            </button>
            <button style={{alignSelf:"center",marginLeft:550, marginTop:70 }} class="btn btn-primary btn-round"onClick={this.RemoveStaffMember}>
            <i class="fas fa-user-times"></i> Remove staff member
            </button>
    
            <Dropdown>
                <Dropdown.Toggle  id="dropdown1"style={{alignSelf:"center",marginLeft:550, marginTop:70 }}>
                <i class="fas fa-eye"></i>  View Staff 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.ViewStaffbyDep}>By Department</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.ViewStaffbyCourse}>By Course</Dropdown.Item> 
                </Dropdown.Menu>
            </Dropdown>
            <button style={{alignSelf:"center",marginLeft:550, marginTop:70 ,marginBottom:200 }} class="btn btn-primary btn-round"onClick={this.AssignCourseCoordinator}>
            <i class="fas fa-map-marker-alt"></i> assign course coordinator
            </button>
           
            </div>
        )}

}
export default  Staff