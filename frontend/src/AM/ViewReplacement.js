import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../NavbarAM';

export default class ViewReplacement extends Component {
    constructor(props){
        super(props)
   this.state={
    requests:[]
        }
       
    
}

componentDidMount=()=>{
    console.log("entered method");
    axios.get('/viewreplacement2', {
        headers:{
'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTIiLCJlbWFpbCI6InlhaGlhLmFobWVkQGd1Yy5lZHUuZWciLCJyb2xlIjoiQU0iLCJpYXQiOjE2MDg4OTc5OTl9.Mp_dzPaurv9NtOFO5k3Ph5bAvpBfhjelngiVPgpALgE'
        },
        
      })
      .then(response => {
          console.log(response.data.rep);
        this.setState({
          
            requests:response.data.rep
        })
        console.log("hiii")
    })
 
      .catch(function (error) {
        console.log(error);
      });
     
}

render() {
    return (
      
       
      <div> 
      <Navbar/>

      <a href="www.mypage.com" onclick="window.history.go(-1); return false;"> Go to previous </a>

<script>
function goBack() {
  window.history.back()
}
</script>

   
<table className="table">

    <thread className="tt">
<tr>
<th>Name</th>

<th>Id</th>
<th>Office</th>
<th>Email</th>
<th>Day off</th>
</tr>
</thread>
<tbody>
{this.state.requests.map((item => 
<tr>
<td> {item.id} </td>
<td> {item.receiver_id} </td>
<td> {item.day} </td>
<td> {item.timing} </td>
<td> {item.course} </td>
<td> {item.location} </td>
<td> {item.request_status} </td>
</tr>
 ))}
</tbody>
    </table>
</div>
    );
  }

}