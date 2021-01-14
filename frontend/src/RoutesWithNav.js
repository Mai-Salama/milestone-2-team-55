import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from './Navbar';
import Faculties from './FacComponents/Faculties';
import AddNewFaculty from './FacComponents/AddNewFaculty';
import UpdateFaculty from './FacComponents/UpdateFaculty';
import DeleteFaculty from './FacComponents/DeleteFaculty';
import Departments from './FacComponents/Departments';
import AddNewDepartment from './FacComponents/AddNewDepartment';
import UpdateDepartment from './FacComponents/UpdateDepartment';
import DeleteDepartment from './FacComponents/DeleteDepartment';
import Courses from './FacComponents/Courses';
import AddNewCourse from './FacComponents/AddNewCourse';
import UpdateCourse from './FacComponents/UpdateCourse';
import DeleteCourse from './FacComponents/DeleteCourse';
import HomeHR from './home-hr.component';
import Staff from './StaffComponents/Staff';
import HRstaff from './StaffComponents/HRstaff';
import AcademicMembers from './StaffComponents/AcademicMembers';
import AddNewHR from './StaffComponents/AddNewHR';
import AddNewAM from './StaffComponents/AddNewAM';
import UpdateHR from './StaffComponents/UpdateHR';
import UpdateAM from './StaffComponents/UpdateAM';
import DeleteHR from './StaffComponents/DeleteHR';
import DeleteAM from './StaffComponents/DeleteAM';
import AttendanceHR from './StaffComponents/AttendanceHR';
import AttendanceAM from './StaffComponents/AttendanceAM';
import ViewStaffAttendanceHR from './StaffComponents/ViewStaffAttendanceHR';
import ViewStaffAttendanceAM from './StaffComponents/ViewStaffAttendanceAM';
import AddSignInHR from './StaffComponents/AddSignInHR';
import AddSignInAM from './StaffComponents/AddSignInAM';
import AddSignOutHR from './StaffComponents/AddSignOutHR';
import AddSignOutAM from './StaffComponents/AddSignOutAM';
import ViewStaffWithMissingHR from './StaffComponents/ViewStaffWithMissingHR';
import ViewStaffWithMissingAM from './StaffComponents/ViewStaffWithMissingAM';
import StaffLeavesHR from './StaffComponents/StaffLeavesHR';
import StaffAnnual from './StaffComponents/StaffAnnual';
import StaffAccidental from './StaffComponents/StaffAccidental';
import StaffMaternity from './StaffComponents/StaffMaternity';
import StaffCompensation from './StaffComponents/StaffCompensation';
import StaffSick from './StaffComponents/StaffSick';
import ViewHRmissingDays from './StaffComponents/ViewHRmissingDays';
import ViewAmmissingDays from './StaffComponents/ViewAmmissingDays';
import CoordinatorHomeCont from './CourseCoordinator/CoordinatorHomeCont';
import SlotLinkingC from './CourseCoordinator/SlotLinkingC';
import CourseSlotsC from './CourseCoordinator/CourseSlotsC';
import AddNewCourseSlot from './CourseCoordinator/AddNewCourseSlot';
import UpdateCourseSlot from './CourseCoordinator/UpdateCourseSlot';
import DeleteCourseSlot from './CourseCoordinator/DeleteCourseSlot';

