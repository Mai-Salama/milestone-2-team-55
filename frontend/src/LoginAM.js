import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from 'react-router-dom';
import CoordinatorHomeCont from './CourseCoordinator/CoordinatorHomeCont';

//import {Button} from 'react-bootstrap';


export default class UpdatedLogin extends Component {
    constructor(props){
        super(props);
        this.state = {email: '',
        password: '',
        redirect: null};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]:value});
    }

    async handleSubmit(event){
        const inputData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/loginAcademic', inputData).then(response =>{
            console.log(response.data);
            let token = response.headers['x-auth-token'];
            localStorage.setItem("savedToken", token);
            this.setState({redirect: "/HomeC"});
        }).catch(err =>{
            console.log(err);
        });
        event.preventDefault();
    };

   
    render() {
        if(this.state.redirect){
            console.log("should redirect");
            return <Redirect to={this.state.redirect} Component={CoordinatorHomeCont}/>
        }
        return (
        //     <div>
        //    <Button onClick={this.getInputs}>click the button</Button>     
        //     </div>
            <div>
            <form onSubmit = {this.handleSubmit}>
            <label>
                Name :
                <input name="email" type="text" email={this.state.email} onChange={this.handleChange}/>
                Passwors : 
                <input name="password" type="text" password={this.state.password} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit" />
            </form>
            </div>
         
        )
    }
}