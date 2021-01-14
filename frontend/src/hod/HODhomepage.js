import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, DropdownButton, Dropdown} from 'react-bootstrap'
import {Redirect} from 'react-router-dom' 
import Navbar from "../NavbarHod"
import Viewstaff from "./Viewstaff"
import Viewstaffbycourse from "./Viewstaffbycourse"
import Viewstaffdayoff from "./Viewstaffdayoff"
import ViewcoursecoverageHOD from "./ViewcoursecoverageHOD"
import Viewsinglestaffdayoff from "./Viewsinglestaffdayoff"
import Viewcourseassignment from "./Viewcourseassignment"
import AssignCI from "./Assigncourseinstructor"
import UpdateCI from "./Updatecourseinstructor"
import DeleteCI from "./Deletecourseinstructor"
import Acceptdayoff from "./Acceptdayoff"
import Rejectdayoff from "./Rejectdayoff"
import viewdayoffrequests from "./Viewdayoffrequests"
import viewreplacement from "./Viewreplacementrequests"
import Acceptreplacement from "./Acceptreplacement"
import Rejectreplacement from "./Rejectreplacement"
import Viewreplacementrequests from './Viewreplacementrequests'
import Acceptslotlinking from "./Acceptslotlinking"
import Rejectslotlinking from "./Rejectslotlinking"
import Viewslotlinkingrequests from "./Viewslotlinkingrequests"
import AcceptAccidentalLeaveHOD from "./AcceptAccidentalLeaveHOD"
import RejectAccidentalLeaveHOD from "./RejectAccidentalLeaveHOD"
import AcceptAnnualLeaveHOD from "./AcceptAnnualLeaveHOD"
import RejectAnnualLeaveHOD from "./RejectAnnualLeaveHOD"
import RejectCompensationLeaveHOD from "./RejectCompensationLeaveHOD"
import AcceptCompensationLeaveHOD from "./AcceptCompensationLeaveHOD"
import Viewsickleave from "./Viewsickleave"
 import Viewannual from "./Viewannual"
import Viewaccidental from "./Viewaccidental"
 import Viewmaternity from "./Viewmaternity"
 import Viewcompensation from "./Viewcompensation"
 import HomeCI from '../CourseInstructor/HomeInstuctor';
import axios from 'axios';
import HomeCC from '../CourseCoordinator/CoordinatorHomeCont';


export default class HODhomepage extends Component{
    constructor(props){
        super(props)
        this.state={
            rviewstaff:null,
            rviewstaffbycourse:null,
            rviewstaffdayoff:null,
            rviewsinglestaffdayoff:null,
            rassignCI:null,
            rupdateCI:null,
            rdeleteCI:null,
            rviewdayoff:null,
            racceptdayoff:null,
            rrejectdayoff:null,
            rviewreplacement:null,
            racceptreplacement:null,
            rrejectreplacement:null,
            rviewslotlinking:null,
            racceptslotlinking:null,
            rrejectslotlinking:null,
            racceptaccidental:null,
            rrejectaccidental:null,
            racceptannual:null,
            rrejectannual:null,
            racceptcompensation:null,
            rrejectcompensation:null,

            rsick:null,
            rcompensation:null,
            rannual:null,
            raccidental:null,
            rannual:null,

            RedirectToHomeAM:null,
            RedirectToHomeCC:null,
            RedirectToHomeCI:null,
            RedirectToHomeHOD:null,
            stateCC:"",
            stateCI:"",
            stateHOD:"",
            DisabledCC:false,
            DisabledCI:false,
            DisabledHOD:false



        }
        this.toviewstaff=this.toviewstaff.bind(this)
        this.toviewstaffbycourse=this.toviewstaffbycourse.bind(this)
        this.toviewstaffdayoff=this.toviewstaffdayoff.bind(this)
        this.toviewsinglestaffdayoff=this.toviewsinglestaffdayoff.bind(this)
        this.toassignCI=this.toassignCI.bind(this)
        this.toupdateCI=this.toupdateCI.bind(this)
        this.todeleteCI=this.todeleteCI.bind(this)
        this.toviewdayoff=this.toviewdayoff.bind(this)
        this.toacceptdayoff=this.toacceptdayoff.bind(this)
        this.torejectdayoff=this.torejectdayoff.bind(this)
        this.toviewreplacement=this.toviewreplacement.bind(this)
        this.toacceptreplacement=this.toacceptreplacement.bind(this)
        this.torejectreplacement=this.torejectreplacement.bind(this)
        this.toviewslotlinking=this.toviewslotlinking.bind(this)
        this.toacceptslotlinking=this.toacceptslotlinking.bind(this)
        this.torejectslotlinking=this.torejectslotlinking.bind(this)
        this.toacceptaccidental=this.toacceptaccidental.bind(this)
        this.torejectaccidental=this.torejectaccidental.bind(this)
        this.toacceptannual=this.toacceptannual.bind(this)
        this.torejectannual=this.torejectannual.bind(this)
        this.toacceptcompensation=this.toacceptcompensation.bind(this)
        this.torejectcompensation=this.torejectcompensation.bind(this)
        this.toviewsick=this.toviewsick.bind(this)
        this.toviewcompensation=this.toviewcompensation.bind(this)
        this.toviewaccidental=this.toviewaccidental.bind(this)
        this.toviewannual=this.toviewannual.bind(this)
        this.toviewmaternity=this.toviewmaternity.bind(this)
    }
    
