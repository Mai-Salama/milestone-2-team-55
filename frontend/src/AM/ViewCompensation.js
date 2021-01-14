import React,{Component  } from 'react';
//import {Button} from "./Button"
//import './Button.css'
import { Input, TransitionablePortal } from 'semantic-ui-react'
import Navbar from '../NavbarAM'
import axios from "axios";
import {useState} from 'react';
 import Modal from 'react-modal';


 

export default class ViewCompensation extends Component{
    constructor(){
        super();
        this.state={
            status:"",
            requests:[],
            requests2:[]
            // TAs:[],
            // statemodal:false

        }
    }
    handleChange(event){
        this.setState({
            status:event.target.value

        })
    }
   
    viewmaternity=(event)=>{
 
        const inputData={

            status:this.state.status,
            
            
            }
        axios.post('/viewcompensation',inputData, {
            headers:{
'x-auth-token':localStorage.getItem('savedToken')
            },
            
          })
          .then(response => {
            //   for(let i=0;i<response.data.length;i++){
            //     Trial.push(response.data[i])
            //   }
              
            this.setState({
                requests:response.data[0],
                // requests2:this.staterequests[0][0]
            })

        //     console.log("hii");
          

        })
          .catch(function (error) {
            console.log(error);
          });

          this.setState({
              statemodal:true
          })

        
    }


    render(){
       
        return(
            <div >
             
             <Navbar/>
            
                <Modal isOpen={this.state.statemodal} >
              <h2> Compensation </h2>
              <div>
         <h1>{this.state.document}Reason</h1>      
                    </div>

                    <table className="table">

<thread className="tt">
<tr>
<th>id</th>
<th>req_id</th>
<th>monthFrom</th>
<th>monthTo</th>
<th>Document</th>
</tr>
</thread>
<tbody>
{this.state.requests.map((item => 
<tr>
<td> {item.id} </td>
<td> {item.req_id} </td>
<td> {item.date} </td>
<td> {item.day} </td>
<td> {item.month} </td>
<td> {item.reason} </td>


</tr>
))}
</tbody>
</table>

          </Modal>
<Input style={{alignSelf:"center",marginLeft:550, marginTop:70 }} placeholder=' status...'  onChange={this.handleChange.bind(this)}/>

<button style={{alignSelf:"center",marginLeft:550, marginTop:70 ,marginBottom:100 }} class="btn btn-primary btn-round"onClick={this.viewmaternity}>
             View
            </button>
           
           


            </div>
            
            
        )}

}
