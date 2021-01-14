import React,{Component  } from 'react';
import {Button} from "./Button"
import './Button.css'
import { Input } from 'semantic-ui-react'
import Navbar from '../NavbarInstructor'
import axios from "axios";
import Modal from 'react-modal';

class CourseCoverage extends Component{
    constructor(){
        super();
        this.state={
            facultyname:"",
            coverage:[],
            statemodal:false

        }
    }
    handleChange(event){
        this.setState({
            facultyname:event.target.value

        })
    }
  
    handleClose(){
      this.setState({
          statemodal:false

      })
  }

    viewCourses=()=>{
      this.setState({
        statemodal:true
      })
        axios.get('/viewcoursecoverageCI', {
            headers:{
'x-auth-token':localStorage.getItem('savedToken')
            },
            params: {
              facultyname: this.state.facultyname,
             
            }
          })
          .then(response => {
            this.setState({
                coverage:response.data
            })
          console.log(this.state.coverage);

        })
          .catch(function (error) {
            console.log(error);
          });
    }


    render(){
        return(
            <div className="ViewCourseCoverage" >
                <Navbar/>
                <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="/HomeInstructor">Home</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="/Course">Course</a></li>
              <li className="breadcrumb-item active text-danger" aria-current="page">Course coverage</li>
            </ol>
          </nav>
                <Modal isOpen={this.state.statemodal} >
              <h2> Courses coverage given by you </h2>
              <div>
                    <table className="table">

                        <thread className="tt">
            <tr>
                <th>coverage</th>
             
                </tr>
                </thread>
                <tbody>
            {this.state.coverage.map((item => 
                <tr>
                    <td> {item} </td>
                 

                    </tr>
                ))}
                    </tbody>
                        </table>
                    </div>

        <button onClick={this.handleClose.bind(this)} >
            close 
            </button>
          </Modal>
           
<Input style={{alignSelf:"center",marginLeft:550, marginTop:70 }} placeholder=' Faculty Name...'  onChange={this.handleChange.bind(this)}/ >

<button style={{alignSelf:"center",marginLeft:550, marginTop:70 ,marginBottom:100 }} class="btn btn-primary btn-round"onClick={this.viewCourses}>
             View
            </button>
          
            </div>
            
            
        )}

}
export default  CourseCoverage