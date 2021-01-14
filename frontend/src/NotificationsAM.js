import React, { Component } from 'react';
import axios from "axios";

export default class NotificationsAM extends Component {
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
        console.log("in method");
        console.log(localStorage.getItem('savedToken'));
        axios.get('/notificationsAM', {headers: {
         'x-auth-token': localStorage.getItem('savedToken')
     }}).then(response =>{
         console.log("here");
         this.setState({requests: response.data});
     }).catch(err =>{
         console.log(err);
     })
    }
    render() {
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
                                {item.type} Request with ID {item.req_id} has been {item.status}
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
