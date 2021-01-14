import React, { Component } from 'react';
import axios from "axios";
import {Button} from 'react-bootstrap';
import { Item } from 'semantic-ui-react';

export default class NotificationsHR extends Component {
    constructor(props){
        super(props);
        this.state = {
            requests: [],
            };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]:value});
    }
    componentDidMount= ()=>{
        axios.get('/notificationsHR', {headers: {
         'x-auth-token': localStorage.getItem('savedToken')
     }}).then(response =>{
         this.setState({requests: response.data});
     }).catch(err =>{
         console.log(err);
     })
    }
    render() {
        console.log("in render");
        return (
            <div>
                <table id="requeststable">
                <thead>
                    <tr>
                        <th>Notifications</th>
                    </tr>
                </thead>
                    <tbody>
                        {this.state.requests.map((item =>
                        <tr>
                            <td>
                                {item.type} Leave Request with ID {item.req_id} has been {item.status}
                                <br></br>
                            </td>
                        </tr>
                        )
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
