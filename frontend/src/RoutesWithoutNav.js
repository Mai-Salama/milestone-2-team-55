import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import UpdatedLogin from './UpdatedLogin';
import ChangePasswordAM from './ChangePasswordAM';
import ChangePasswordHR from './ChangePasswordHR';

export default class RoutesWithoutNav extends Component {
    render() {
        return (
            <Router>
            <Route path="/">
              <UpdatedLogin />
            </Route>
            <Route path="/ChangePasswordAM">
              <ChangePasswordAM />
            </Route>
            <Route path="/ChangePasswordHR">
              <ChangePasswordHR />
            </Route>
          </Router>
        )
    }
}
