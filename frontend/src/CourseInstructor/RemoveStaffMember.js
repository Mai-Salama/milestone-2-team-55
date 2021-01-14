import React,{Component  } from 'react';
import {Button} from "./Button"
import './Button.css'
import { Input } from 'semantic-ui-react'
import Navbar from '../NavbarInstructor'
import axios from "axios"
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
toast.configure(); 


class RemoveStaffMember extends Component{
    constructor(){
        super();
        this.state={
            facultyname:"",
            departmentid:"",
            memberid:"",
            courseid:"",
            flag:false
        }
    }

   
    handleChange1(event){
        this.setState({
           facultyname:event.target.value

        })
    }
    handleChange2(event){
        this.setState({
            departmentid:event.target.value

        })
    }
    handleChange3(event){
        this.setState({
            memberid:event.target.value

        })
    }
    handleChange4(event){
        this.setState({
            courseid:event.target.value

        })
    }
    removemember(){
        toast('Removed staff memebr',{position:toast.POSITION.BOTTOM_CENTER});
const inputdata={
    courseid:this.state.courseid,
    AMid:this.state.memberid,
    facultyname:this.state.facultyname,
    departmentid:this.state.departmentid
}
    axios.post("/removeassignedAM",inputdata,{headers:{'x-auth-token':localStorage.getItem('savedToken')
    }}).then(response => {
        
      console.log("removed assigned ta ");

    })
    this.state.flag=true;
    }
    render(){
        let isclicked = this.state.flag
        return(
            <div className="RemoveStaffMember" >
                <Navbar/>
                <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="/HomeInstructor">Home</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="/StaffAM">Staff</a></li>

              <li className="breadcrumb-item active text-danger" aria-current="page">Remove Staff Member</li>
            </ol>
          </nav>
           
<Input style={{alignSelf:"center",marginLeft:550, marginTop:70 }} placeholder=' Faculty Name...' onChange={this.handleChange1.bind(this)} / >
<Input style={{alignSelf:"center",marginLeft:550, marginTop:70 }} placeholder=' Department Id...' onChange={this.handleChange2.bind(this)}/ >
<Input style={{alignSelf:"center",marginLeft:550, marginTop:70 }} placeholder=' Course Id...' onChange={this.handleChange4.bind(this)} / >
<Input style={{alignSelf:"center",marginLeft:550, marginTop:70 }} placeholder=' Academic Member Id...' onChange={this.handleChange3.bind(this)} / >

<button style={{alignSelf:"center",marginLeft:550, marginTop:70 ,marginBottom:200 }} class="btn btn-primary btn-round"onClick={this.removemember.bind(this)}>
             Remove
            </button>
            {isclicked ? (
        <h1> Removed TA</h1> 
      ) : (
        <h1></h1>
      )} 
            </div>
        )}

}
export default  RemoveStaffMember