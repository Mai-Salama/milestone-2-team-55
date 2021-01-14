import React, {Component} from 'react';
import axios from 'axios';
import Navbar from "../NavbarHR.js";

export default class Locations extends Component{

    render(){
        return(
            
            <div>
                <Navbar/>
            <div className='container'>
                <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="HomeHR">Home</a></li>
              <li className="breadcrumb-item active text-danger" aria-current="page">Locations</li>
            </ol>
          </nav>
          </div>
          <div className='container'>
                <h3>Locations</h3>
               <a href="/AddLocation"> <button className="btn btn-warning">  Add Location </button> </a>
               <a href="/DeleteLocation"> <button className="btn btn-warning">  Delete Location </button> </a>
               <a href="/UpdateLocation"> <button className="btn btn-warning">  Update Location </button> </a>

            </div>
         </div>
            
        )
    }
}