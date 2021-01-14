import React, {Component} from 'react';
import axios from 'axios';
import Navbar from "../NavbarHR.js";

export default class SubmitAMaternityLeaveRequest extends Component{

    constructor(){
        super();
       
        this.onAddDateFrom=this.onAddDateFrom.bind(this);
        this.onAddDateTo=this.onAddDateTo.bind(this);
        this.onAddMonthFrom=this.onAddMonthFrom.bind(this);
        this.onAddMonthTo=this.onAddMonthTo.bind(this);
        this.onAddDoccument=this.onAddDoccument.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    
        this.state={

            dateFrom:0,
            dateTo:0,
            monthFrom:0,
            monthTo:0,
            document:""
            
        }
    }

   

onAddDateFrom(e){
   this.setState({
       dateFrom: e.target.value
   })
}
onAddDateTo(e){
    this.setState({
        dateTo: e.target.value
    })
 }
 onAddMonthFrom(e){
    this.setState({
        monthFrom: e.target.value
    })
 }

 onAddMonthTo(e){
    this.setState({
        monthTo: e.target.value
    })
 }

 onAddDoccument(e){
    this.setState({
        document: e.target.value
    })
 }


onSubmit(e){
    e.preventDefault();
    const request ={
        dateFrom:this.state.dateFrom,
        dateTo:this.state.dateTo,
        monthFrom:this.state.monthFrom,
        monthTo:this.state.monthTo,
        document:this.state.document

    }
    axios.post('/requestMaternityLeave',request,{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
        .then((res)=>{
            if(res.data.gender=="male")
            {console.log("male")}
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
              <li className="breadcrumb-item active text-danger" aria-current="page">Submit a maternity leave request </li>
            </ol>
          </nav>
          </div>
          <div className='container'>
          <h3>Maternity leave request</h3>
               <form onSubmit={this.onSubmit}>
                   <div className='form-group'>
                       <label>Date From</label>
                       <input type="text" required
                       className="form-control"
                       value={this.state.dateFrom}
                       onChange={this.onAddDateFrom}
                       placeholder="example: 19 "/>    
                   </div>

                   <div className='form-group'>
                       <label>Date To</label>
                       <input type="text" required
                       className="form-control"
                       value={this.state.dateTo}
                       onChange={this.onAddDateTo}
                       placeholder="example: 19"/>    
                   </div>

                   <div className='form-group'>
                       <label>Month From</label>
                       <input type="text" required
                       className="form-control"
                       value={this.state.monthFrom}
                       onChange={this.state.onAddMonthFrom}
                       placeholder="example: 4"/>    
                   </div>

                   <div className='form-group'>
                       <label>Month To</label>
                       <input type="text" required
                       className="form-control"
                       value={this.state.monthTo}
                       onChange={this.onAddMonthTo}
                       placeholder="example: 1"/>    
                   </div>

                   <div className='form-group'>
                       <label>Document</label>
                       <input type="text" required
                       className="form-control"
                       value={this.state.document}
                       onChange={this.onAddDoccument}
                       placeholder="example: pregerzzzz"/>    
                   </div>

            <div className="form-group">
                <input type="submit" value="Submit request" className="btn btn-warning"/>
            </div>
               </form>
            </div>
            </div>
        )
    }
}