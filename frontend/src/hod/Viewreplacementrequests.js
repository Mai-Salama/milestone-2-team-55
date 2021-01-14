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
      <th>     Requested date</th>
      <th>    requested slot number</th>
      <th>    TA to replace</th>
      <th>    request acceptance status</th>
    </tr>
  </thead>
  <tbody>
  {this.state.requests.map(request=>
          
               
    <tr>
      <td>{request.id}</td>
     
      <td>{request.requestedDate}</td>
      <td>{request.slotNumber}</td>
      <td>{request.TAtoreplace}</td>
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

