import React,{Component} from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import Navbar from "../NavbarHod"
export default class AcceptSickLeaveHOD extends Component{
    constructor(props){
        super(props)
        this.onChangeid=this.onChangeid.bind(this)
     
        this.onSubmit=this.onSubmit.bind(this)
        this.state={
            AMid:"",
          
           
            requests:[]
        }
    }
    onChangeid(e){
        this.setState({
           AMid:e.target.value //this takes input from user and puts it here
           
        })
    }
   
 
       
       
    onSubmit(e)
    {
        e.preventDefault();
        //console.log(this.state.dayoff)
        const request={
            
            AMid:this.state.AMid,
           
           
        }

       // console.log(dayoffc)
        axios.post('/acceptdayoff',request,{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
        .then(res=>console.log(request)).catch((error)=>{
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
                <p>
<h1>Accept change day off request</h1>
                </p>
                <form onSubmit={this.onSubmit}>
              
                
             
                <div className="form-group">
                <label>
                   
                </label>
                
                <input
                type="text"
                className="form-control"
                value={this.state.AMid}
                onChange={this.onChangeid}
                placeholder="Enter requester id"/>
                </div>

             

                <div className="form-group">
                    <input id="add" type="submit" value= "Accept change day off request" className="btn btn-primary"/>

                </div>
                </form>
            </div>
        )
    }
}