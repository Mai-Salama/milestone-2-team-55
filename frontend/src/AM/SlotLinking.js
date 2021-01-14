import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../NavbarAM';


export default class SlotLinking extends Component {
    constructor(props){
        super(props)
   this.state={

    requestedDay:'',
    slotNumber:'',
    facultyname:'',
    department:''
    
        }
       
    
}
handleChange(event){
    this.setState({
        requestedDay:event.target.value,
    })
}
handleChange1(event){
    this.setState({
        slotNumber:event.target.value,
    })
}
handleChange2(event){
    this.setState({
     facultyname:event.target.value,
    })
}

handleChange3(event){
    this.setState({
        department:event.target.value,
    })
}




submitrequest=(event)=>{
    const inputData={

        requestedDay:this.state.requestedDay,
        slotNumber:this.state.slotNumber,
        facultyname:this.state.facultyname,
        department:this.state.department,
    
    }
    axios.post('/slotlinkingrequest',inputData,{headers:{
        'x-auth-token':localStorage.getItem('savedToken')
    }
    
       
    
             })
      .then (response =>{
       
        console.log(this.state.department)
      
      })
      
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
<h2>Slot Linking</h2>

{/* //<label class="Replacementmargin" for="receiver_id">Ta_Id:</label> */}

<label  class="Replacementmargin">



            RequestedDay:
                <input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="requestedDay" type="text" requestedDay={this.state.requestedDay} onChange={this.handleChange.bind(this)}/>
                SlotNumber: 
                <input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="slotNumber" type="text" slotNumber={this.state.slotNumber} onChange={this.handleChange1.bind(this)}/>
                Facultyname: 
                <input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="facultyname" type="text" facultyname={this.state.facultyname} onChange={this.handleChange2.bind(this)}/>
                Department: 
                <input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="department" type="text" department={this.state.department} onChange={this.handleChange3.bind(this)}/>
  
 

            </label>




</form>
<button onClick={this.submitrequest} type="button" id="loginSubmit">Submit</button>
          </div>
         
        
        )
    }

}




