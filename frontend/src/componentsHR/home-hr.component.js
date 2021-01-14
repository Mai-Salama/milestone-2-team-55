import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class HomeHR extends Component{
    constructor(){
        super();

    }

    onSignIn(){
        axios.get('/signinHR',{headers:{'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImhyLTMiLCJlbWFpbCI6IlllaGlhQGdtYWlsLmNvbSIsInJvbGUiOiJIUiIsImlhdCI6MTYxMDQxMzgxOH0.yLuTAkZUrQScAzILJXFJRi80eCDZtXt4mpiZhK0BDiU'}})
        .then((res)=>{
            console.log(res.data)}
           
        )

    .catch((error)=> { 
    console.log(error);
})

window.location='/Success'


}

onSignOut(){
    axios.get('/signoutHR',{headers:{'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImhyLTMiLCJlbWFpbCI6IlllaGlhQGdtYWlsLmNvbSIsInJvbGUiOiJIUiIsImlhdCI6MTYxMDQxMzgxOH0.yLuTAkZUrQScAzILJXFJRi80eCDZtXt4mpiZhK0BDiU'}})
    .then((res)=>{
        console.log(res.data)}
       
    )

.catch((error)=> { 
console.log(error);
})

window.location='/Success'


}

    render(){
        return(

            <div>
                <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              
              <li className="breadcrumb-item active text-danger" aria-current="page">Home</li>
            </ol>
          </nav>
                <h3>Welcome to your Home Page</h3>
               <a href="/Attendance"> <button className="btn btn-warning">  Attendance </button> </a>
               <a href="/Locations"> <button className="btn btn-warning">  Locations </button> </a> 
               <br/>
               <br/>
               <button onClick={this.onSignIn} type="button" className="btn btn-warning" >  Sign In </button> 
               <br/>
               <br/>
               <button onClick={this.onSignOut} type= "button" className="btn btn-warning" >  Sign Out </button> 

            </div>

            // <div>
            //    <h3>Welcome to your Home Page</h3>
            //    <form onSubmit={this.onSubmit}>
            //        {/* <div className='form-group'>
            //            <label>Username:</label>
            //            <select ref="userInput" 
            //            required
            //            className="form-control"
            //            value={this.state.username}
            //            onChange={this.onChangeUsername}> 
            //            {
            //                this.state.users.map(function(user){
            //                    return<option
            //                    key={user}
            //                    value={user}>
            //                        {user}

            //                    </option>;
            //                })
            //            }
            //            </select>
            //        </div>

            // <div className="form-group"> 
            // <label>Date:</label>
            // <div>
            //     <DatePicker
            //     selected={this.state.date}
            //     onChange={this.onChangeDate}/>
            // </div> */}


            // <div className="form-group">
            //     <input type="submit" value="Attendance" className="btn btn-warning" onClick="/view-profile-hr"/>
            // </div>

            // {/* </div> */}
            //    </form>
            // </div>
        )
    }
}