export default class RoutesWithNav extends Component {
    render() {
        return (
            <Router>
            <div>
            <Navbar />
            <script src="./assets/js/core/jquery.min.js" type="text/javascript"></script>
            <script src="./assets/js/core/popper.min.js" type="text/javascript"></script>
            <script src="./assets/js/core/bootstrap.min.js" type="text/javascript"></script>
            <script src="./assets/js/plugins/bootstrap-switch.js"></script>
            <script src="./assets/js/plugins/nouislider.min.js" type="text/javascript"></script>
            <script src="./assets/js/plugins/moment.min.js"></script>
            <script src="./assets/js/plugins/bootstrap-datepicker.js" type="text/javascript"></script>
            <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
            <script src="./assets/js/paper-kit.min.js" type="text/javascript"></script>
            <link rel="stylesheet" href="/assets/css/paper-kit.css"/>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet"></link>
            
              <Route path="/HomeHR">
                <HomeHR />
              </Route>
              <Route path="/Faculties">
                <Faculties />
              </Route>
              <Route path="/Faculties/AddNewFaculty">
                <AddNewFaculty />
              </Route>
              <Route path="/Faculties/UpdateFaculty">
                <UpdateFaculty />
              </Route>
              <Route path="/Faculties/DeleteFaculty">
                <DeleteFaculty />
              </Route>
              <Route path="/Faculties/Departments">
                <Departments />
              </Route>
              <Route path="/Faculties/Departments/AddNewDepartment">
                <AddNewDepartment />
              </Route>
              <Route path="/Faculties/Departments/UpdateDepartment">
                <UpdateDepartment />
              </Route>
              <Route path="/Faculties/Departments/DeleteDepartment">
                <DeleteDepartment />
              </Route>
              <Route path="/Faculties/Departments/Courses">
                <Courses />
              </Route>
              <Route path="/Faculties/Departments/Courses/AddNewCourse">
                <AddNewCourse />
              </Route>
              <Route path="/Faculties/Departments/Courses/UpdateCourse">
                <UpdateCourse />
              </Route>
              <Route path="/Faculties/Departments/Courses/DeleteCourse">
                <DeleteCourse />
              </Route>
              <Route path="/Staff">
                <Staff />
              </Route>
              <Route path="/Staff/HRstaff">
                <HRstaff />
              </Route>
              <Route path="/Staff/AcademicMembers">
                <AcademicMembers />
              </Route>
              <Route path="/Staff/HRstaff/AddNewHr">
                <AddNewHR />
              </Route>
              <Route path="/Staff/AcademicMembers/AddNewAM">
                <AddNewAM />
              </Route>
              <Route path="/Staff/HRstaff/UpdateHR">
                <UpdateHR />
              </Route>
              <Route path="/Staff/AcademicMembers/UpdateAM">
                <UpdateAM />
              </Route>
              <Route path="/Staff/HRstaff/DeleteHR">
                <DeleteHR />
              </Route>
              <Route path="/Staff/AcademicMembers/DeleteAM">
                <DeleteAM />
              </Route>
              <Route path="/Staff/HRstaff/AttendanceHR">
                <AttendanceHR />
              </Route>
              <Route path="/Staff/AcademicMembers/AttendanceAM">
                <AttendanceAM />
              </Route>
              <Route path="/Staff/HRstaff/Attendance/ViewStaffAttendanceHR">
                <ViewStaffAttendanceHR />
              </Route>
              <Route path="/Staff/AcademicMembers/Attendance/ViewStaffAttendanceAM">
                <ViewStaffAttendanceAM />
              </Route>
              <Route path="/Staff/HRstaff/Attendance/AddSignInHR">
                <AddSignInHR />
              </Route>
              <Route path="/Staff/AcademicMembers/Attendance/AddSignInAM">
                <AddSignInAM />
              </Route>
              <Route path="/Staff/HRstaff/Attendance/AddSignOutHR">
                <AddSignOutHR />
              </Route>
              <Route path="/Staff/AcademicMembers/Attendance/AddSignOutAM">
                <AddSignOutAM />
              </Route>
              <Route path="/Staff/HRstaff/Attendance/ViewStaffWithMissingHoursOrDaysHR">
                <ViewStaffWithMissingHR />
              </Route>
              <Route path="/Staff/AcademicMembers/Attendance/ViewStaffWithMissingHoursOrDaysAM">
                <ViewStaffWithMissingAM />
              </Route>
              <Route path="/Staff/HRstaff/Attendance/StaffLeaves">
                <StaffLeavesHR />
              </Route>
              <Route path="/Staff/HRstaff/Attendance/StaffLeaves/StaffAnnual">
                <StaffAnnual />
              </Route>
              <Route path="/Staff/HRstaff/Attendance/StaffLeaves/StaffAccidental">
                <StaffAccidental />
              </Route>
              <Route path="/Staff/HRstaff/Attendance/StaffLeaves/StaffMaternity">
                <StaffMaternity />
              </Route>
              <Route path="/Staff/HRstaff/Attendance/StaffLeaves/StaffCompensation">
                <StaffCompensation />
              </Route>
              <Route path="/Staff/HRstaff/Attendance/StaffLeaves/StaffSick">
                <StaffSick />
              </Route>
              <Route path="/Staff/HRstaff/Attendance/HRMissingDays">
                <ViewHRmissingDays />
              </Route>
              <Route path="/Staff/AcademicMembers/Attendance/AMMissingDays">
                <ViewAmmissingDays />
              </Route>
              <Route path="/HomeC">
                <CoordinatorHomeCont />
              </Route>
              <Route path="/HomeC/SlotLinkingC">
                <SlotLinkingC />
              </Route>
              <Route path="/HomeC/CourseSlotsC">
                <CourseSlotsC />
              </Route>
              <Route path="/HomeC/CourseSlotsC/AddNewCourseSlot">
                <AddNewCourseSlot />
              </Route>
              <Route path="/HomeC/CourseSlotsC/UpdateCourseSlot">
                <UpdateCourseSlot />
              </Route>
              <Route path="/HomeC/CourseSlotsC/DeleteCourseSlot">
                <DeleteCourseSlot />
              </Route>
            </div>
            </Router>
        )
    }
}
