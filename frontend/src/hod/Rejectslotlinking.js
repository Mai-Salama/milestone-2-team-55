import React,{Component} from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import Navbar from "../NavbarHod"
export default class Rejectslotlinking extends Component{
    constructor(props){
        super(props)
        this.onChangeid=this.onChangeid.bind(this)
        this.onChangefaculty=this.onChangefaculty.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
        this.state={
            requesterid:"",
            facultyname:"",
           
            requests:[]
        }
    }
    onChangeid(e){
        this.setState({
           requesterid:e.target.value //this takes input from user and puts it here
           
        })
    }
    onChangefaculty(e){
        this.setState({
           facultyname:e.target.value //this takes input from user and puts it here
           
        })
    }
      
       
    onSubmit(e)
    {
        e.preventDefault();
        //console.log(this.state.dayoff)
        const request={
            
            requesterid:this.state.requesterid,
            facultyname:this.state.facultyname
        }

       // console.log(dayoffc)
        axios.post('/rejectslotlinking',request,{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
        .then(res=>console.log(res.data)).catch((error)=>{
            console.log(error)
        });
       window.location='/Submitted' //will make him go to this page after submitting
    }
    render(){
        return(
            <div>
                    <Navbar/>
  
  <nav aria-label="breadcrumb">
          <ol className="breadcrumb alert alert-warning">
            <li className="breadcrumb-item text-warning"><a className="text-warning"href="/HODhomepage">Home page</a></li>
           
          </ol>
        </nav>
<h1>Reject slot linking request</h1>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
             
                <input
                type="text"
                className="form-control"
                value={this.state.facultyname}
                onChange={this.onChangefaculty}
                placeholder="Enter faculty name  "/>
                </div>
                <div className="form-group">
               
                <input
                type="text"
                className="form-control"
                value={this.state.requesterid}
                onChange={this.onChangeid}
                placeholder="Enter requester id "/>
                </div>

             


                <div className="form-group">
                    <input id="add"type="submit" value= "Reject slotlinking request" className="btn btn-primary"/>

                </div>
                </form>
            </div>
        )
    }
}