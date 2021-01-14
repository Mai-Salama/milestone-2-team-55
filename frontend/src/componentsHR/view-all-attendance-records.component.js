import React, {Component} from 'react';
import axios from 'axios';
import Navbar from "../NavbarHR.js";

export default class ViewAllAttendanceRecords extends Component{
constructor(){
    super();

    this.state={
        attendanceRecords: [],
        signs:[]
    }
}

componentDidMount(){
    axios.get('/viewAllAttendanceRecords',{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
    .then(response=> {
        this.setState({attendanceRecords: response.data});
        console.log(response.data);
        // this.setState({signs: response.data});
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
              <li className="breadcrumb-item active text-danger" aria-current="page">View All Attendance Records</li>
            </ol>
          </nav>
                <h3> All attendance records</h3>
                <a href="/ViewAttendanceRecordsByMonth"> <button className="btn btn-warning">  View By month </button> </a>
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
