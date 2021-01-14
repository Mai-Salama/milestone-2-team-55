import React,{Component  } from 'react';
import {Button} from "./Button"
import './Button.css'
import { Input } from 'semantic-ui-react'
import Navbar from '../NavbarInstructor'
import axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
toast.configure(); 
class AssignCourseCoordinator extends Component{
    constructor(){
        super();
        this.state={
            facultyname:"",
            departmentid:"",
            courseid:"",
            memberid:""
        }
    }

    handleChange(event){
        this.setState({
           facultyname:event.target.value

        })
    }
    handleChange1(event){
        this.setState({
           departmentid:event.target.value

        })
    }
    handleChange2(event){
        this.setState({
            courseid:event.target.value

        })
    }
   
    handleChange6(event){
        this.setState({
            memberid:event.target.value

        })
    }

    
    AssignCC(){
        toast('Assigned Coordinator ',{position:toast.POSITION.BOTTOM_CENTER});
        const inputdata={
            facultyname:this.state.facultyname,
            departmentid:this.state.departmentid,
            courseid:this.state.courseid,
            coordinatorid:this.state.memberid
        
        
        }
            axios.post("/assigncoursecoordinator",inputdata,{headers:{'x-auth-token':localStorage.getItem('savedToken')
            }}).then(response => {
                
              console.log("course added to T");
        
            })
            this.state.flag=true;
            }   
    
   
    render(){
        return(
            <div className="AssignCourseCoordinator" >
            
            <Navbar/>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="/HomeInstructor">Home</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="/StaffAM">Staff</a></li>

              <li className="breadcrumb-item active text-danger" aria-current="page">Assign Course Coordinator</li>
            </ol>
          </nav>
            <Input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} placeholder=' Faculty Name...' onChange={this.handleChange.bind(this)}/ >
<Input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} placeholder=' Department Id...' onChange={this.handleChange1.bind(this)}/ >
<Input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} placeholder=' Course Id...' onChange={this.handleChange2.bind(this)} / >
<Input style={{alignSelf:"center",marginLeft:550, marginTop:70 }} placeholder=' Academic Member Id...' onChange={this.handleChange6.bind(this)} / >

<button style={{alignSelf:"center",marginLeft:550, marginTop:70 ,marginBottom:200 }} class="btn btn-primary btn-round"onClick={this.AssignCC.bind(this)}>
             Assign
            </button>
           
            </div>
        )}

}
export default  AssignCourseCoordinator
