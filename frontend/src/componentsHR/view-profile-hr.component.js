import React, {Component} from 'react';
import axios from 'axios';
import Navbar from "../NavbarHR.js";

export default class ViewProfileHR extends Component{
constructor(){
    super();
    this.state={
        name:'',
        office:'',
        email:'',
        dayOff:'',
        salary:''
    }

}

componentDidMount(){
    axios.get('/viewprofile',{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
    .then(response=> {
        this.setState({name: response.data.name,
                     office:response.data.office,
                     email: response.data.email,
                    dayoff: response.data.dayOff,
                    salary:response.data.Salary})

    }).catch((error)=> {
        console.log(error);
    })
}

    render(){
        return(
            <div>
                <Navbar/>
            <div className='container'>
               <h3 className="text-danger"> Your profile:</h3>
               <h4 className="text-warning">username: </h4> <h4>{this.state.name}</h4>
               <h4 className="text-warning"> office: </h4> <h4>{this.state.office}</h4>
               <h4 className="text-warning">email:</h4><h4> {this.state.email}</h4>
               <h4 className="text-warning">day off:</h4><h4> {this.state.dayOff}</h4>
               <h4 className="text-warning">salary:</h4><h4> {this.state.salary}</h4>

               </div>
            </div>
        )
    }
}
