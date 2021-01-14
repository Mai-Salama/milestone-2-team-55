import React, { Component } from 'react';
import axios from "axios";

export default class DeleteHR extends Component {
    constructor(props){
        super(props);
        this.state = {
        ide: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]:value});
    }

    handleSubmit(event){
        const inputData = {
            id: this.state.ide
        }
        axios.post('/deleteHR', inputData, {headers: {
            'x-auth-token': localStorage.getItem('savedToken')
        }}).then(response =>{
            console.log(response.data);
            //maybe a pop up message with response.data
        }).catch(err =>{
            console.log(err);
        });
        event.preventDefault();
    };
    render() {
        return (
            <div>
                <h2>Delete HR member</h2>
                <form onSubmit = {this.handleSubmit}>
                <label>
                    <input name="ide" placeholder="ID..." type="text" ide={this.state.ide} onChange={this.handleChange}/>
                </label>
                <input type="submit" id="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
