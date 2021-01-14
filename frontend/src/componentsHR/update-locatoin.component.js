import React, {Component} from 'react';
import axios from 'axios';
import Navbar from "../NavbarHR.js";


export default class UpdateLocation extends Component{

    constructor(){
        super();
        this.onUpdateCapacity=this.onUpdateCapacity.bind(this)
        this.onUpdateRoomNo=this.onUpdateRoomNo.bind(this)
        this.onUpdateRoomType=this.onUpdateRoomType.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    
        this.state={

            roomNo:'',
            roomType:'',
            capacity:0,
        }
    }

   

onUpdateRoomNo(e){
   this.setState({
       roomNo: e.target.value
   })
}

onUpdateRoomType(e){
    this.setState({
        roomType:e.target.value
    })
}

onUpdateCapacity(e){
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
    axios.post('/updatelocation',location,{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
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
                <Navbar/>
            <div className='container'>
                <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="HomeHR">Home</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="Locations">Locations</a></li>
              <li className="breadcrumb-item active text-danger" aria-current="page">Update Location</li>
            </ol>
          </nav>
               <h3>Update Location</h3>
               <form onSubmit={this.onSubmit}>
                   <div className='form-group'>
                       <label>Room Number</label>
                       <input type="text" required
                       className="form-control"
                       value={this.state.roomNo}
                       onChange={this.onUpdateRoomNo}
                       placeholder="example: c3.112 "/>    
                   </div>

                   <div className='form-group'>
                       <label>Room Type</label>
                       <input type="text" required
                       className="form-control"
                       value={this.state.roomType}
                       onChange={this.onUpdateRoomType}
                       placeholder="example: lecture hall"/>    
                   </div>

                   <div className='form-group'>
                       <label>Capacity</label>
                       <input type="text" required
                       className="form-control"
                       value={this.state.capacity}
                       onChange={this.onUpdateCapacity}
                       placeholder="example: 10"/>    
                   </div>

            <div className="form-group">
                <input type="submit" value="Update location" className="btn btn-warning"/>
            </div>
               </form>
               </div>
            </div>
        )
    }
}