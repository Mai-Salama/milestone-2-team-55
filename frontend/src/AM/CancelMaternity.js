import React,{Component  } from 'react';
//import {Button} from "./Button"
//import './Button.css'
import { Input, TransitionablePortal } from 'semantic-ui-react'

import axios from "axios";
import {useState} from 'react';
 import Modal from 'react-modal';
 import Navbar from '../NavbarAM';


 

export default class CancelMaternity extends Component{
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
        axios.post('/cancelpendingmaternity',inputData, {
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
              
              <div>
         
                    </div>

                   <h1> Your Request is cancelled</h1>

          </Modal>
<Input style={{alignSelf:"center",marginLeft:550, marginTop:70 }} placeholder=' status...'  onChange={this.handleChange.bind(this)}/>

<button style={{alignSelf:"center",marginLeft:550, marginTop:70 ,marginBottom:100 }} class="btn btn-primary btn-round"onClick={this.viewmaternity}>
             View
            </button>
           
           


            </div>
            
            
        )}

}
