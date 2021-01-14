import React, { Component } from 'react';
//import axios from 'axios';
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Replacement from './Replacement';
import SubmitAccidentalLeave from './SubmitAccidentalLeave';
import MaternityLeave from './MaternityLeave';
import Dayoff from './Dayoff';
import slotlinking from './SlotLinking';
import ViewMaternity from './ViewMaternity'

import SickLeave from './SickLeave';
import SlotLinking from './SlotLinking';
import Cancelpendingcomp from './Cancelpendingcomp';
import CancelMaternity from './CancelMaternity';
import CancelDayoff from './CancelDayoff';
import ViewCompensation from './ViewCompensation'
import ViewDayOff  from './ViewDayOff'
import ViewReplacement from  './ViewReplacement'
import ViewSick from './ViewSick'
import ViewSlotLinking from './ViewSlotLinking'
import Navbar from '../NavbarAM'
export default class Requests extends Component {
    constructor(props){
        super(props)
   this.state={
            redirectToReplacement:null,
            redirectToSubmitAccidentalLeave :null,
            redirectTomaternityleave :null,
            redirectTosickleave :null,
            redirectTodayoff :null,
            redirectToSlotLinking:null,
            redirectToViewMaternity:null,
            redirectToCancelPendingComp:null,
            redirectToCancelMaternity:null,
            redirectToCancelDayoff:null,
            redirectToViewCompensation:null,
            redirectToViewDayOff:null,
            redirectToViewReplacement:null,
            redirectToViewSick:null,
            redirectToViewSlotLinking:null
        };
        
        this.submitaccidentalLeave =this.submitaccidentalLeave.bind(this);
       this.replacement=this.replacement.bind(this)
        this.maternityleave=this.maternityleave.bind(this)
        this.sickleave=this.sickleave.bind(this)
        this.dayoff=this.dayoff.bind(this)
        this.slotlinking=this.slotlinking.bind(this)
        this.viewmaternity=this.viewmaternity.bind(this)
        this.cancelpendingcomp=this.cancelpendingcomp.bind(this)
        this.cancelmaternity=this.cancelmaternity.bind(this)
        this.canceldayoff=this.canceldayoff.bind(this)
        this.viewcompensation=this.viewcompensation.bind(this)
        this.viewdayoff=this.viewdayoff.bind(this)
       
        this.viewsick=this.viewsick.bind(this)
        this.viewslotlinking=this.viewslotlinking.bind(this)
}
 
viewcompensation(event){
    this.setState({redirectToViewCompensation:"/Homepage/Requests/ViewCompensation"});
    event.preventDefault();
}
viewdayoff(event){
    this.setState({redirectToViewDayOff:"/Homepage/Requests/ViewDayOff"});
    event.preventDefault();
}

viewsick(event){
    this.setState({redirectToViewSick:"/Homepage/Requests/ViewSick"});
    event.preventDefault();
}

viewslotlinking(event){
    this.setState({redirectToViewSlotLinking:"/Homepage/Requests/ViewSlotLinking"});
    event.preventDefault();
}


    replacement(event){
        this.setState({redirectToReplacement:"/Homepage/Requests/Replacement"});
        event.preventDefault();
    }
    
    submitaccidentalLeave(event){
        this.setState({redirectToSubmitAccidentalLeave:"/Homepage/Requests/SubmitAccidentalLeave"});
        event.preventDefault();
    }

    maternityleave(event){
        this.setState({redirectTomaternityleave:"/Homepage/Requests/MaternityLeave"});
        event.preventDefault();
    }
    
    sickleave(event){
        this.setState({redirectTosickleave:"/Homepage/Requests/SickLeave"});
        event.preventDefault();
    }
    
     
    dayoff(event){
        this.setState({redirectTodayoff:"/Homepage/Requests/Dayoff"});
        event.preventDefault();
    }

    slotlinking(event){
        this.setState({redirectToSlotLinking:"/Homepage/Requests/SlotLinking"});
        event.preventDefault();
    }
    
    viewmaternity(event){
        this.setState({redirectToSlotLinking:"/Homepage/Requests/viewmaternity"});
        event.preventDefault();
    }
    cancelpendingcomp(event){
        this.setState({redirectToCancelPendingComp:"/Homepage/Requests/Cancelpendingcomp"});
        event.preventDefault();
    }
    cancelmaternity(event){
        this.setState({redirectToCancelMaternity:"/Homepage/Requests/CancelMaternity"});
        event.preventDefault();
    } 
    

