import React,{Component  } from 'react';
import {Button} from "./Button"
import './Button.css'
import { Input } from 'semantic-ui-react'
import Navbar from '../NavbarInstructor'
import axios from "axios";

 import Modal from 'react-modal';

class SlotAssignment extends Component{
    constructor(){
        super();
        this.state={
            facultyname:"",
            departmentid:"",
            courseid:"",
            statemodal:false,
           assignment:[]
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
    handleClose(){
        this.setState({
            statemodal:false

        })

    }
    

    
   SlotAssignment(){
  
        const inputdata={
            facultyname:this.state.facultyname,
            departmentid:this.state.departmentid,
            courseid:this.state.courseid,
            
        
        
        }
        axios.get('/viewslotsassignment', {
            headers:{
'x-auth-token':localStorage.getItem('savedToken')
            },
            params: {
              facultyname: this.state.facultyname,
              departmentid:this.state.departmentid,
              courseid:this.state.courseid
             
            }
          })
          .then(response => {
            this.setState({
                assignment:response.data
            })
          console.log(this.state.assignment);

        })
          .catch(function (error) {
            console.log(error);
          });
          this.setState({
              statemodal:true
          })
         
            
        }   

      
    
   
    render(){
        return(
            <div className="AssignCourseCoordinator" >
            
            <Navbar/>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="/HomeInstructor">Home</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="/Course">Course</a></li>

              <li className="breadcrumb-item active text-danger" aria-current="page">View Slot Assignment</li>
            </ol>
          </nav>
                <Modal isOpen={this.state.statemodal} >
              <h2> Your slot assignments  </h2>
              <div>
                    <table className="table">

                        <thread className="tt">
            <tr>
                <th >Timing</th>
                <th>Course</th>
                <th>Location</th>
               
                </tr>
                </thread>
                <tbody>
            {this.state.assignment.map((item => 
                <tr >
                    <td> {item.timing} </td>
                    <td> {item.course} </td>
                    <td> {item.location} </td>

                    </tr>
                ))}
                    </tbody>
                        </table>
                    </div>

        <button onClick={this.handleClose.bind(this)} >
            close 
            </button>
          </Modal>
            <Input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} placeholder=' Faculty Name...' onChange={this.handleChange.bind(this)}/ >
<Input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} placeholder=' Department Id...' onChange={this.handleChange1.bind(this)}/ >
<Input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} placeholder=' Course Id...' onChange={this.handleChange2.bind(this)} / >

<button style={{alignSelf:"center",marginLeft:550, marginTop:70 ,marginBottom:200 }} class="btn btn-primary btn-round"onClick={this.SlotAssignment.bind(this)}>
             View
            </button>
           
            </div>
        )}

}
export default  SlotAssignment
