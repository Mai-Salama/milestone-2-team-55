// import logo from './logo.svg';
// import Whatever from "./Whatever"
import './App.css';
import UpdatedLogin from './UpdatedLogin';
import ChangePasswordAM from './ChangePasswordAM';
import ChangePasswordHR from './ChangePasswordHR';
import {BrowserRouter as Router, Route} from "react-router-dom";
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
import HomeHR from './HomeHR';
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
//Menna's Course Instructor
import HomeInstructor from './CourseInstructor/HomeInstuctor';
import StaffAM from './CourseInstructor/StaffAM';
import Course from './CourseInstructor/Course';
//import Background from './guc.png';
import AssignCourseCoordinator from './CourseInstructor/AssignCourseCoordinator';
import AssignMembertoSlot from './CourseInstructor/AssignMembertoSlot'
import DeleteAssignMembertoSlot from './CourseInstructor/DeleteAssignMembertoSlot';
import UpdateAssignMembertoSlot from './CourseInstructor/UpdateAssignMembertoSlot';
import ViewStaffbyCourse from './CourseInstructor/ViewStaffbyCourse';
import ViewStaffbyDep from './CourseInstructor/ViewStaffbyDep';
import CourseCoverage from './CourseInstructor/CourseCoverage';
import SlotAssignment from './CourseInstructor/SlotAssignment';
import AddStaffMember from './CourseInstructor/AddStaffMember'
import RemoveStaffMember from './CourseInstructor/RemoveStaffMember'
// Mariam's HOD

import Viewstaff from "./hod/Viewstaff"
import Viewstaffdayoff from "./hod/Viewstaffdayoff"
import ViewcoursecoverageHOD from "./hod/ViewcoursecoverageHOD"
import Viewsinglestaffdayoff from "./hod/Viewsinglestaffdayoff"
import Viewstaffbycourse from "./hod/Viewstaffbycourse"
import AssignCI from "./hod/Assigncourseinstructor"
import UpdateCI from "./hod/Updatecourseinstructor"
import DeleteCI from "./hod/Deletecourseinstructor"
import Acceptdayoff from "./hod/Acceptdayoff"
import Rejectdayoff from "./hod/Rejectdayoff"
import Acceptslotlinking from "./hod/Acceptslotlinking"
import Rejectslotlinking from "./hod/Rejectslotlinking"
import AcceptAnnualLeaveHOD from "./hod/AcceptAnnualLeaveHOD"
import RejectAnnualLeaveHOD from "./hod/RejectAnnualLeaveHOD"
import Acceptreplacement from "./hod/Acceptreplacement"
import Rejectreplacement from "./hod/Rejectreplacement"
import AcceptCompensationLeaveHOD from "./hod/AcceptCompensationLeaveHOD"
import RejectCompensationLeaveHOD from "./hod/RejectCompensationLeaveHOD"
import AcceptAccidentalLeaveHOD from "./hod/AcceptAccidentalLeaveHOD"
import RejectAccidentalLeaveHOD from "./hod/RejectAccidentalLeaveHOD"
import AcceptMaternityLeaveHOD from "./hod/AcceptMaternityLeaveHOD"
import AcceptSickLeaveHOD from "./hod/AcceptSickLeaveHOD"
import RejectSickLeaveHOD from "./hod/RejectSickLeaveHOD"
import RejectMaternityLeaveHOD from "./hod/RejectMaternityLeaveHOD"
import Viewsickleave from "./hod/Viewsickleave"
 import Viewannual from "./hod/Viewannual"
import Viewaccidental from "./hod/Viewaccidental"
 import Viewmaternity from "./hod/Viewmaternity"
 import Viewcompensation from "./hod/Viewcompensation"
import viewdayoffrequests from "./hod/Viewdayoffrequests"
import viewreplacement from "./hod/Viewreplacementrequests"
import Viewslotlinkingrequests from "./hod/Viewslotlinkingrequests"
import HODhomepage from "./hod/HODhomepage"
import Viewcourseassignment from "./hod/Viewcourseassignment"
import Submitted from "./hod/Submitted"

