import React,{Component  } from 'react';
import {Button} from "./Button"
import './Button.css'
import { Input } from 'semantic-ui-react'
import Navbar from '../NavbarInstructor';
import axios from 'axios';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
toast.configure(); 

class AddStaffMember extends Component{
    constructor(){
        super();
        this.state={
            courseid:"",
            memberid:"",
            flag:false
        }
    }

   
    handleChange1(event){
        this.setState({
           courseid:event.target.value

        })
    }
    handleChange2(event){
        this.setState({
            memberid:event.target.value

        })
    }
  
    addmember(){
        toast('Added Member ',{position:toast.POSITION.BOTTOM_CENTER});
        this.state.flag=true;
const inputdata={
    courseid:this.state.courseid,
    TAid:this.state.memberid
}

    axios.post("/assignTAs",inputdata,{headers:{'x-auth-token':localStorage.getItem('savedToken')
    }}).then(response => {
        
      console.log("course added to T");

    })
  
    
    }
        
    
    render(){
       
        return(
            <div className="AddStaffMember" >
            
            <Navbar/>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="/HomeInstructor">Home</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="/StaffAM">Staff</a></li>

              <li className="breadcrumb-item active text-danger" aria-current="page">Add Staff Member</li>
            </ol>
          </nav>
<Input style={{alignSelf:"center",marginLeft:550, marginTop:70 }} placeholder=' Course Id...' onChange={this.handleChange1.bind(this)}/ >
<Input style={{alignSelf:"center",marginLeft:550, marginTop:70 }} placeholder=' Academic Member Id...' onChange={this.handleChange2.bind(this)}/ >

<button style={{alignSelf:"center",marginLeft:550, marginTop:70 ,marginBottom:200 }} class="btn btn-primary btn-round"onClick={this.addmember.bind(this) }>
             Add
            </button>

           
                     
            </div>
        )}

}
export default  AddStaffMember