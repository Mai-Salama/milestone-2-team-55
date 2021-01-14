import React, {Component} from 'react';
import axios from 'axios';
import Navbar from "../NavbarHR.js";


export default class ViewAttendanceRecordsByMonth extends Component{

    constructor(){
        super();
        
        this.onSubmit=this.onSubmit.bind(this);
        this.onMonth=this.onMonth.bind(this);
    
        this.state={
        attendanceRecords: [],
        signs:[],
        months:[],
        month:0
            
        }
    }

   componentDidMount(){
    this.setState({
        months:[1,2,3,4,5,6,7,8,9,10,11,12]
    })
    
    }

    onMonth(e){
        this.setState({
            month:e.target.value
            
    

        })}




onSubmit(e){
    e.preventDefault();
    const monthy= {month:this.state.month}

    axios.post('/viewAttendanceRecordsByMonth',monthy,{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
    .then(response=> {
        console.log(response.data);
        console.log(monthy);
        this.setState({attendanceRecords: response.data});
        let signsList=[];
        this.state.attendanceRecords.map((item)=>signsList.push(item.signs));
        this.setState({signs: signsList});
        let finalizedsigns = [];
        for(let j=0;j<this.state.signs.length;j++){
           for(let i = 0; i < this.state.signs[j].length; i++)
           {
                finalizedsigns.push(this.state.signs[j][i]);
               }
           }
        
           this.setState({signs: finalizedsigns});
        

          

    }).catch((error)=> {
        console.log(error);
    })

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
              <li className="breadcrumb-item "><a className="text-warning"href="ViewAllAttendanceRecords">View all attendnace records</a></li>
              <li className="breadcrumb-item active text-danger" aria-current="page">View records by month</li>
            </ol>
          </nav>
                <h3> View records by month</h3>

                
             <form onSubmit={this.onSubmit}>

             <div className='form-group'>
              <label>View By Month</label>
             <select ref="userInput" 
                       required
                       className="form-control"
                         value={this.state.month}
                       onChange={this.onMonth}
                       > 
                       {
                           this.state.months.map((month)=>{
                               return<option
                               key={month}
                               value={month}>
                                   {month}

                               </option>;
                           })
                       }
                       </select>
                       </div>

            


            <div className="form-group">
                <input type="submit" value="View By Month" className="btn btn-warning"/>
            </div>
               </form>
            
               
                <table className= "table table-bordered">
                    <thead className="table-warning">
                        <tr>
                            <th>Day</th>
                            <th>Date</th>
                            <th>Month</th>
                            <th>Hours</th>
                            <th>Minutes</th>
                            <th>Sign In</th>
                            <th>Sign Out</th>
                        </tr>

                    </thead>
                    <tbody>
                        {this.state.attendanceRecords.map((item)=>
                        <tr>
                          <td> {item.day}</td>
                          <td> {item.date}</td>
                          <td> {item.month}</td>
                          <td> {item.hours}</td>
                          <td> {item.minutes}</td>
                          <td>
                            <table className= "table table-bordered">
                                <thread className="table-warning">
                                    <tr>
                                        <th>Timing</th>
                                    </tr>
                                </thread>
                                <tbody>
                                    {item.signs.map((smalleritem =>
                                        <tr>
                                            <td>{smalleritem.hourin}</td>
                                            <td>{smalleritem.minutein}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </td>
                                <td>
                                <table className= "table table-bordered">
                                        <thread className="table-warning">
                                            <tr>
                                                <th>Timing</th>
                                            </tr>
                                        </thread>
                                        <tbody>
                                            {item.signs.map((smalleritem =>
                                            <tr>
                                                <td>{smalleritem.hourout}</td>
                                                <td>{smalleritem.minuteout}</td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                          </tr>
                        )}
                    </tbody>
                </table>

                 
                </div>

            </div>
        )
    }
}
