import React, { Component } from 'react';
import {Button} from '../CourseInstructor/Button';
import {Redirect} from 'react-router-dom';
import CourseSlotsC from './CourseSlotsC';
import SlotLinkingC from './SlotLinkingC';
import Navbar from '../NavbarCC';

export default class CoordinatorHomeCont extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            redirectToSlotLinking: null,
            redirectToCourseSlots: null
        };
        this.toSlotLinking = this.toSlotLinking.bind(this);
        this.toCourseSlots = this.toCourseSlots.bind(this);
        
    }
 
    toSlotLinking(event){
        this.setState({redirectToSlotLinking: "/SlotLinkingC"});
        event.preventDefault();
    }

    toCourseSlots(event){
        this.setState({redirectToCourseSlots: "/CourseSlotsC"});
        event.preventDefault();
    }
    render() {
       
        if(this.state.redirectToSlotLinking){
            return <Redirect to={this.state.redirectToSlotLinking} Component={SlotLinkingC}/>
        }
        if(this.state.redirectToCourseSlots){
            return <Redirect to={this.state.redirectToCourseSlots} Component={CourseSlotsC}/>
        }
        return (
            <div>
           
            <Navbar/>
                <Button onClick={this.toSlotLinking}>Slotlinking</Button>
                <Button onClick={this.toCourseSlots}>Course Slots</Button>
            </div>
        )
    }
}
