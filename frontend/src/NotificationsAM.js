import React, { Component } from 'react';
import axios from "axios";

export default class NotificationsAM extends Component {
    constructor(props){
        super(props);
        this.state = {
            requests: [],
            reqid:''};
        this.getAnnualAccepted = this.acceptreq.bind(this);
        this.getAnnualRejected = this.rejectreq.bind(this);
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
