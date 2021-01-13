import React,{Component} from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import Navbar from "../NavbarHod"
export default class DeleteCI extends Component{
    constructor(props){
        super(props)
        this.onChangecourse=this.onChangecourse.bind(this)
        this.onChangefaculty=this.onChangefaculty.bind(this)
       // this.onChangeinstructor=this.onChangeinstructor.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
        this.state={
            facultyname:"",
            courseid:"",
           // instructorid:"",
           
        }
    }
    onChangefaculty(e){
        this.setState({
            facultyname:e.target.value //this takes input from user and puts it here
           
        })
    }
        onChangecourse(e){
            this.setState({
                 //this takes input from user and puts it here
                courseid:e.target.value
            })
           // console.log(this.state.dayoff)
    }
//     onChangeinstructor(e){
//         this.setState({
//              //this takes input from user and puts it here
//             instructorid:e.target.value
//         })
//        // console.log(this.state.dayoff)
// }
    onSubmit(e)
    {
        e.preventDefault();
        //console.log(this.state.dayoff)
        const assign={
            facultyname:this.state.facultyname,
            courseid:this.state.courseid,
           // instructorid:this.state.instructorid
        }

        console.log(assign)
        axios.post('/deletecourseinstructor',assign,{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
        .then(res=>console.log(res.data)).catch((error)=>{
            console.log(error)
        });
        window.location='/Submitted' //will make him go to this page after submitting
    }
    render(){
        return(
            <div>
                    <Navbar/>
  
  <nav aria-label="breadcrumb">
          <ol className="breadcrumb alert alert-warning">
            <li className="breadcrumb-item text-warning"><a className="text-warning"href="/HODhomepage">Home page</a></li>
           
          </ol>
        </nav>
                <p>
<h1>Delete course instructor</h1>
                </p>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
               
                <input
                type="text"
                className="form-control"
                value={this.state.facultyname}
                onChange={this.onChangefaculty}
                placeholder="Enter faculty name  "/>

                </div>
                <div className="form-group">
              
                <input
                type="text"
                className="form-control"
                value={this.state.courseid}
                onChange={this.onChangecourse}
                placeholder="Enter course id "/>
                </div>

              
              


                <div className="form-group">
                    <input id="add" type="submit" value= "Delete instructor" className="btn btn-primary"/>

                </div>
                </form>
            </div>
        )
    }
}