    canceldayoff(event){
        this.setState({redirectToCancelDayoff:"/Homepage/Requests/CancelDayoff"});
        event.preventDefault();
    } 

render(){
    if(this.state.redirectToReplacement){
        return<Redirect to={this.state.redirectToReplacement} Component={Replacement}/>
    }

    if(this.state.redirectToSubmitAccidentalLeave){
        return<Redirect to={this.state.redirectToSubmitAccidentalLeave} Component={SubmitAccidentalLeave}/>
    }
    if(this.state.redirectTomaternityleave){
        return<Redirect to={this.state.redirectTomaternityleave} Component={MaternityLeave}/>
    }

    if(this.state.redirectTosickleave){
        return<Redirect to={this.state.redirectTosickleave} Component={SickLeave}/>
    }
    if(this.state.redirectTodayoff){
        return<Redirect to={this.state.redirectTodayoff} Component={Dayoff}/>
    }
    if(this.state.redirectToSlotLinking){
        return<Redirect to={this.state.redirectToSlotLinking} Component={SlotLinking}/>
    }
    if(this.state.redirectToViewMaternity){
        return<Redirect to={this.state.redirectToViewMaternity} Component={ViewMaternity}/>
    }
   
    if(this.state.redirectToCancelPendingComp){
        return<Redirect to={this.state.redirectToCancelPendingComp} Component={Cancelpendingcomp}/>
    }
   
    if(this.state.redirectToCancelMaternity){
        return<Redirect to={this.state.redirectToCancelMaternity} Component={CancelMaternity}/>
    }

    if(this.state.redirectToCancelDayoff){
        return<Redirect to={this.state.redirectToCancelDayoff} Component={CancelDayoff}/>
    }

    if(this.state.redirectToViewCompensation){
        return<Redirect to={this.state.redirectToViewCompensation} Component={ViewCompensation}/>
    }

    if(this.state.redirectToViewDayOff){
        return<Redirect to={this.state.redirectToViewDayOff} Component={ViewDayOff}/>
    }

    if(this.state.redirectToViewSick){
        return<Redirect to={this.state.redirectToViewSick} Component={ViewSick}/>
    }

    if(this.state.redirectToViewSlotLinking){
        return<Redirect to={this.state.redirectToViewSlotLinking} Component={ViewSlotLinking}/>
    }

    

        return(
           
          <div class="text-left">
            <h3>Welcome to your Requests!</h3>
            <Navbar/>
            <button  type="button" class="homebutton" id="loginSubmit"> Leaves</button>
            <button onClick={this.replacement} class="homebutton" type="button" id="loginSubmit">Replacement Request</button>
         
            <button onClick={this.dayoff} class="homebutton" type="button" id="loginSubmit">DayOff Request</button>
            <button onClick={this.submitaccidentalLeave} class="homebutton" type="button" id="loginSubmit">Accidental Leave</button>
            <button onClick={this.maternityleave} class="homebutton" type="button" id="loginSubmit">Maternity Leave</button>
            <button onClick={this.sickleave} class="homebutton" type="button" id="loginSubmit" >Sick Leave</button>
            <button onClick={this.slotlinking} class="homebutton" type="button" id="loginSubmit">Slot Linking</button>
            <button onClick={this.viewmaternity} class="homebutton"  type="button" id="loginSubmit">View Maternity</button>
            <button onClick={this.cancelpendingcomp} class="homebutton"  type="button" id="loginSubmit"> Cancel Compensation</button>
            <button onClick={this.cancelmaternity} class="homebutton"  type="button" id="loginSubmit"> Cancel Maternity</button>
            <button onClick={this.canceldayoff} class="homebutton"  type="button" id="loginSubmit"> Cancel DayOff</button>
            <button onClick={this.viewcompensation} class="homebutton"  type="button" id="loginSubmit"> View Compensation</button>
            <button onClick={this.viewdayoff} class="homebutton"  type="button" id="loginSubmit"> View DayOff</button>
            <button onClick={this.viewslotlinking} class="homebutton"  type="button" id="loginSubmit"> View SlotLinking</button>
            <button onClick={this.viewsick} class="homebutton"  type="button" id="loginSubmit"> View Sick</button>

          </div>
        
        )
    }

}




