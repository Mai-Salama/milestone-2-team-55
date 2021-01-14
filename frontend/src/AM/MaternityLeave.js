import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../NavbarAM'


export default class MaternityLeave extends Component {
    constructor(props){
        super(props)
   this.state={

     dateFrom:'',
     dateTo:'',
     monthFrom:'',
     monthTo:'',
     document:''
        }
       
    
}
handleChange(event){
    this.setState({
        dateFrom:event.target.value,
    })
}
handleChange1(event){
    this.setState({
        dateTo:event.target.value,
    })
}
handleChange2(event){
    this.setState({
        monthFrom:event.target.value,
    })
}

handleChange3(event){
    this.setState({
        monthTo:event.target.value,
    })
}

handleChange4(event){
    this.setState({
        document:event.target.value,
    })
}


submitrequest=(event)=>{
    const inputData={

    dateFrom:this.state.dateFrom,
     dateTo:this.state.dateTo,
     monthFrom:this.state.monthFrom,
     monthTo:this.state.monthTo,
     document:this.state.document
    
    }
    axios.post('/requestMaternityLeave',inputData,{headers:{
        'x-auth-token':localStorage.getItem('savedToken')
    }
    
       
    
             })
      .then (response =>{
       
        console.log(this.state.document)
      
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
<h2>Maternity Leave</h2>

{/* //<label class="Replacementmargin" for="receiver_id">Ta_Id:</label> */}

<label  class="Replacementmargin">


                DateFrom:
                <input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="dateFrom" type="text" dateFrom={this.state.dateFrom} onChange={this.handleChange.bind(this)}/>
                DateTo: 
                <input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="dateTo" type="text" dateTo={this.state.dateTo} onChange={this.handleChange1.bind(this)}/>
                monthFrom: 
                <input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="monthFrom" type="text" monthFrom={this.state.monthFrom} onChange={this.handleChange2.bind(this)}/>
                MonthTo: 
                <input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="monthTo" type="text" monthTo={this.state.monthTo} onChange={this.handleChange3.bind(this)}/>
                Document: 
                <input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} name="document" type="text" document={this.state.document} onChange={this.handleChange4.bind(this)}/>
 

            </label>




</form>
<button onClick={this.submitrequest} type="button" class="btn btn-outline-dark  Replacementmarginbutton">Submit</button>
          </div>
         
        
        )
    }

}




