import React,{Component} from 'react'
import axios from "axios"
import Navbar from "../NavbarHod"
export default class Viewreplacementrequests extends Component{
    constructor (){
        super();
    
            this.state={
               
              requests:[]
            };
        }
        componentDidMount =()=>{
axios.get('/viewreplacement',{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
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
console.log(this.state.requests)
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
            <h1>Replacement requests</h1>
                <p>No replacement requests yet</p> </div>)
        
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
                
<h1> replacement requests are:</h1>
<div>
<table id="requeststable">
  <thead>
    <tr>
    <th> request id</th>
      <th>     Reciever id</th>
      <th>     Requested day</th>
      <th>     Requested timing</th>
      <th>    requested course</th>
      <th>    requested location</th>
      <th>    request acceptance status</th>
    </tr>
  </thead>
  <tbody>
  {this.state.requests.map(request=>
          
               
    <tr>
      <td>{request.id}</td>
      <td>{request.receiver_id}</td>
      <td>{request.day}</td>
      <td>{request.timing}</td>
      <td>{request.course}</td>
      <td>{request.location}</td>
      <td>{request.request_status}</td>
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

