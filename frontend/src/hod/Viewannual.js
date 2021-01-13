import React,{Component} from 'react'
import axios from "axios"
import Navbar from "../NavbarHod"
export default class Viewannualleave extends Component{
    constructor (){
        super();
    
            this.state={
               
             sick:[],
             compensation:[],
             accidental:[],
             maternity:[],
              annual:[]
            };
        }
        componentDidMount =()=>{
axios.get('/viewannualleaverequests',{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
.then ((response)=>{
if(response.data.length>0){
    console.log("dd")
    let temp=[]
    for(let i=0;i<response.data.length;i++){
        temp.push(response.data[i])
    
}
this.setState({
    annual:temp
})}
})
        }
    render(){
        if(this.state.annual.length==0){
          return( <div>                  
            <Navbar/>
          
            <nav aria-label="breadcrumb">
                    <ol className="breadcrumb alert alert-warning">
                      <li className="breadcrumb-item text-warning"><a className="text-warning"href="/HODhomepage">Home page</a></li>
                     
                    </ol>
                  </nav>
          <h1>Annual leave requests</h1>
              <p>No annual leave requests yet</p> </div>)
      
      }
          return(
              <div>
                               
    <Navbar/>
  
  <nav aria-label="breadcrumb">
          <ol className="breadcrumb alert alert-warning">
            <li className="breadcrumb-item text-warning"><a className="text-warning"href="/HODhomepage">Home page</a></li>
           
          </ol>
        </nav>
              <div className="blog-">
                  
  <h1> Annual leave requests:</h1>
  <div>
  <table id="requeststable">
    <thead>
      <tr>
      <th> requester id</th>
        <th>     request id</th>
        <th>     Requested day </th>
        <th>     Requested date </th>
        <th>     Requested month </th>
        <th>     TA to cover </th>
        <th>     acceptance status</th>
      </tr>
    </thead>
    <tbody>
    {this.state.annual.map(request=>
            
                 
      <tr>
        <td>{request.id}</td>
        <td>{request.req_id}</td>
        <td>{request.day}</td>
        <td>{request.date}</td>
        <td>{request.month}</td>
        <td>{request.TAtoCover}</td>
        <td>{request.status}</td>
      </tr>
      
     )}
    </tbody>
                  
                 
   
   
  </table>
  
      
  </div>
  
             </div>
             
              </div>
          )
  }
  
        
        }