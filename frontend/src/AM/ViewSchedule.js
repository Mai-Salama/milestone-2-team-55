import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Navbar from '../NavbarAM' 
export default class ViewSchedule extends Component {
    constructor(props){
        super(props)
   this.state={
    saturdayfirst:[],
    saturdaysecond:[],
    saturdaythird:[],
    saturdayfourth:[],
    saturdayfifth:[],
    sundayfirst:[],
    sundaysecond:[],
    sundaythird:[],
    sundayfourth:[],
    sundayfifth:[],
    mondayfirst:[],
    mondaysecond:[],
    mondaythird:[],
    mondayfourth:[],
    mondayfifth:[],
    tuesdayfirst:[],
    tuesdaysecond:[],
    tuesdaythird:[],
    tuesdayfourth:[],
    tuesdayfifth:[],
    wednesdayfirst:[],
    wednesdaysecond:[],
    wednesdaythird:[],
    wednesdayfourth:[],
    wednesdayfifth:[],
    thursdayfirst:[],
    thursdaysecond:[],
    thursdaythird:[],
    thursdayfourth:[],
    thursdayfifth:[],
    allisset: null
    }
       
    
}



componentDidMount=()=>{
    console.log("entered method");
    axios.get('/viewschedule', {
        headers:{
'x-auth-token':localStorage.getItem('savedToken')
        }, 
      })
      .then(response => {
          let empty = {
              timing: "-",
              course: "-",
              location: "-"
          }
        this.setState({
          saturdayfirst: response.data[0].first[0],
          saturdaysecond: response.data[0].second[0],
          saturdaythird: response.data[0].third[0],
          saturdayfourth: response.data[0].fourth[0],
          saturdayfifth: response.data[0].fifth[0],
          sundayfirst:response.data[1].first[0],
          sundaysecond:response.data[1].second[0],
          sundaythird:response.data[1].third[0],
          sundayfourth:response.data[1].fourth[0],
          sundayfifth:response.data[1].fifth[0],
          mondayfirst:response.data[2].first[0],
          mondaysecond:response.data[2].second[0],
          mondaythird:response.data[2].third[0],
          mondayfourth:response.data[2].fourth[0],
          mondayfifth:response.data[2].fifth[0],
          tuesdayfirst:response.data[3].first[0],
          tuesdaysecond:response.data[3].second[0],
          tuesdaythird:response.data[3].third[0],
          tuesdayfourth:response.data[3].fourth[0],
          tuesdayfifth:response.data[3].fifth[0],
          wednesdayfirst:response.data[4].first[0],
          wednesdaysecond:response.data[4].second[0],
          wednesdaythird:response.data[4].third[0],
          wednesdayfourth:response.data[4].fourth[0],
          wednesdayfifth:response.data[4].fifth[0],
          thursdayfirst:response.data[5].first[0],
          thursdaysecond:response.data[5].second[0],
          thursdaythird:response.data[5].third[0],
          thursdayfourth:response.data[5].fourth[0],
          thursdayfifth:response.data[5].fifth[0] 
        })
        if(!this.state.saturdayfirst){
            console.log("no first");
            this.setState({saturdayfirst: empty});
        }
        else{
            this.setState({saturdayfirst: this.state.saturdayfirst[0]});
        }
        if(!this.state.saturdaysecond){
            this.setState({saturdaysecond: empty});
        }
        else{
            this.setState({saturdaysecond: this.state.saturdaysecond[0]});
        }
        if(!this.state.saturdaythird){
            this.setState({saturdaythird: empty});
        }
        else{
            this.setState({saturdaythird: this.state.saturdaythird[0]});
        }
        if(!this.state.saturdayfourth){
            this.setState({saturdayfourth: empty});
        }
        else{
            this.setState({saturdayfourth: this.state.saturdayfourth[0]});
        }
        if(!this.state.saturdayfifth){
            this.setState({saturdayfifth: empty});
        }
        else{
            this.setState({saturdayfifth: this.state.saturdayfifth[0]});
        }
        if(!this.state.sundayfirst){
            this.setState({sundayfirst: empty});
        }
        else{
            this.setState({sundayfirst: this.state.sundayfirst[0]});
        }
        if(!this.state.sundaysecond){
            this.setState({sundaysecond: empty});
        }
        else{
            this.setState({sundaysecond: this.state.sundaysecond[0]});
        }
        if(!this.state.sundaythird){
            this.setState({sundaythird: empty});
        }
        else{
            this.setState({sundaythird: this.state.sundaythird[0]});
        }
        if(!this.state.sundayfourth){
            this.setState({sundayfourth: empty});
        }
        else{
            this.setState({sundayfourth: this.state.sundayfourth[0]});
        }
        if(!this.state.sundayfifth){
            this.setState({sundayfifth: empty});
        }
        else{
            this.setState({sundayfifth: this.state.sundayfifth[0]});
        }
        if(!this.state.sundayfifth){
            this.setState({sundayfifth: empty});
        }
        else{
            this.setState({sundayfifth: this.state.sundayfifth[0]});
        }
        if(!this.state.mondayfirst){
            this.setState({mondayfirst: empty});
        }
        else{
            this.setState({mondayfirst: this.state.mondayfirst[0]});
        }
        if(!this.state.mondaysecond){
            this.setState({mondaysecond: empty});
        }
        else{
            this.setState({mondaysecond: this.state.mondaysecond[0]});
        }
        if(!this.state.mondaythird){
            this.setState({mondaythird: empty});
        }
        else{
            this.setState({mondaythird: this.state.mondaythird[0]});
        }
        if(!this.state.mondayfourth){
            this.setState({mondayfourth: empty});
        }
        else{
            this.setState({mondayfifth: this.state.mondayfifth[0]});
        }
        if(!this.state.tuesdayfirst){
            this.setState({tuesdayfirst: empty});
        }
        else{
            this.setState({tuesdayfirst: this.state.tuesdayfirst[0]});
        }
        if(!this.state.tuesdaysecond){
            this.setState({tuesdaysecond: empty});
        }
        else{
            this.setState({tuesdaysecond: this.state.tuesdaysecond[0]});
        }
        if(!this.state.tuesdaythird){
            this.setState({tuesdaythird: empty});
        }
        else{
            this.setState({tuesdaythird: this.state.tuesdaythird[0]});
        }
        if(!this.state.tuesdayfourth){
            this.setState({tuesdayfourth: empty});
        }
        else{
            this.setState({tuesdayfourth: this.state.tuesdayfourth[0]});
        }
        if(!this.state.tuesdayfifth){
            this.setState({tuesdayfifth: empty});
        }
        else{
            this.setState({tuesdayfifth: this.state.tuesdayfifth[0]});
        }
        if(!this.state.wednesdayfirst){
            this.setState({wednesdayfirst: empty});
        }
        else{
            this.setState({wednesdayfirst: this.state.wednesdayfirst[0]});
        }
        if(!this.state.wednesdaysecond){
            this.setState({wednesdayscond: empty});
        }
        else{
            this.setState({wednesdaysecond: this.state.wednesdaysecond[0]});
        }
        if(!this.state.wednesdaythird){
            this.setState({wednesdaythird: empty});
        }
        else{
            this.setState({wednesdaythird: this.state.wednesdaythird[0]});
        } 
        if(!this.state.wednesdayfourth){
            this.setState({wednesdayfourth: empty});
        }
        else{
            this.setState({wednesdayfourth: this.state.wednesdayfourth[0]});
        }
        if(!this.state.wednesdayfifth){
            this.setState({wednesdayfifth: empty});
        }
        else{
            this.setState({wednesdayfifth: this.state.wednesdayfifth[0]});
        }
        if(!this.state.thursdayfirst){
            this.setState({thursdayfirst: empty});
        }
        else{
            this.setState({thursdayfirst: this.state.thursdayfirst[0]});
        }
        if(!this.state.thursdaysecond){
            this.setState({thursdaysecond: empty});
        }
        else{
            this.setState({thursdaysecond: this.state.thursdaysecond[0]});
        }
        if(!this.state.thursdaythird){
            this.setState({thursdaythird: empty});
        }
        else{
            this.setState({thursdaythird: this.state.thursdaythird[0]});
        }
        if(!this.state.thursdayfourth){
            this.setState({thursdayfourth: empty});
        }
        else{
            this.setState({thursdayfourth: this.state.thursdayfourth[0]});
        }
        if(!this.state.thursdayfifth){
            this.setState({thursdayfifth: empty});
        }
        else{
            this.setState({thursdayfifth: this.state.thursdayfifth[0]});
        }
        this.setState({allisset: "true"});
        console.log(this.state.saturdayfirst);
        console.log(this.state.saturdayfifth);
        
        // let fifth = this.state.saturday.fifth;
        // console.log(fifth[0][0].course);
    })
 
      .catch(function (error) {
        console.log(error);
      });
     
}
render(){
    if(!this.state.allisset){
        return null;
    }
    return(
<div>
<Navbar/>
      
<table>
<thread>
 <tr>
 <th>Day/Slot</th>
 <th>First</th>
 <th>Second</th>
 <th>Third</th>
 <th>Fourth</th>
 <th>Fifth</th>
</tr>
 </thread>
  <tbody>
 <tr>
 <td> Saturday </td>
 <td>
 <table>
 <thread>
 <tr>

 <th>Timing</th>
 <th>Course</th>
 <th>Location</th>

 </tr>
 </thread>
 <tbody>
 
 <tr>
 <td> {this.state.saturdayfirst.timing} </td>
 <td> {this.state.saturdayfirst.course} </td>
 <td> {this.state.saturdayfirst.location} </td>


 <td> {this.state.saturdaysecond.timing} </td>
 <td> {this.state.saturdaysecond.course} </td>
 <td> {this.state.saturdaysecond.location} </td>

 <td> {this.state.saturdaythird.timing} </td>
 <td> {this.state.saturdaythird.course} </td>
 <td> {this.state.saturdaythird.location} </td>

 <td> {this.state.saturdayfourth.timing} </td>
 <td> {this.state.saturdayfourth.course} </td>
 <td> {this.state.saturdayfourth.location} </td>  

 <td> {this.state.saturdayfifth.timing} </td>
 <td> {this.state.saturdayfifth.course} </td>
 <td> {this.state.saturdayfifth.location} </td>
 </tr>

 </tbody>
 </table>
 </td>
 </tr>

 </tbody>
    </table>
    </div>
    )

}


// render() {
//     return(
// <div>
// <table id="requeststable">

//  <tbody>
//  <tr>

//  <td> Saturday </td>
//  <td>
//  <table className="table">
// <thread className="tt">
//  <tr>
//  <th>Timing</th>
//  <th>Course</th>
//  <th>Location</th>
//  </tr>
//  </thread>
//  <tbody>
//  {this.state.saturday.map((item => 
//  <tr>
// <td> {item.timing} </td>
// <td> {item.course} </td>
// <td> {item.location} </td>
// </tr>
//  ))}
//  </tbody>
//                 </table>
//  </td>
//  </tr>
//  </tbody>
//  </table>
//  </div>
//      );
    
/* 
</tr>return (
      
       
//       <div> 
      

//       <a href="www.mypage.com" onclick="window.history.go(-1); return false;"> Go to previous </a>

// <script> */
// function goBack() {
//   window.history.back()
// }
// </script>

   
// <table className="table">

//     <thread className="tt">
// <tr>
// <th>Day/Slot</th>
// <th>First</th>
// <th>Second</th>
// <th>Third</th>
// <th>Fourth</th>
// <th>Fifth</th>


// </tr>
// </thread>
// <tbody>
// {this.state.Schedule.map((item => 
// <tr>

// <td> {item.day} </td>
// <td>
// <table className="table">

// <thread className="tt">
// <tr>

// <th>Timing</th>
// <th>Course</th>
// <th>Location</th>

// </tr>
// </thread>
// <tbody>
// {this.state.Schedule.map((item => 

    
// <tr>

// <td> {item.first.timing} </td>
// <td> {item.first.course} </td>
// <td> {item.first.location} </td>

// <td> {item.second.timing} </td>
// <td> {item.second.course} </td>
// <td> {item.second.location} </td>

// <td> {item.third.timing} </td>
// <td> {item.third.course} </td>
// <td> {item.third.location} </td>

// <td> {item.fourth.timing} </td>
// <td> {item.fourth.course} </td>
// <td> {item.fourth.location} </td>

// <td> {item.fifth.timing} </td>
// <td> {item.fifth.course} </td>
// <td> {item.fifth.location} </td>
// </tr>
// ))}
// </tbody>
// </table>
    
    
//     </td>
// {/* <td> {item.timing} </td>
// <td> {item.course} </td>
// <td> {item.location} </td> */}
// </tr>
//  ))}
// </tbody>
//     </table>
// </div>
//     );
//   }
 }
