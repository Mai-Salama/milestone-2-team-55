import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
const params = JSON.stringify({
    "email": email,
    "password": password,
});

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        console.log("name was submittes" + this.state.value);
        event.preventDefault();
    }
    getInputs = () => {

    };
    handleButton = () =>{
        axios.post('/loginHR', params,{"headers": {
            "content-type":"application/json",
        },}).then(response =>{
            console.log(response.data);
        }).catch(err =>{
            console.log(err);
        });
    };
   
    render() {
        return (
        //     <div>
        //    <Button onClick={this.getInputs}>click the button</Button>     
        //     </div>
            <div>
            <form onSubmit = {this.handleSubmit}>
            <label>
                Name :
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit" />
            </form>
            </div>
         
        )
    }
}
