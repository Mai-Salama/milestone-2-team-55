import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../NavbarHR.js";

export default class SubmitAnAnnualLeaveRequest extends Component{

    constructor(){
        super();
       
        this.onAddDate=this.onAddDate.bind(this);
        this.onAddMonth=this.onAddMonth.bind(this);
        this.onAddDay=this.onAddDay.bind(this);
        this.onAddTa=this.onAddTa.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    
        this.state={

            date:0,
            month:0,
            day:0,
            TAtoCover:""
            
        }
    }

onAddDate(e){
   this.setState({
       date: e.target.value
   })
}

 onAddMonth(e){
    this.setState({
        month: e.target.value
    })
 }

 onAddTa(e){
     this.setState({
         TAtoCover: e.target.value
     })
 }

 onAddDay(e){
    this.setState({
        day: e.target.value
    })
}



onSubmit(e){
    e.preventDefault();
    const request ={
        date:this.state.date,  
        month:this.state.month,
        day:this.state.day,
        TAtoCover:this.state.TAtoCover

    }
    axios.post('/submitAnnualLeaveRequest',request,{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
        .then((res)=>{
            console.log(res.data);
        }).catch((error)=> { 
    console.log(error);
})
window.location="/Success"



}

    render(){
        return(
            <div>
                <Navbar/>
            <div className='container'>
                <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="HomeHR">Home</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="Attendance">Attendance</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="Leaves">Leaves</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="SubmitALeaveRequest">Submit A Leave Request</a></li>
              <li className="breadcrumb-item active text-danger" aria-current="page">Submit an annual leave request </li>
            </ol>
          </nav>
           <div>
             <h3>Submit Anuual leave request</h3>
             <form onSubmit={this.onSubmit}>
             <div className='form-group'>
                       <label>Month</label>
                       <input type="text" required
                       className="form-control"
                       value={this.state.month}
                       onChange={this.onAddMonth}
                       placeholder="example: 4"/>    
                   </div>

                   <div className='form-group'>
                       <label>Date</label>
                       <input type="text" required
                       className="form-control"
                       value={this.state.date}
                       onChange={this.onAddDate}
                       placeholder="example: 4"/>    
                   </div>

                   <div className='form-group'>
                       <label>Day</label>
                       <input type="text" required
                       className="form-control"
                       value={this.state.day}
                       onChange={this.onAddDay}
                       placeholder="sunday is 0"/>    
                   </div>
                   <div className='form-group'>
                       <label>TA to cover</label>
                       <input type="text" required
                       className="form-control"
                       value={this.state.TAtoCover}
                       onChange={this.onAddTa}
                       placeholder="example: Yehia"/>    
                   </div>

            <div className="form-group">
                <input type="submit" value="Submit request" className="btn btn-warning" onClick="/view-profile-hr"/>
            </div>

           
               </form>
           
               </div>
           
               </div>
            </div>
        )
    }
}