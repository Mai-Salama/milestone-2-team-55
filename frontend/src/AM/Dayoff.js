import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../NavbarAM';


export default class MaternityLeave extends Component {
    constructor(props){
        super(props)
   this.state={

     dayoff:'',
     facultyname:'',
   
        }
       
    
}
handleChange(event){
    this.setState({
        dayoff:event.target.value,
    })
}
handleChange1(event){
    this.setState({
        facultyname:event.target.value,
    })
}



submitrequest=(event)=>{
    const inputData={

    dayoff:this.state.dayoff,
    facultyname:this.state.facultyname,
   
    
    }
    axios.post('/changedayoff',inputData,{headers:{
        'x-auth-token':localStorage.getItem('savedToken')
    }
    
       
    
             })
      .then (response =>{
       
        console.log(this.state.dayoff)
      
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
<h2>DayOff Request</h2>

{/* //<label class="Replacementmargin" for="receiver_id">Ta_Id:</label> */}

<label  class="Replacementmargin">


                Dayoff:
                <input style={{alignSelf:"center",marginLeft:550, marginTop:50 }}  name="dayoff" type="text" dayoff={this.state.dayoff} onChange={this.handleChange.bind(this)}/>
                Facultyname:
                <input  style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="facultyname" type="text" facultyname={this.state.facultyname} onChange={this.handleChange1.bind(this)}/>
                
 

            </label>



            {/* <Input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} placeholder=' Department Id...' onChange={this.handleChange1.bind(this)}/ > */}

</form>
<button onClick={this.submitrequest} type="button" button style={{alignSelf:"center",marginLeft:550, marginTop:-90 }} id="loginSubmit">Submit</button>
          </div>
         
        
        )
    }

}




