import React,{Component} from 'react'
import axios from "axios"
import Navbar from "../NavbarHod"
export default class Viewstaffbycourse extends Component{
   
    constructor(props){
        super(props)
        this.onChangefaculty=this.onChangefaculty.bind(this)
        this.onChangecourse=this.onChangecourse.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
        this.state={
            facultyname:"",
            coursename:"",
            staff:[]
        }
    }
    onChangefaculty(e){
        this.setState({
            facultyname:e.target.value //this takes input from user and puts it here
           
        })
    }
    onChangecourse(e){
        this.setState({
            coursename:e.target.value //this takes input from user and puts it here
           
        })
    }
      
    onSubmit(e)
    {
        e.preventDefault();
        //console.log(this.state.dayoff)
        const dayoffc={
            facultyname:this.state.facultyname,
            coursename:this.state.coursename
           
        }

        console.log(dayoffc)
        axios.post('/viewstaffbycourse',dayoffc,{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
        .then((response)=>{
               
            let temp=[]
            for(let i=0;i<response.data.length;i++){
                temp.push(response.data[i])
            
            }
        console.log(temp.length)
        if(temp.length==0){
          temp.push("There is no staff yet")
        }
        this.setState({
                staff:temp
            })
            console.log(this.state.staff)
        }
                    )
        .catch((error)=>{
            console.log(error)
        });
       // window.location='/Dayoffrejected' //will make him go to this page after submitting
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
                    <h1>View staff by course</h1>
                </p>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                
                <input
                type="text"
                className="form-control"
                value={this.state.facultyname}
                onChange={this.onChangefaculty}
                placeholder="Enter faculty name"/>

                </div>
                
                <div className="form-group">
                
                <input
                type="text"
                className="form-control"
                value={this.state.coursename}
                onChange={this.onChangecourse}
                placeholder="Enter course name"/>

                </div>

                <div className="form-group">
                    <input id="add" type="submit" value= "view staff by course" className="btn btn-primary"/>

                </div>
                <div>
                <h1>Your staff information</h1>
{this.state.staff.map(request=>
            <div>
                <p>  {request}</p>

               <bn/>
                </div>
                )}
    
</div>
                </form>

            </div>
        )
    }
}