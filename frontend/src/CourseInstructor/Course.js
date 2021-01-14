import React,{Component  } from 'react';
import AssignMembertoSlot from './AssignMembertoSlot';
import DeleteAssignMembertoSlot from './DeleteAssignMembertoSlot';
import UpdateAssignMembertoSlot from './UpdateAssignMembertoSlot';
import CourseCoverage from './CourseCoverage';
import SlotAssignment from './SlotAssignment';
import {Button} from "./Button"
import './Button.css'
import Navbar from '../NavbarInstructor'
import {Redirect} from 'react-router-dom'
import {Dropdown} from "react-bootstrap";
import axios from 'axios';
class Course extends Component{
    constructor(props){
        super(props);
        this.state={
            RedirectToAssignMembertoSlot:null,
            RedirectToDeleteAssignMembertoSlot:null,
            RedirectToUpdateAssignMembertoSlot:null,
            RedirectToCourseCoverage:null,
            RedirectToSlotAssignment:null,
            facultyname:"",
            departid:"",
            courseid:"",
            slots:[]

            
        }
        this.AssignMembertoSlot=this.AssignMembertoSlot.bind(this);
        this.DeleteAssignMembertoSlot=this.DeleteAssignMembertoSlot.bind(this);
        this.UpdateAssignMembertoSlot=this.UpdateAssignMembertoSlot.bind(this);
        this.SlotAssignment=this.SlotAssignment.bind(this);
        this.CourseCoverage=this.CourseCoverage.bind(this);

    }
    AssignMembertoSlot(event){
        
        this.setState({RedirectToAssignMembertoSlot:"/Course/AssignMembertoSlot"})
        
        event.preventDefault()
    }
    DeleteAssignMembertoSlot(event){
        
        this.setState({RedirectToDeleteAssignMembertoSlot:"/Course/DeleteAssignMembertoSlot"})
        
        event.preventDefault()
    }
    UpdateAssignMembertoSlot(event){
        
        this.setState({RedirectToUpdateAssignMembertoSlot:"/Course/UpdateAssignMembertoSlot"})
        
        event.preventDefault()
    }
    CourseCoverage(event){
        
        this.setState({RedirectToCourseCoverage:"/Course/CourseCoverage"})
        
        event.preventDefault()
    }
    SlotAssignment(event){
        
        this.setState({RedirectToSlotAssignment:"/Course/SlotAssignment"})
        
        event.preventDefault()
    }
   
    render(){
        if(this.state.RedirectToAssignMembertoSlot){
            return<Redirect to ={this.state.RedirectToAssignMembertoSlot} Component={AssignMembertoSlot}/>
        }
        if(this.state.RedirectToDeleteAssignMembertoSlot){
            return<Redirect to ={this.state.RedirectToDeleteAssignMembertoSlot} Component={DeleteAssignMembertoSlot}/>
        }
        if(this.state.RedirectToUpdateAssignMembertoSlot){
            return<Redirect to ={this.state.RedirectToUpdateAssignMembertoSlot} Component={UpdateAssignMembertoSlot}/>
        }
        if(this.state.RedirectToCourseCoverage){
            return<Redirect to ={this.state.RedirectToCourseCoverage} Component={CourseCoverage}/>
        }
        if(this.state.RedirectToSlotAssignment){
            return<Redirect to ={this.state.RedirectToSlotAssignment} Component={SlotAssignment}/>
        }
        return(
            <div className="Course">
            <Navbar/>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="/HomeInstructor">Home</a></li>
              
              <li className="breadcrumb-item active text-danger" aria-current="page">Course</li>
            </ol>
          </nav>
            <button style={{alignSelf:"center",marginLeft:550, marginTop:70 }} class="btn btn-primary btn-round"onClick={this.CourseCoverage}>
            <i class="fas fa-sort-amount-up"></i> View Course Coverage
            </button>
    
            <button style={{alignSelf:"center",marginLeft:550, marginTop:70 }} class="btn btn-primary btn-round" onClick={this.SlotAssignment}>
            <i class="fas fa-clipboard-list"></i> View Slot Assignment
            </button>
        
            <button style={{alignSelf:"center",marginLeft:550, marginTop:70  }} class="btn btn-primary btn-round" onClick={this.AssignMembertoSlot}>
            <i class="fas fa-map-marker-alt"></i> assign member to slot
            </button>
            
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown1 "style={{alignSelf:"center",marginLeft:550, marginTop:70 ,marginBottom:200}}>
                <i class="fas fa-edit"></i>  Update slot Assignment
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.UpdateAssignMembertoSlot}>Update</Dropdown.Item>
                   <Dropdown.Item as="button" onClick={this.DeleteAssignMembertoSlot}>Delete</Dropdown.Item> 
                </Dropdown.Menu>
            </Dropdown>
           
            </div>
        )}

}
export default  Course