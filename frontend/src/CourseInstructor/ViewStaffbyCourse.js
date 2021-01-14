import React,{Component  } from 'react';
import {useState} from 'react';
import styled from "styled-components";




import {Button} from "./Button"
import './Button.css'
import { Input } from 'semantic-ui-react'
import Navbar from '../NavbarInstructor'
import axios from 'axios';
import Modal from 'react-modal';

const Container = styled.div`
    display:flex;
    align-text:center;
    justify-content:center;
    align-items:center;
    height:100vh;

`


class ViewStaffbyCourse extends Component{
  
    constructor(){
        super();
        this.state={
            facultyname:"",
            departmentname:"",
            courseid:"",
            TAs:[],
            statemodal:false

        }
    }
    handleChange(event){
        this.setState({
            facultyname:event.target.value

        })
    }
    handleChange1(event){
        this.setState({
            departmentname:event.target.value

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
    viewCourses=()=>{
        axios.get('/instviewstaffbycourse', {
            headers:{
'x-auth-token':localStorage.getItem('savedToken')
            },
            params: {
              facultyname: this.state.facultyname,
              department_name:this.state.departmentname,
              courseid:this.state.courseid
            }
          })
          .then(response => {
            this.setState({
                TAs:response.data
            })
          console.log(this.state.TAs);

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
            <div className="ViewStafbyCourse" >
                <Navbar/>
                <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="/HomeInstructor">Home</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="/StaffAM">Staff</a></li>

              <li className="breadcrumb-item active text-danger" aria-current="page">View Staff per Course </li>
            </ol>
          </nav>
                <Modal isOpen={this.state.statemodal} >
              <h2> Staff per course </h2>
              <div>
                    <table className="table">

                        <thread className="tt">
            <tr>
                <th>Name</th>
               
                <th>Id</th>
                <th>Office</th>
                <th>Email</th>
                <th>Day off</th>
                </tr>
                </thread>
                <tbody>
            {this.state.TAs.map((item => 
                <tr>
                    <td> {item.name} </td>
                    <td> {item.id} </td>
                    <td> {item.office} </td>
                    <td> {item.email} </td>
                    <td> {item.dayoff} </td>

                    </tr>
                ))}
                    </tbody>
                        </table>
                    </div>

        <button onClick={this.handleClose.bind(this)} >
            close 
            </button>
          </Modal>
<Input style={{alignSelf:"center",marginLeft:550, marginTop:70 }} placeholder=' Faculty Name...' onChange={this.handleChange.bind(this)}/ >
<Input style={{alignSelf:"center",marginLeft:550, marginTop:70 }} placeholder=' Department Name...' onChange={this.handleChange1.bind(this)}/ >
<Input style={{alignSelf:"center",marginLeft:550, marginTop:70 }} placeholder=' Course Id...' onChange={this.handleChange2.bind(this)}/ >

<button style={{alignSelf:"center",marginLeft:550, marginTop:70 ,marginBottom:200 }} class="btn btn-primary btn-round"onClick={this.viewCourses}>
             View
            </button>
           
        

            </div>
        )}

}
export default  ViewStaffbyCourse