function App() {
  const DefaultContainer = ()=>(
    <div>
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
    
      <Route path="/Home">
        <HomeHR />
      </Route>
      <Route path="/Home/Faculties">
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
      <Route path="/HomeC" component={CoordinatorHomeCont} />
        
      <Route path="/SlotLinkingC" component={SlotLinkingC} />

      <Route path="/CourseSlotsC" component={CourseSlotsC} />
    
      <Route path="/HomeC/CourseSlotsC/AddNewCourseSlot">
        <AddNewCourseSlot />
      </Route>
      <Route path="/HomeC/CourseSlotsC/UpdateCourseSlot">
        <UpdateCourseSlot />
      </Route>
      <Route path="/HomeC/CourseSlotsC/DeleteCourseSlot">
        <DeleteCourseSlot />
      </Route>
      {/* /** Menna's Routes */ }
      <Route path="/HomeInstructor" component={HomeInstructor}/>
       <Route path="/StaffAM" component={StaffAM}/>
       <Route path="/Course" component={Course}/>
       <Route path="/StaffAM/AddStaffMember" component={AddStaffMember}/>
       <Route path="/StaffAM/RemoveStaffMember" component={RemoveStaffMember}/>
       <Route path="/StaffAM/AssignCourseCoordinator" component={AssignCourseCoordinator}/>
       <Route path="/Course/AssignMembertoSlot" component={AssignMembertoSlot}/>
       <Route path="/Course/DeleteAssignMembertoSlot" component={DeleteAssignMembertoSlot}/>
       <Route path="/Course/UpdateAssignMembertoSlot" component={UpdateAssignMembertoSlot}/>
       <Route path="/Course/CourseCoverage" component={CourseCoverage}/>
       <Route path="/Course/SlotAssignment" component={SlotAssignment}/>
       <Route path="/StaffAM/ViewStaffbyDep" component={ViewStaffbyDep}/>
       <Route path="/StaffAM/ViewStaffbyCourse" component={ViewStaffbyCourse}/>


       {/* Mariam's Routes  */}
    
       <Route path="/Viewstaff" component={Viewstaff}/>
    <Route path="/Viewstaffdayoff" component={Viewstaffdayoff}/>
    <Route path="/Viewsinglestaffdayoff" component={Viewsinglestaffdayoff}/>
    <Route path="/Viewstaffbycourse" component={Viewstaffbycourse}/>
    <Route path="/ViewcoursecoverageHOD" component={ViewcoursecoverageHOD}/>
    <Route path="/Assigncourseinstructor" component={AssignCI}/>
    <Route path="/Updatecourseinstructor" component={UpdateCI}/>
    <Route path="/Deletecourseinstructor" component={DeleteCI}/>
    <Route path="/Acceptdayoff" component={Acceptdayoff}/>
    <Route path="/Rejectdayoff" component={Rejectdayoff}/>
    <Route path="/Acceptslotlinking" component={Acceptslotlinking}/>
    <Route path="/Rejectslotlinking" component={Rejectslotlinking}/>
    <Route path="/AcceptAnnualLeaveHOD" component={AcceptAnnualLeaveHOD}/>
    <Route path="/RejectAnnualLeaveHOD" component={RejectAnnualLeaveHOD}/>
    <Route path="/Viewcompensation" component= {Viewcompensation}/>
    <Route path="/Viewmaternity" component= {Viewmaternity}/>
    <Route path="/Acceptreplacement" component={Acceptreplacement}/>
    <Route path="/Rejectreplacement" component={Rejectreplacement}/>
    <Route path="/AcceptCompensationLeaveHOD" component={AcceptCompensationLeaveHOD}/>
    <Route path="/RejectCompensationLeaveHOD" component={RejectCompensationLeaveHOD}/>
    <Route path="/AcceptAccidentalLeaveHOD" component={AcceptAccidentalLeaveHOD}/>
    <Route path="/RejectAccidentalLeaveHOD" component={RejectAccidentalLeaveHOD}/>
    <Route path="/Viewdayoffrequests" component={viewdayoffrequests}/>
    <Route path="/Viewreplacementrequests" component={viewreplacement}/>
    <Route path="/Viewannual" component= {Viewannual}/>
    <Route path="/Viewaccidental" component= {Viewaccidental}/>
    <Route path="/Viewslotlinkingrequests" component={Viewslotlinkingrequests}/>
    <Route path="/Viewcourseassignment" component={Viewcourseassignment}/>
  
    <Route path="/HODhomepage" component={HODhomepage}/>
    <Route path="/RejectMaternityLeaveHOD" component={RejectMaternityLeaveHOD}/>
    <Route path="/AcceptMaternityLeaveHOD" component={AcceptMaternityLeaveHOD}/>
    <Route path="/AcceptSickLeaveHOD" component={AcceptSickLeaveHOD}/>
    <Route path="/RejectSickLeaveHOD" component={RejectSickLeaveHOD}/>
    <Route path="/Submitted" component={Submitted}/>
    <Route path="/Viewsickleave" component= {Viewsickleave}/>


    </div>
  )
  const LoginContainer = () =>(
    <div>
      <Route path="/login">
        <UpdatedLogin />
      </Route>
      <Route path="/ChangePasswordAM">
        <ChangePasswordAM />
      </Route>
      <Route path="/ChangePasswordHR">
        <ChangePasswordHR />
      </Route>
    </div>
  )
  return (
    <div>
    <Router>
      <Route component={LoginContainer}/>
      <Route component={DefaultContainer}/>
    </Router>
    </div>
    
    
    
  );
}

export default App;