    toviewstaff(event){
        this.setState({
            rviewstaff:"/Viewstaff"
        })
        event.preventDefault()
    }
    toviewstaffbycourse(event){
        this.setState({
            rviewstaffbycourse:"/Viewstaffbycourse"
        })
        event.preventDefault()
    }
    toviewstaffdayoff(event){
        this.setState({
            rviewstaffdayoff:"/Viewstaffdayoff"
        })
        event.preventDefault()
    }
    toviewsinglestaffdayoff(event){
        this.setState({
            rviewsinglestaffdayoff:"/Viewsinglestaffdayoff"
        })
        event.preventDefault()
    }
    toassignCI(event){
        this.setState({
            rassignCI:"/Assigncourseinstructor"
        })
        event.preventDefault()
    }
    toupdateCI(event){
        this.setState({
            rupdateCI:"/Updatecourseinstructor"
        })
        event.preventDefault()
    }
    todeleteCI(event){
        this.setState({
            rdeleteCI:"/Deletecourseinstructor"
        })
        event.preventDefault()
    }
    toviewdayoff(event){
        this.setState({
            rviewdayoff:"/Viewdayoffrequests"
        })
        event.preventDefault()
    }
    toacceptdayoff(event){
        this.setState({
            racceptdayoff:"/Acceptdayoff"
        })
        event.preventDefault()
    }
    torejectdayoff(event){
        this.setState({
            rrejectdayoff:"/Rejectdayoff"
        })
        event.preventDefault()
    }
    toviewreplacement(event){
        this.setState({
            rviewreplacement:"/Viewreplacementrequests"
        })
        event.preventDefault()
    }
    toacceptreplacement(event){
        this.setState({
            racceptreplacement:"/Acceptreplacement"
        })
        event.preventDefault()
    }
    torejectreplacement(event){
        this.setState({
            rrejectreplacement:"/Rejectreplacement"
        })
        event.preventDefault()
    }
    toviewslotlinking(event){
        this.setState({
            rviewslotlinking:"/Viewslotlinkingrequests"
        })
        event.preventDefault()
    }
    toacceptslotlinking(event){
        this.setState({
            racceptslotlinking:"/Acceptslotlinking"
        })
        event.preventDefault()
    }
    torejectslotlinking(event){
        this.setState({
            rrejectslotlinking:"/Rejectslotlinking"
        })
        event.preventDefault()
    }
    toacceptaccidental(event){
        this.setState({
            racceptaccidental:"/AcceptAccidentalLeaveHOD"
        })
        event.preventDefault()
    }
    torejectaccidental(event){
        this.setState({
            rrejectaccidental:"/RejectAccidentalLeaveHOD"
        })
        event.preventDefault()
    }
    toacceptannual(event){
        this.setState({
            racceptannual:"/AcceptAnnualLeaveHOD"
        })
        event.preventDefault()
    }
    torejectannual(event){
        this.setState({
            racceptannual:"/RejectAnnualLeaveHOD"
        })
        event.preventDefault()
    }
    toacceptcompensation(event){
        this.setState({
            racceptcompensation:"/AcceptCompensationLeaveHOD"
        })
        
        event.preventDefault()
    }
    torejectcompensation(event){
        this.setState({
            rrejectcompensation:"/RejectCompensationLeaveHOD"
        })
        event.preventDefault()
    }
    onSubmitcov(e)
    {
        e.preventDefault();
        window.location='/ViewcoursecoverageHOD'
    }
    onSubmita(e)
    {
        console.log("dddd")
        e.preventDefault();
        window.location='/Viewcourseassignment'
    }
    toviewsick(event){
        this.setState({
            rsick:"/Viewsickleave"
        })
        event.preventDefault()
    }
    toviewcompensation(event){
        this.setState({
            rcompensation:"/Viewcompensation"
        })
        event.preventDefault()
    }
    toviewannual(event){
        this.setState({
            rannual:"/Viewannual"
        })
        event.preventDefault()
    }
    toviewmaternity(event){
        this.setState({
            rmaternity:"/Viewmaternity"
        })
        event.preventDefault()
    }
    toviewaccidental(event){
        this.setState({
            raccidental:"/Viewaccidental"
        })
        event.preventDefault()
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
          //console.log(this.state.Roles);

        })
          .catch(function (error) {
            console.log(error);
          });

        
    }

    render(){
      
        if(this.state.RedirectToHomeCC){
            return<Redirect to ={this.state.RedirectToHomeCC} Component={HomeCC}/>
        }
        if(this.state.RedirectToHomeCI){
            return<Redirect to ={this.state.RedirectToHomeCI} Component={HomeCI}/>
        }
        if(this.state.rviewstaff){
            return(<Redirect to ={this.state.rviewstaff} Component {...Viewstaff}/>)
        }
      else if(this.state.rviewstaffbycourse){
            return(<Redirect to ={this.state.rviewstaffbycourse} Component {...Viewstaffbycourse}/>)
        }
       else if(this.state.rviewstaffdayoff){
            return(<Redirect to ={this.state.rviewstaffdayoff} Component {...Viewstaffdayoff}/>)
        }
      else  if(this.state.rviewsinglestaffdayoff){
            return(<Redirect to ={this.state.rviewsinglestaffdayoff} Component {...Viewsinglestaffdayoff}/>)
        }
        else if(this.state.rassignCI){
            return(<Redirect to ={this.state.rassignCI} Component {...AssignCI}/>)
        }
       else if(this.state.rupdateCI){
            return(<Redirect to ={this.state.rupdateCI} Component {...UpdateCI}/>)
        }
      else  if(this.state.rviewdayoff){
            return(<Redirect to ={this.state.rviewdayoff} Component {...viewdayoffrequests}/>)
        }
        else  if(this.state.racceptdayoff){
            return(<Redirect to ={this.state.racceptdayoff} Component {...Acceptdayoff}/>)
        }
        else  if(this.state.rrejectdayoff){
            return(<Redirect to ={this.state.rrejectdayoff} Component {...Rejectdayoff}/>)
        }
        else  if(this.state.rviewreplacement){
            return(<Redirect to ={this.state.rviewreplacement} Component {...viewreplacement}/>)
        }
        else  if(this.state.racceptreplacement){
            return(<Redirect to ={this.state.racceptreplacement} Component {...Acceptreplacement}/>)
        }
        else  if(this.state.rrejectreplacement){
            return(<Redirect to ={this.state.rrejectreplacement} Component {...Rejectreplacement}/>)
        }
        else  if(this.state.rviewslotlinking){
            return(<Redirect to ={this.state.rviewslotlinking} Component {...Viewslotlinkingrequests}/>)
        }
        else  if(this.state.racceptslotlinking){
            return(<Redirect to ={this.state.racceptslotlinking} Component {...Acceptslotlinking}/>)
        }
        else  if(this.state.rrejectslotlinking){
            return(<Redirect to ={this.state.rrejectslotlinking} Component {...Rejectslotlinking}/>)
        }
        else  if(this.state.racceptaccidental){
            return(<Redirect to ={this.state.racceptaccidental} Component {...AcceptAccidentalLeaveHOD}/>)
        }
        else  if(this.state.rrejectaccidental){
            return(<Redirect to ={this.state.rrejectaccidental} Component {...RejectAccidentalLeaveHOD}/>)
        }
        else  if(this.state.racceptannual){
            return(<Redirect to ={this.state.racceptannual} Component {...AcceptAnnualLeaveHOD}/>)
        }
        else  if(this.state.rrejectannual){
            return(<Redirect to ={this.state.rrejectannual} Component {...RejectAnnualLeaveHOD}/>)
        }
        else  if(this.state.racceptcompensation){
            return(<Redirect to ={this.state.racceptcompensation} Component {...AcceptCompensationLeaveHOD}/>)
        }
        else  if(this.state.rrejectcompensation){
            return(<Redirect to ={this.state.rrejectcompensation} Component {...RejectCompensationLeaveHOD}/>)
        }

        


        else  if(this.state.rsick){
            return(<Redirect to ={this.state.rsick} Component {...Viewsickleave}/>)
        }
        else  if(this.state.rcompensation){
            return(<Redirect to ={this.state.rcompensation} Component {...Viewcompensation}/>)
        }
        else  if(this.state.rannual){
            return(<Redirect to ={this.state.rannual} Component {...Viewannual}/>)
        }
        else  if(this.state.raccidental){
            return(<Redirect to ={this.state.raccidental} Component {...Viewaccidental}/>)
        }
        else  if(this.state.rmaternity){
            return(<Redirect to ={this.state.rmaternity} Component {...Viewmaternity}/>)
        }
        else{
        return(
           
            <div >
                 <Navbar/>
                <h1>Welcome to your home page</h1>



                <Dropdown>
                <Dropdown.Toggle  id="dropdown1"style={{alignSelf:"center",marginLeft:550, marginTop:70 }}>
                <i class="fas fa-eye"></i>  Navigate 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.HomeAM.bind(this)} >Academic Member</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.HomeCC.bind(this)} disabled={this.state.DisabledCC}>Course Coordinator</Dropdown.Item> 
                    <Dropdown.Item as="button" onClick={this.HomeCI.bind(this)} disabled={this.state.DisabledCC}>Course Instructor</Dropdown.Item> 
                    <Dropdown.Item as="button" onClick={this.HomeHOD.bind(this)} disabled="true">Head Of Department</Dropdown.Item> 
                </Dropdown.Menu>
            </Dropdown>
        <Dropdown class ="middle">
                <Dropdown.Toggle variant="primary" id="drop">
                    Your Staff 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.toviewstaff}>View your department's staff</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.toviewstaffbycourse}>View staff by a course</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.toviewstaffdayoff}>View your staff dayoff</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.toviewsinglestaffdayoff}>View a single staff's dayoff</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>
            &nbsp;&nbsp;&nbsp;
            <form onClick={this.onSubmitcov}>
            <input id="button" type="submit" value= "View course coverage" className="btn btn-primary"/>
            </form>
            &nbsp;&nbsp;&nbsp;
            <form onClick={this.onSubmita}>
            <input id="button" type="submit" value= "View teaching assignment" className="btn btn-primary"/>
            </form>
            &nbsp;&nbsp;&nbsp;
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="drop">
                   Edit Course Instructors 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.toassignCI}>Assign course instructor</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.toupdateCI}>Update course instructor</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.todeleteCI}>Delete course instructor</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            &nbsp;&nbsp;&nbsp;
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="drop">
                   View requests 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.toviewdayoff}>Dayoff request</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.toviewreplacement}>replacement request</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.toviewslotlinking}>slotlinking request</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.toviewsick}>Sick leave request</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.toviewcompensation}>compensation leave request</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.toviewannual}>annual leave request</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.toviewaccidental}>accidental leave request</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.toviewmaternity}>maternity leave request</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>

            &nbsp;&nbsp;&nbsp;
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="drop">
                   accept requests 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.toacceptdayoff}>Dayoff request</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.toacceptreplacement}>replacement request</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.toacceptslotlinking}>slotlinking request</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.toacceptaccidental}>accidental request</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.toacceptannual}>annual request</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.toacceptcompensation}>compensation request</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            &nbsp;&nbsp;&nbsp;
            <Dropdown >
                <Dropdown.Toggle variant="primary" id="drop">
                   Reject requests 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.torejectdayoff}>Dayoff request</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.torejectreplacement}>replacement request</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.torejectslotlinking}>slotlinking request</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.torejectaccidental}>accidental request</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.torejectannual}>annual request</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.torejectcompensation}>compensation request</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
           
            

       
       
        )
        }
    }
}