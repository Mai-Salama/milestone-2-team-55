import React,{Component} from 'react'
import axios from "axios"
import Navbar from "../NavbarHod"
export default class Viewmaternityleave extends Component{
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
axios.get('/viewmaternityleaverequests',{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
.then ((response)=>{
if(response.data.length>0){
    console.log(response.data)
    let temp=[]
    for(let i=0;i<response.data.length;i++){
        temp.push(response.data[i])
    
}
this.setState({
    maternity:temp
})}
})

        }
    render(){
        if(this.state.maternity.length==0){
          return( <div>
                          
    <Navbar/>
  
  <nav aria-label="breadcrumb">
          <ol className="breadcrumb alert alert-warning">
            <li className="breadcrumb-item text-warning"><a className="text-warning"href="/HODhomepage">Home page</a></li>
           
          </ol>
        </nav>
          <h1>Maternity leave requests</h1>
              <p>No Maternity leave requests yet</p> </div>)
      
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
                  
  <h1> Maternity requests:</h1>
  <div>
  <table id="requeststable">
    <thead>
      <tr>
      <th> requester id</th>
      <th> request id</th>
        <th>     from day </th>
        <th>    to day</th>
        <th>  month</th>
        <th>    reason </th>
        <th>    document</th>
       

        <th>     acceptance status</th>
      </tr>
    </thead>
    <tbody>
    {this.state.maternity.map(request=>
            
                 
      <tr>
        <td>{request.id}</td>
        <td>{request.re_id}</td>
        <td>{request.dayFrom}</td>
        <td>{request.dayTo}</td>
        <td>{request.monthTo}</td>
        <td>{request.reason}</td>
        <td>{request.document}</td>
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