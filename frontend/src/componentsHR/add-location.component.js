import React, {Component} from 'react';
import axios from 'axios';
import Navbar from "../NavbarHR.js";




export default class AddLocation extends Component{

    constructor(){
        super();
        this.onAddCapacity=this.onAddCapacity.bind(this)
        this.onAddRoomNo=this.onAddRoomNo.bind(this)
        this.onAddRoomType=this.onAddRoomType.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    
        this.state={

            locations:[],
            roomNo:'',
            roomType:'',
            capacity:0,
        }
    }

   

onAddRoomNo(e){
   this.setState({
       roomNo: e.target.value
   })
}

onAddRoomType(e){
    this.setState({
        roomType:e.target.value
    })
}

onAddCapacity(e){
    this.setState({
        capacity: e.target.value
    })
}

onSubmit(e){
    e.preventDefault();
    const location ={
            roomNo:this.state.roomNo,
            roomType:this.state.roomType,
            capacity:this.state.capacity

    }
    axios.post('/addlocation',location,{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
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
               
                <div className='container'>
                <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="HomeHR">Home</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="Locations">Locations</a></li>
              <li className="breadcrumb-item active text-danger" aria-current="page">Add Location</li>
            </ol>
          </nav>
          </div>
          <div className='container'>
               <h3>Add Location</h3>
               <form onSubmit={this.onSubmit}>
                   <div className='form-group'>
                       <label>Room Number</label>
                       <input type="text" required
                       className="form-control"
                       value={this.state.roomNo}
                       onChange={this.onAddRoomNo}
                       placeholder="example: c3.112 "/>    
                   </div>

                   <div className='form-group'>
                       <label>Room Type</label>
                       <input type="text" required
                       className="form-control"
                       value={this.state.roomType}
                       onChange={this.onAddRoomType}
                       placeholder="example: lecture hall"/>    
                   </div>

                   <div className='form-group'>
                       <label>Capacity</label>
                       <input type="text" required
                       className="form-control"
                       value={this.state.capacity}
                       onChange={this.onAddCapacity}
                       placeholder="example: 10"/>    
                   </div>

            <div className="form-group">
                <input type="submit" value="Add location" className="btn btn-warning"/>
            </div>
               </form>
               </div>
            </div>
           
        )
    }
}