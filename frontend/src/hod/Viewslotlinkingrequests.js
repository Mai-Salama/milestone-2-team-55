import React,{Component} from 'react'
import axios from "axios"
import Navbar from "../NavbarHod"
export default class Viewslotlinkingrequests extends Component{
    constructor (){
        super();
    
            this.state={
               
              requests:[]
            };
        }
        componentDidMount =()=>{
axios.get('/viewslotlinkingrequests',{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
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
            <h1>Slot linking requests</h1>
                <p>No slot linking requests yet</p> </div>)
        
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
                
<h1> Your slot linking requests are:</h1>
<div>
<table id="requeststable">
  <thead>
    <tr>
    <th> request id</th>
      <th>     Requested day</th>
      <th>    requested slot number</th>
      <th>    request acceptance status</th>
    </tr>
  </thead>
  <tbody>
  {this.state.requests.map(request=>
          
               
    <tr>
      <td>{request.id}</td>
      <td>{request.requestedDay}</td>
      <td>{request.slotNumber}</td>
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

