import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Navbar from '../NavbarAM'

export default class SickLeave extends Component {
    constructor(props){
        super(props)
   this.state={
    date:'',
    month:'',

    
        }
       
    
}
handleChange(event){
    this.setState({
        date:event.target.value,
    })
}
handleChange1(event){
    this.setState({
        month:event.target.value,
    })
}


submitrequest=(event)=>{
    const inputData={

    date:this.state.date,
   
     month:this.state.month,

    
    }
    axios.post('/requestSickLeave',inputData,{headers:{
        'x-auth-token':localStorage.getItem('savedToken')
    }
    
       
    
             })
      .then (response =>{
       
        console.log(this.state.date)
      
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
 <form>
<h2>Sick Leave</h2>

{/* //<label class="Replacementmargin" for="receiver_id">Ta_Id:</label> */}

<label  class="Replacementmargin">


                Date:
                <input  style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="date" type="text" date={this.state.date} onChange={this.handleChange.bind(this)}/>
                Month:
                <input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="month" type="text" month={this.state.month} onChange={this.handleChange1.bind(this)}/>
               
            </label>




</form>
<button onClick={this.submitrequest} type="button" class="btn btn-outline-dark  Replacementmarginbutton">Submit</button>
          </div>
         
        
        )
    }

}




