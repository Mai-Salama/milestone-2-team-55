import React, {Component} from 'react';
import axios from 'axios';
import Navbar from "../NavbarHR.js";



export default class DeleteLocation extends Component{

    constructor(){
        super();
       
        this.onDeleteRoomNo=this.onDeleteRoomNo.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    
        this.state={

            roomNo:'',
            
        }
    }

   

onDeleteRoomNo(e){
   this.setState({
       roomNo: e.target.value
   })
}


onSubmit(e){
    e.preventDefault();
    const location ={
            roomNo:this.state.roomNo

    }
    axios.post('/deletelocation',location,{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
        .then((res)=>console.log(res.data))
    .catch((error)=> { 
    console.log(error);
})
window.location="/Success"



}

    render(){
        return(
            <div>
                
            <div className='container'>
                <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="HomeHR">Home</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="Locations">Locations</a></li>
              <li className="breadcrumb-item active text-danger" aria-current="page">Delete Location</li>
            </ol>
          </nav>
          </div>
          <div className='container'>
               <h3>Delete Location</h3>
               <form onSubmit={this.onSubmit}>
                   <div className='form-group'>
                       <label>Room Number</label>
                       <input type="text" required
                       className="form-control"
                       value={this.state.roomNo}
                       onChange={this.onDeleteRoomNo}
                       placeholder="example: c3.112 "/>    
                   </div>

                  

            <div className="form-group">
                <input type="submit" value="Delete Location" className="btn btn-warning" />
            </div>
               </form>
            </div>
            </div>
        )
    }
}