import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import CourseSlotsC from './CourseSlotsC';
import SlotLinkingC from './SlotLinkingC';
import Navbar from '../NavbarCC';
import {Dropdown} from 'react-bootstrap';
import HomeHOD from '../hod/HODhomepage';
import HomeCI from '../CourseInstructor/HomeInstuctor';
import axios from 'axios';
export default class CoordinatorHomeCont extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            redirectToSlotLinking: null,
            redirectToCourseSlots: null,
            RedirectToHomeAM:null,
            RedirectToHomeCC:null,
            RedirectToHomeCI:null,
            RedirectToHomeHOD:null,
            // Roles:[],
            stateCC:"",
            stateCI:"",
            stateHOD:"",
            DisabledCC:false,
            DisabledCI:false,
            DisabledHOD:false
        };
        this.toSlotLinking = this.toSlotLinking.bind(this);
        this.toCourseSlots = this.toCourseSlots.bind(this);
        
    }
 
    toSlotLinking(event){
        this.setState({redirectToSlotLinking: "/HomeC/SlotLinkingC"});
        event.preventDefault();
    }

    toCourseSlots(event){
        this.setState({redirectToCourseSlots: "HomeC/CourseSlotsC"});
        event.preventDefault();
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
                // Roles:response.data,
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
          
            console.log(response.data);
            console.log(this.state.stateCC)
            console.log(this.state.stateCI)
            console.log(this.state.stateHOD)
            console.log(this.state.DisabledCC)
           console.log(this.state.DisabledCI)
           console.log(this.state.DisabledHOD)
         
         
            
         
        })
          .catch(function (error) {
            console.log(error);
          });

         
                  
                 
     
                
           
            }

   
    render() {
       
        if(this.state.redirectToSlotLinking){
            return <Redirect to={this.state.redirectToSlotLinking} Component={SlotLinkingC}/>
        }
        if(this.state.redirectToCourseSlots){
            return <Redirect to={this.state.redirectToCourseSlots} Component={CourseSlotsC}/>
        }
        if(this.state.RedirectToHomeCI){
            return<Redirect to ={this.state.RedirectToHomeCI} Component={HomeCI}/>
        }
        if(this.state.RedirectToHomeHOD){
            return<Redirect to ={this.state.RedirectToHomeHOD} Component={HomeHOD}/>
        }
        return (
            <div>
           
            <Navbar/>

            <Dropdown>
                <Dropdown.Toggle  id="dropdown1"style={{alignSelf:"center",marginLeft:550, marginTop:70 }}>
                <i class="fas fa-eye"></i>  Navigate 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.HomeAM.bind(this)} >Academic Member</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.HomeCC.bind(this)} disabled="true">Course Coordinator</Dropdown.Item> 
                    <Dropdown.Item as="button" onClick={this.HomeCI.bind(this)} disabled={this.state.DisabledCI}>Course Instructor</Dropdown.Item> 
                    <Dropdown.Item as="button" onClick={this.HomeHOD.bind(this)} disabled={this.state.DisabledHOD}>Head Of Department</Dropdown.Item> 
                </Dropdown.Menu>
            </Dropdown>
                <Button onClick={this.toSlotLinking}>Slotlinking</Button>
                <Button onClick={this.toCourseSlots}>Course Slots</Button>
            </div>
        )
    }
}
