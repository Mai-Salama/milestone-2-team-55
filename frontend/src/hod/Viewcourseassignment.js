import React,{Component} from 'react'
import axios from "axios"
import Navbar from "../NavbarHod"
export default class Viewcourseassignment extends Component{
   
    constructor(props){
        super(props)
        this.onChangefaculty=this.onChangefaculty.bind(this)
        this.onChangedepartment=this.onChangedepartment.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
        this.state={
            facultyname:"",
            departmentid:"",
            staff:[]
        }
    }
    onChangefaculty(e){
        this.setState({
            facultyname:e.target.value //this takes input from user and puts it here
           
        })
    }
       
    onChangedepartment(e){
        this.setState({
            departmentid:e.target.value //this takes input from user and puts it here
           
        })
    }
    onSubmit(e)
    {
        e.preventDefault();
        //console.log(this.state.dayoff)
        const dayoffc={
            facultyname:this.state.facultyname,
            department_name:this.state.departmentid
           
        }

        console.log(dayoffc)
        axios.post('/viewteachingassignment',dayoffc,{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
        .then((response)=>{
            
                
                let temp=[]
                for(let i=0;i<response.data.length;i++){
                    temp.push(response.data[i])
                
                }
            console.log(temp.length)
            if(temp.length==0){
              temp.push("There are no teaching assignment yet")
            }
            this.setState({
                    staff:temp
                })
                console.log(this.state.staff)
            }
            
            //{this.displayBlogPost(this.state.posts)}
            
          
        
    
          
                    )
                   
        .catch((error)=>{
            console.log(error)
        });
       //window.location='/Dayoffrejected' //will make him go to this page after submitting
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
<h1>View teaching assignment</h1>
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
                value={this.state.departmentid}
                onChange={this.onChangedepartment}
                placeholder="Enter department id "/>

                </div>

                <div className="form-group">
                    <input id="add" type="submit" value= "view teaching assignment" className="btn btn-primary"/>

                </div>
                <div>
               <h1>Your courses' teaching assignment</h1> 
         
<div> {this.state.staff.map(request=>
            <div>
                <p>  {request}</p>

               <bn/>
                </div>
                )}
    </div>

</div>
                </form>

            </div>
          
        )
    }
}