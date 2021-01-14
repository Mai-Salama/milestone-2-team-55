import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../NavbarAM'


export default class Replacement extends Component {
    constructor(props){
        super(props)
   this.state={
        receiver_id:"",
        day:"",
        slot:"",
        timing:"",
        course:"",
        location:"",
            
        }
       
    
}
handleChange(event){
    this.setState({
        receiver_id:event.target.value,
    })
}
handleChange1(event){
    this.setState({
        day:event.target.value,
    })
}
handleChange2(event){
    this.setState({
        slot:event.target.value,
    })
}
handleChange3(event){
    this.setState({
        timing:event.target.value,
    })
}
handleChange4(event){
    this.setState({
        course:event.target.value,
    })
}
handleChange5(event){
    this.setState({
        location:event.target.value,
    })
}

submitrequest=(event)=>{
    const inputData={
    receiver_id:this.state.receiver_id,
    day:this.state.day,
    slot:this.state.slot,
    timing:this.state.timing,
    course:this.state.course,
    location:this.state.location,
    }
    axios.post('/sendreplacement',inputData,{headers:{
        'x-auth-token':localStorage.getItem('savedToken')
    }
    
       
    
             })
      .then (response =>{
       
        console.log(this.state.timing)
      
      })
      console.log(this.state.timing)
    //  .catch(function (error) {
    //      console.log(error)
         
    //  })
}
 
  
    
    

render(){
    // if(this.state.redirectToViewprofile){
    //     return<Redirect to={this.state.redirectToViewprofile} Component={Viewprofile}/>
    // }
   
      
        return(
           
 <div class="text-left ">

     <Navbar/>
 <form>
<h2>Replacement Request</h2>

{/* //<label class="Replacementmargin" for="receiver_id">Ta_Id:</label> */}

<label  class="Replacementmargin">
                Receiver_id:
                <input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="receiver_id" type="text" receiver_id={this.state.receiver_id} onChange={this.handleChange.bind(this)}/>
               Days: 
                <input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="day" type="text" day={this.state.day} onChange={this.handleChange1.bind(this)}/>
                Slot: 
                <input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="slot" type="text" slot={this.state.slot} onChange={this.handleChange2.bind(this)}/>
                Timing: 
                <input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="timing" type="text" timing={this.state.timing} onChange={this.handleChange3.bind(this)}/>
                Course: 
                <input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="course" type="text" course={this.state.course} onChange={this.handleChange4.bind(this)}/>
                Location: 
                <input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="location" type="text" location={this.state.location} onChange={this.handleChange5.bind(this)}/>
            </label>




</form>
<button onClick={this.submitrequest} type="button" id="submit">Submit</button>
          </div>
         
        
        )
    }

}




