import React,{Component} from 'react'
import axios from "axios"
import Navbar from "../NavbarHod"
export default class Viewdayoffrequests extends Component{
    constructor (){
        super();
    
            this.state={
               
              requests:[]
            };
        }
        componentDidMount =()=>{
axios.get('/viewdayoffrequests',{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
.then ((response)=>{
if(response.data.length>0){
    console.log("dd")
    let temp=[]
    for(let i=0;i<response.data.length;i++){
        temp.push(response.data[i])
    
}
this.setState({
        requests:temp
    })
}

//{this.displayBlogPost(this.state.posts)}
//console.log(this.state.requests)
})
        }



        
    render(){
      if(this.state.requests.length==0){
        return( <div>
                             
    <Navbar/>
  
  <nav aria-label="breadcrumb">
          <ol className="breadcrumb alert alert-warning">
            <li className="breadcrumb-item text-warning"><a className="text-warning"href="/HODhomepage">Home page</a></li>
           
          </ol>
        </nav>
        <h1>Day off requests</h1>
            <p>No day off requests yet</p> </div>)
    
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
                
<h1> Day off requests:</h1>
<div>
<table id="requeststable">
  <thead>
    <tr>
    <th> requester id</th>
      <th>     Current day off</th>
      <th>     Requested day off</th>
      <th>     acceptance status</th>
    </tr>
  </thead>
  <tbody>
  {this.state.requests.map(request=>
          
               
    <tr>
      <td>{request.id}</td>
      <td>{request.currentDayoff}</td>
      <td>{request.requestedDayoff}</td>
      <td>{request.acceptanceStatus}</td>
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

