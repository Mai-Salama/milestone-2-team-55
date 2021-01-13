const express= require('express');
const mongoose= require ('mongoose'); 
const portal = express();
const bcryptjs=require('bcryptjs');
const jwt =require('jsonwebtoken');
const PORT = 3001;

portal.get("/tryingWhatever", (req,res)=>{
    res.send("whatever hopefully works");
});

portal.listen(PORT,()=>{
    console.log(`this server is running on port ${PORT}`);
});

const Members = require('./models/AcademicMember');
const HrMembers = require('./models/HrMembers');
const ReplacementRequest = require('./models/ReplacementRequest');
const MaternityRequest = require('./models/MaternityRequest');
const CompensationRequest = require('./models/CompensationRequest');
const slotLinkingRequests = require('./models/SlotLinkingRequest');
const Faculties = require('./models/Faculties');
const AnnulaLeave = require('./models/AnnualLeave');
const AccidentalLeave = require('./models/SickLeave');
const SickLeave = require('./models/SickLeave');
const AcademicMember = require('./models/AcademicMember');
const Location = require('./models/Location');
const AnnualLeave = require('./models/AnnualLeave');
const AccidentalLeaves = require('./models/AccidentalLeaves');
const SlotLinkingRequest = require('./models/SlotLinkingRequest');
const Availability = require('./models/Availability');
const { findOne } = require('./models/AcademicMember');

portal.use(express.json());
portal.use(express.urlencoded({extended:false}));

const url = "mongodb+srv://ahaDB:ACLaha123@portal.lrdfl.mongodb.net/ahaDB?retryWrites=true&w=majority";
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true
}
mongoose.connect(url,connectionParams).then(()=>{
    console.log("db is successfuly connected")
}).catch((error)=>{
    console.log(error)
});


portal.get('/login',(req,res)=>{
   res.send(login);  
});

portal.post('/login',(req,res)=>{
    //check if the user exists
    //check el username w el password 
});
 //AcademicMember.findOne({id: 1}).sort(last_mod,1).run(function(err,doc){ let lastMem = doc.last_mod});

portal.post('/register', async(req,res)=>{ 
    try{
        var count ;
        let ID;
        count= await AcademicMember.countDocuments();
        console.log(count);
      if (count == 0){
          ID = "ac-1";
         console.log("first member");
     }
     else{
         let fid = count + 1;
          ID = "ac-" +fid;
         console.log("added member");
     }
    const mem = new AcademicMember({
        id:ID,
        name:req.body.name,
        email:req.body.email,
        salary:req.body.salary,
        dayoff:req.body.dayoff,
        gender: req.body.gender,
        /**annualLeave:req.body.annualLeave,
        accidentalLeave:req.body.accidentalLeave,
        maternityLeave:req.body,
        sickLeave:{type:Number},
        scheduleFlag:{type:Boolean},
        office:{type:String},
        defaultSchedule: schedule,
        nextWeekUpdated: schedule,
        thisWeekUpdated: schedule **/
    });
    await mem.save();
    res.send("registration successful");}
    catch(err){
        console.log(err);
    }
});
let requestStatus = 0;
//portal.post('./leaves/viewRequests', async(req,res) =>{
   // requestStatus = await req.body.reqStatus;
  //  return requestStatus;
//});
//let requests;
portal.post('/simpleLogin',async(req,res)=>{
    const{email, password} = req.body;
    const HRfound= await HrMembers.findOne({email:email});
    res.send("email : " + HRfound.AttendanceRecords);
});


portal.post('/loginHR',async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({msg:"Please Enter valid email or password"});
        }
        let HRfound = null;
        let AMfound = null;
        let roleToSend;
        HRfound= await HrMembers.findOne({email:email});
        if(!HRfound){
            AMfound = await AcademicMember.findOne({email:email});
            console.log(AMfound.id);
        }
        if(!HRfound && !AMfound){
            return res.status(400).json({msg:"User is not registered"});
        }
        let notReset;
        const salt = await bcryptjs.genSalt();
        const hashedDefault = await bcryptjs.hash("123456",salt);
        const passNotReset = await bcryptjs.compare(password,hashedDefault);
        if(passNotReset){
            notReset = true;
        }
        else{
            let isMatched = null;
            if(HRfound){
                isMatched=await bcryptjs.compare(password,HRfound.password);
            }
            if(AMfound){
                console.log(AMfound.password);
                isMatched = await bcryptjs.compare(password,AMfound.password);

                
            }
            if(!isMatched){
            return res.status(400).json({msg:"Invalid credentials"});
            }
        }
    console.log("reached here");
        const key="RandomString";
        let payload;
        if(HRfound){
            payload = {id:HRfound.id, email: HRfound.email, role:"HR"};
            roleToSend = "HR";
        }
        if(AMfound){
            payload = {id:AMfound.id, email:AMfound.email, role:"AM"};
            roleToSend = "AM";
        }
        const token = jwt.sign(payload,key);
        res.header('x-auth-token', token);
        if(notReset){
            let reset = "notreset";
            res.send({roleToSend, reset});
            console.log(res.getHeaders());
       } 
       else{
           let reset = "reset";
           res.send({roleToSend, reset});
       } 
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});


const authH = (req,res,next)=>{//called it authH to authenticate HR
    try{
            console.log("in authH");
            console.log(req.header('x-auth-token'));
             const token=req.header('x-auth-token');
             if(!token){//no token
                return res.status(401).json({msg: "mafeesh token"});
            }
             const JWT_Password="RandomString";
 
             //const JWT_Password="";
             const verified = jwt.verify(token,JWT_Password);//what's returned in verified?? decoded token
           //  console.log(verified);
             if(!verified){
                 return res.status(401).json({msg:"authorization failed"});
             }
             req.user=verified.id;//eh req.user??
             next();//eh next di ana nasya
    }
    catch(error){
     res.status(500).json({error:error.message});
    }
 }

portal.post('/changePasswordHR',authH,async(req,res)=>{
    try{
        const {body} = req;
        let password = req.body.password;
        const salt = await bcryptjs.genSalt();
        const passwordHashed = await bcryptjs.hash(password,salt);
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        const HRfound= await HrMembers.findOne({id:verified.id});
        await HrMembers.updateOne({"id" : HRfound.id},{$set: {"password" : passwordHashed}});
        res.send("Password changed successfully");
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

portal.post('/changePasswordAM',authH,async(req,res)=>{
    try{

        let password = req.body.password;
        const salt = await bcryptjs.genSalt();
        const passwordHashed = await bcryptjs.hash(password,salt);
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
   
        const AMfound = await AcademicMember.findOne({id: verified.id});
        
       
       await  AcademicMember.updateOne({"id" : AMfound.id},{$set: {"password" : passwordHashed}});
        res.send("Password changed successfully");
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

portal.post('/loginAcademic',async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
           return res.status(400).json({msg:"Please Enter valid email or password"});
       }
       const AMfound= await AcademicMember.findOne({email:email});
       if(!AMfound){
           return res.status(400).json({msg:"User is not registered"});
       }
       const salt = await bcryptjs.genSalt();
        const hashedDefault = await bcryptjs.hash("123456",salt);
       let notReset;
       const passNotReset = await bcryptjs.compare(password,hashedDefault);
       if(passNotReset){
           notReset = true;
       }
       else{
        const isMatched=await bcryptjs.compare(password,AMfound.password);
        if(!isMatched){
            return res.status(400).json({msg:"Invalid credentials"});
        }
    }
       const key="RandomString";
       const payload = {id:AMfound.id, email:AMfound.email, role:"AM"};
       const token = jwt.sign(payload,key);
    //   console.log(token);
    //   res.json({token,user:{
    //     id:AMfound._id,
    //      email:AMfound.email,
    //      //do we need something to indicate that this is an acamedic member not HR??
    //    }});
    res.header('x-auth-token', token);
  //  console.log(token);
  await AcademicMember.updateOne({"email":AMfound.email},{$set:{"token":1}});
       if(notReset){
        console.log(token);
        res.send("Login successful. Update your password");
        //res.redirect('/changePasswordAM');
       }   
       else{
           res.send("Login successfully");
       } 
    }
    catch(error){
       res.status(500).json({error:error.message});
    }
})

    portal.get('/leaves/viewRequests/accepted', async(req,res)=>{
       const requests = await AcademicMember.find({id:'ac-1'});
        res.send(requests);
    });

    portal.get('/viewAllAttendanceRecords',authH,async(req,res)=>{
        try{
            const JWT_Password = "RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            if(verified.role == "HR"){
                const HRfound= await HrMembers.findOne({id:verified.id});
                res.send(HRfound.AttendanceRecords);
            }
            if(verified.role == "AM"){
                const AMfound = await AcademicMember.findOne({id:verified.id});
                res.send(AMfound.AttendanceRecords);
            }
        }
        catch(err){
            console.log(err);
        }
    });

    portal.post('/addfaculty',authH,async(req,res)=>{
        try{
            const {name}= req.body;
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            if(!name){
                return res.status(400).json({msg:"Please Enter valid email or password"});
            }
            if(verified.role=="HR"){
                var count ;
                let ID;
                count= await Faculties.countDocuments();
                console.log(count);
              if (count == 0){
                  ID = 1;
            //edited here
             }
             else{
                 let fid = count + 1;
                  ID = fid;
                  console.log(fid);
                  //edited here
             }
             console.log(name);
             const faculty = new Faculties({
                 _id:null,
                 id:ID,
                 name: name
             }, {sparse: true});
           await faculty.save();
           res.send("added faculty ");
            }
        }
        catch(err){
            console.log(err);
        }
    });
    portal.post('/deletefaculty',authH,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            console.log(req.body.facultyname);
            if(verified.role=="HR"){
              await Faculties.deleteOne({"name":req.body.facultyname});
                res.send("faculty deleted");
            }
        }
        catch(err){
            console.log(err);
        }
    });
    portal.post('/updatefaculty',authH,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            if(verified.role=="HR"){
              await   Faculties.updateOne({"name":req.body.facultyname},{$set:{"name":req.body.newfacultyname}});
                res.send("faculty updated");
            }
        }
        catch(err){
            console.log(err);
        }
    });

    portal.post('/adddepartment',authH,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
          const fac=  await Faculties.findOne({"name":req.body.facultyname});
            if(verified.role=="HR"){
                var count ;
                let ID;
                count= await fac.departments.length;
                console.log(count);
              if (count == 0){
                  ID = 1;
                 console.log("first department congrats");
             }
             else{
                 let fid = count + 1;
                  ID = fid;
                 console.log("added department");
             }
             const department ={
                 id:ID,
                 name:req.body.name,
                 HOD:req.body.HODid
             }
             await  AcademicMember.updateOne({"id":req.body.HODid},{$set:{"HOD":1}});     
             await Faculties.updateOne({"name":req.body.facultyname},{$push:{"departments":department}});
            res.send(department);
            }
        }
        catch(err){
            console.log(err);
        }
    });
    
    portal.post('/deletedepartment',authH,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            if(verified.role=="HR"){
                const fac=await Faculties.findOne({"name":req.body.facultyname});
                let i=0;
                for (i=0;i<fac.departments.length;i++){
                    if(fac.departments[i].id==req.body.departmentid){
                        await AcademicMember.updateOne({"id":fac.departments[i].HOD},{$set:{"HOD":0}});
                        await Faculties.updateOne({"name":req.body.facultyname},{$pull:{"departments":fac.departments[i]}});
                    }
                }
            
            res.send("department deleted");
            }
        }
        catch(err){
            console.log(err);
        }
    });
    portal.post('/updatedepartment',authH,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            if(verified.role=="HR"){
                const fac=await Faculties.findOne({"name":req.body.facultyname});
                //const oldhod= await AcademicMember.findOne({"id":fac.HOD});
                const newhod= await AcademicMember.findOne({"id":req.body.newhodid});
                let i=0;
                for (i=0;i<fac.departments.length;i++){
                    if(fac.departments[i].id==req.body.departmentid){
                        await AcademicMember.updateOne({"id":fac.departments[i].HOD},{$set:{"HOD":0}});
                       await AcademicMember.updateOne({"id":req.body.newhodid},{$set:{"HOD":1}});
                        fac.departments[i].HOD=req.body.newhodid;
                        fac.departments[i].name=req.body.name;
                        await fac.save();
                        //await Faculties.updateOne({"name":req.body.facultyname},{$set:{"departments[i].HOD":req.body.newhodid}});
                    }
                }
                res.send("department updated");
            }
        }
        catch(err){
            console.log(err);
        }
    });

    portal.post('/addcourse',authH,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            if(verified.role=="HR"){
                const course={
                    "id":req.body.id,
                    "name":req.body.name,
                    "NoOfSlots":req.body.NoOfSlots
                };
                //res.send(course);
                await Faculties.updateOne({"name":req.body.facultyname,"departments.id":req.body.departmentid},{$push:{"departments.$.courses":course}});
             //  const fac= await Faculties.findOne({"name":req.body.facultyname,"departments.id":req.body.departmentid});
               const fac= await Faculties.findOne({"name":req.body.facultyname});
                           let i=0;
                           let j=0;
                           for(i=0;i<fac.departments.length;i++){
                               if(fac.departments[i].id==req.body.departmentid){
                                for (j=0;j<fac.departments[i].courses.length;j++){
                                   
                                    if(fac.departments[i].courses[j].id==req.body.id){  //got course
                                      
                                        const courseschedsat ={
                                                 day:"Saturday"
                                        
                                              }
                                         const courseschedsun ={
                                              day:"Sunday"
                                                           
                                               }
                                               const courseschedmon ={
                                                day:"Monday"
                                                             
                                                 }
                                                const courseschedtue ={
                                                  day:"Tuesday"
                                                                   
                                                  }
                                                  const courseschedwed ={
                                                    day:"Wednesday"
                                                                     
                                                    }
                                                    const courseschedthurs ={
                                                        day:"Thursday"
                                                                         
                                                        }
                                                       
                                        // fac.departments[i].courses[j].courseSchedule=coursesched;
                                    //   let coursescount=fac.departments[i].courses[j].courseSchedule.length;
                                 fac.departments[i].courses[j].courseSchedule[0]=courseschedsat;
                                 fac.departments[i].courses[j].courseSchedule[1]=courseschedsun;
                                 fac.departments[i].courses[j].courseSchedule[2]=courseschedmon;
                                 fac.departments[i].courses[j].courseSchedule[3]=courseschedtue;
                                 fac.departments[i].courses[j].courseSchedule[4]=courseschedwed;
                                 fac.departments[i].courses[j].courseSchedule[5]=courseschedthurs;
                                // console.log(fac.departments[i].courses[j].courseSchedule[0]);             
                                    }
                                }
                            }
                        }
                        await fac.save(); 
                    }
                }
        catch(err){
            console.log(err);
        }
    });
    portal.post('/deletecourse',authH,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            if(verified.role=="HR"){
                const course={
                    "id":req.body.id
                };
                await Faculties.updateOne({"name":req.body.facultyname,"departments.id":req.body.departmentid},{$pull:{"departments.$.courses":course}});
            }
    
        }
        catch(err){
            console.log(err);
        }
    });
    
    portal.post('/updatecourse',authH,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            if(verified.role=="HR"){
    
                const fac= await Faculties.findOne({"name":req.body.facultyname});
                let i=0;
                let j=0;
                for(i=0;i<fac.departments.length;i++){
                     for (j=0;j<fac.departments[i].courses.length;j++){
                         if(fac.departments[i].courses[j].id==req.body.courseid){
                         fac.departments[i].courses[j].name=req.body.coursename;
                           fac.departments[i].courses[j].NoOfSlots=req.body.NoOfSlots;
                            // fac.departments[i].courses[j].TAs=["ac-1","ac-2","ac-3"];
                             await fac.save();
                             res.send("check");
                } 
            }   
    }       
        }
    }
        catch(err){
            console.log(err);
        }
    });

    portal.post('/addHR',authH,async(req,res)=>{
        const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            if(verified.role=="HR"){
    
            try{
                let members = await HrMembers.find({});
                let lastOne = members.length-1;
              if (lastOne+1 == 0){
                  ID = "hr-1";
                 console.log("first HR member");
             }
             else{
                let fid = members[lastOne].id;
                let end = fid.length;
                let idNumber = fid.substring(3,end);
                idNumber = parseInt(idNumber,10) + 1;
                ID = "hr-" +idNumber;
                console.log("added HR member");
            }
             const salt = await bcryptjs.genSalt();
             const hashedDefault = await bcryptjs.hash("123456",salt);
             const loc = await Location.findOne({"roomNo":req.body.office});
             if(loc.currentcapacity==loc.capacity){
                 res.send("This office is full please choose another office ");   
             }
             else {
                await Location.updateOne({"roomNo":req.body.office},{$set:{"currentcapacity":loc.currentcapacity+1}});
    
               const mem = new HrMembers({
                   id:ID,
                   name:req.body.name,
                   email:req.body.email,
                   password:hashedDefault,
                   salary:req.body.salary,
                   office:req.body.office,
                   gender: req.body.gender,
                   accidentalLeave: 6
               });
        
            await mem.save();
            res.send("registration successful");}
            }
            catch(err){
                console.log(err);
            }
        }})
        
    
        portal.post('/addAM',authH,async(req,res)=>{
            const JWT_Password="RandomString";
                const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
                if(verified.role=="HR"){
        
                try{
                    let members = await AcademicMember.find({});
                    let lastOne = members.length-1;
                  if (lastOne+1 == 0){
                      ID = "ac-1";
                     console.log("first academic member");
                 }
                 else{
                    let fid = members[lastOne].id;
                    let end = fid.length;
                    let idNumber = fid.substring(3,end);
                    idNumber = parseInt(idNumber,10) + 1;
                    ID = "ac-" +idNumber;
                    console.log("added academic member");
                }
                 const salt = await bcryptjs.genSalt();
              const hashedDefault = await bcryptjs.hash("123456",salt);
              const loc = await Location.findOne({"roomNo":req.body.office});
              if(loc.currentcapacity==loc.capacity){
                  res.send("This office is full please choose another office "); 
              }
              else {
                await   Location.updateOne({"roomNo":req.body.office},{$set:{"currentcapacity":loc.currentcapacity+1}});
    
                const mem = new AcademicMember({
                    id:ID,
                    name:req.body.name,
                    email:req.body.email,
                    password:hashedDefault,
                    salary:req.body.salary,
                    dayoff:req.body.dayoff,
                    gender: req.body.gender,
                    faculty:req.body.faculty,
                    department:req.body.department,
                    office:req.body.office,
                    accidentalLeave:6
                });
                const courseschedsat ={
                    day:"Saturday"
           
                 }
            const courseschedsun ={
                 day:"Sunday"
                              
                  }
                  const courseschedmon ={
                   day:"Monday"
                                
                    }
                   const courseschedtue ={
                     day:"Tuesday"
                                      
                     }
                     const courseschedwed ={
                       day:"Wednesday"
                                        
                       }
                       const courseschedthurs ={
                           day:"Thursday"
                                            
                           }
                          
           // fac.departments[i].courses[j].courseSchedule=coursesched;
       //   let coursescount=fac.departments[i].courses[j].courseSchedule.length;
    mem.Schedule[0]=courseschedsat;
    mem.Schedule[1]=courseschedsun;
    mem.Schedule[2]=courseschedmon;
    mem.Schedule[3]=courseschedtue;
    mem.Schedule[4]=courseschedwed;
    mem.Schedule[5]=courseschedthurs;
                await mem.save();
                res.send("registration successful");}
            }
                catch(err){
                    console.log(err);
                }
            }});
portal.post('/updateHR',authH,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        if(verified.role=="HR" && verified.id != req.body.id){
            const hr= await HrMembers.findOne({"id":req.body.id});
            const currentloc=await Location.findOne({"roomNo":hr.office});
            const newloc=await Location.findOne({"roomNo":req.body.office});
            if(currentloc==newloc){ //same office
                await HrMembers.updateOne({"id":req.body.id},{$set:{"name":req.body.name,"gender":req.body.gender,"extrainfo":req.body.extrainfo,"salary":req.body.salary,"office":req.body.office}})
            }
            else {  //different offices
                if(newloc.currentcapacity==newloc.capacity){
                    res.send("this office is full please choose another office");
                }
                else {
                    await Location.updateOne({"roomNo":currentloc.roomNo},{$set:{"currentcapacity":currentloc.currentcapacity-1}}); //remove hr from past office
                    await Location.updateOne({"roomNo":newloc.roomNo},{$set:{"currentcapacity":newloc.currentcapacity+1}}); //add hr to new office
                    await HrMembers.updateOne({"id":req.body.id},{$set:{"name":req.body.name,"gender":req.body.gender,"extrainfo":req.body.extrainfo,"salary":req.body.salary,"office":req.body.office}})
                }
            }
            
        }
    }
    catch(err){
        console.log(err);
    }
});
            portal.post('/updateAM',authH,async(req,res)=>{
                try{
                    const JWT_Password="RandomString";
                    const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
                    if(verified.role=="HR"){
                     const am= await AcademicMember.findOne({"id":req.body.id});
                     const currentloc=await Location.findOne({"roomNo":am.office});
                     const newloc=await Location.findOne({"roomNo":req.body.office});
                     if(currentloc==newloc){ //same office
                     await AcademicMember.updateOne({"id":req.body.id},{$set:{"name":req.body.name,"gender":req.body.gender,"extrainfo":req.body.extrainfo,"salary":req.body.salary,"office":req.body.office,"department":req.body.departmentname,"faculty":req.body.facultyname}})
                      }
                      else {  //different offices
                        if(newloc.currentcapacity==newloc.capacity){
                            res.send("this office is full please choose another office");
                        }
                        else {
                    await Location.updateOne({"roomNo":currentloc.roomNo},{$set:{"currentcapacity":currentloc.currentcapacity-1}}); //remove hr from past office
                    await Location.updateOne({"roomNo":newloc.roomNo},{$set:{"currentcapacity":newloc.currentcapacity+1}}); //add hr to new office
                    await AcademicMember.updateOne({"id":req.body.id},{$set:{"name":req.body.name,"gender":req.body.gender,"extrainfo":req.body.extrainfo,"salary":req.body.salary,"office":req.body.office,"department":req.body.departmentname,"faculty":req.body.facultyname}});
                        }
                      }
            
                    }
                }
                catch(err){
                    console.log(err);
                }
            });
            portal.post('/deleteAM',authH,async(req,res)=>{
                try{
                    const JWT_Password="RandomString";
                    const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
                    if(verified.role=="HR"){
                        const am= await AcademicMember.findOne({"id":req.body.id});
                        console.log(am);
                        const loc=await Location.findOne({"roomNo":am.office});
                        await Location.updateOne({"roomNo":am.office},{$set:{"currentcapacity":loc.currentcapacity-1}});
                      await   AcademicMember.deleteOne({"id":req.body.id});
            
                    }
                }
                catch(err){
                    console.log(err);
                }
            });
            portal.post('/deleteHR',authH,async(req,res)=>{
                try{
                    const JWT_Password="RandomString";
                    const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
                    if(verified.role=="HR"){
                     const hr= await HrMembers.findOne({"id":req.body.id});
                     const loc=await Location.findOne({"roomNo":hr.office});
                        console.log(hr.office);
                     await Location.updateOne({"roomNo":hr.office},{$set:{"currentcapacity":loc.currentcapacity-1}});
                    await   HrMembers.deleteOne({"id":req.body.id});
                    }
                }
                catch(err){
                    console.log(err);
                }
            });

portal.get('/viewStaffRequestsHRannual', authH,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
    const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
    if(verified.id == "hr-1"){
        const FirstHr = await HrMembers.findOne({id: verified.id});
        let requests = [];
        for(let i = 0; i < FirstHr.annualLeaverequests.length; i++){
            requests.push(FirstHr.annualLeaverequests[i]);
        }
        res.send(requests);
    }
    else{
        res.send("You're not allowed to access this page");
    }
    }
    catch(err){
        console.log(err);
    }
});


portal.get('/viewStaffRequestsHRaccidental', authH,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
    const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
    if(verified.id == "hr-1"){
        const FirstHr = await HrMembers.findOne({id: verified.id});
        let requests = [];
        for(let i = 0; i < FirstHr.accidentalLeaverequests.length; i++){
            requests.push(FirstHr.accidentalLeaverequests[i]);
        }
        res.send(requests);
    }
    else{
        res.send("You're not allowed to access this page");
    }
    }
    catch(err){
        console.log(err);
    }
});


portal.get('/viewStaffRequestsHRmaternity', authH,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
    const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
    if(verified.id == "hr-1"){
        const FirstHr = await HrMembers.findOne({id: verified.id});
        let requests = [];
        for(let i = 0; i < FirstHr.maternityLeaverequests.length; i++){
            requests.push(FirstHr.maternityLeaverequests[i]);
        }
        res.send(requests);
    }
    else{
        res.send("You're not allowed to access this page");
    }
    }
    catch(err){
        console.log(err);
    }
});


portal.get('/viewStaffRequestsHRcompensation', authH,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
    const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
    if(verified.id == "hr-1"){
        const FirstHr = await HrMembers.findOne({id: verified.id});
        let requests = [];
        for(let i = 0; i < FirstHr.compensationrequests.length; i++){
            requests.push(FirstHr.compensationrequests[i]);
        }
        res.send(requests);
    }
    else{
        res.send("You're not allowed to access this page");
    }
    }
    catch(err){
        console.log(err);
    }
});

portal.get('/viewStaffRequestsHRsick', authH,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
    const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
    if(verified.id == "hr-1"){
        const FirstHr = await HrMembers.findOne({id: verified.id});
        let requests = [];
        for(let i = 0; i < FirstHr.sickLeaverequests.length; i++){
            requests.push(FirstHr.sickLeaverequests[i]);
        }
        res.send(requests);
    }
    else{
        res.send("You're not allowed to access this page");
    }
    }
    catch(err){
        console.log(err);
    }
});

portal.post('/AcceptAnnualLeaveHR', authH,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        const firstHr = await HrMembers.findOne({id: "hr-1"});
        if(verified.id != "hr-1"){
            return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
        }
        else{
            console.log(req.body.reqID);
            const request = await AnnualLeave.findOne({req_id: req.body.reqID});
            console.log(request);
            const reqs = await AnnualLeave.find({});
            const requester = await HrMembers.findOne({id: request.id});
            if(!request){
                return res.status(400).json({msg:"Request wasn't found in the database"});
            }
            else{
                await AnnualLeave.updateOne({req_id: req.body.reqID}, {status: 1});
                 //remove from HR's list
                 for(let i = 0; i < firstHr.annualLeaverequests.length; i++){
                    if(firstHr.annualLeaverequests[i].req_id == req.body.reqID){
                        firstHr.annualLeaverequests.splice(i,1);
                    }
                }
                requester.annualdays = requester.annualdays - 1;
                await firstHr.save();
                await requester.save();
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

portal.post('/RejectAnnualLeaveHR', authH,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        const firstHr = await HrMembers.findOne({id: "hr-1"});
        if(verified.id != "hr-1"){
            return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
        }
        else{
            const request = await AnnualLeave.findOne({req_id: req.body.reqID});
            if(!request){
                return res.status(400).json({msg:"Request wasn't found in the database"});
            }
            else{
                await AnnualLeave.updateOne({req_id: req.body.reqID}, {status: 2});
                 //remove from HR's list
                 for(let i = 0; i < firstHr.annualLeaverequests.length; i++){
                    if(firstHr.annualLeaverequests[i].req_id == req.body.reqID){
                        firstHr.annualLeaverequests.splice(i,1);
                    }
                }
                await firstHr.save();
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

portal.post('/AcceptCompensationLeaveHR', authH,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        const requester = await HrMembers.findOne({id: req.body.id});
        const firstHr = await HrMembers.findOne({id: verified.id});
        const todaysDate = new Date();
        if(verified.id != "hr-1"){
            return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
        }
        else{
            const request = await CompensationRequest.findOne({req_id: req.body.reqID});
            if(!request){
                return res.status(400).json({msg:"Request wasn't found in the database"});
            }
            else{
                await CompensationRequest.updateOne({req_id: req.body.reqID}, {$set:{status: 1}});
                 for(let i = 0; i < firstHr.compensationrequests.length; i++){
                    if(firstHr.compensationrequests[i].req_id == req.body.reqID){
                        firstHr.compensationrequests.splice(i,1);
                    }
                }
                await firstHr.save();
                //add an attendance record to the requester
                const todaysRecord = {"day":todaysDate.getDay(), "date": request.date, "month": request.month, "hours": 8, "minutes":24};
                await HrMembers.updateOne({"id": requester.id},{$push: {'AttendanceRecords': todaysRecord}});
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

portal.post('/RejectCompensationLeaveHR', authH,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        const requester = await HrMembers.findOne({id: req.body.id});
        const firstHr = await HrMembers.findOne({id: "hr-1"});
        if(verified.id != "hr-1"){
            return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
        }
        else{
            const request = await CompensationRequest.findOne({req_id: req.body.reqID});
            if(!request){
                return res.status(400).json({msg:"Request wasn't found in the database"});
            }
            else{
                await CompensationRequest.updateOne({req_id: req.body.reqID}, {status: 2});
                 console.log(firstHr.compensationrequests.lengh);
                 for(let i = 0; i < firstHr.compensationrequests.length; i++){
                    if(firstHr.compensationrequests[i].req_id == req.body.reqID){
                        console.log(i);
                        delete firstHr.compensationrequests[i];
                        console.log("deleted");
                    }
                }
                //await HrMembers.updateOne({$pull:{'id': "hr-1", 'compensationrequests': {'$elemMatch': {'req_id': req.body.reqID}}}});
                await firstHr.save();
                
            }
        }
    }
    catch(err){
        console.log(err);
    }
});
    
portal.post('/AcceptAccidentalLeaveHR', authH,async(req,res)=>{
    try{
        console.log("here");
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        const firstHr = await HrMembers.findOne({id:"hr-1"});
        if(verified.id != "hr-1"){
            return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
        }
        else{
            console.log("first HR");
            const request = await AccidentalLeaves.findOne({req_id: req.body.reqID});
            const requester = await HrMembers.findOne({id: request.id});
            if(!request){
                return res.status(400).json({msg:"Request wasn't found in the database"});
            }
            else{
                console.log("yarab");
                const up = await AccidentalLeaves.updateOne({req_id: req.body.reqID}, {status: 1});
                console.log(up);
                //remove from HOD's list
                for(let i = 0; i < firstHr.accidentalLeaverequests.length; i++){
                    if(firstHr.accidentalLeaverequests[i].req_id == req.body.reqID){
                        firstHr.accidentalLeaverequests.splice(i,1);
                    }
                }
                requester.accidentalLeave = requester.accidentalLeave - 1;
                await requester.save();
                await firstHr.save();
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

portal.post('/RejectAccidentalLeaveHR', authH,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        const firstHr = await HrMembers.findOne({id:"hr-1"});
        if(verified.id != "hr-1"){
            return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
        }
        else{
            const request = await AccidentalLeaves.findOne({req_id: req.body.reqID});
            if(!request){
                return res.status(400).json({msg:"Request wasn't found in the database"});
            }
            else{
                await AccidentalLeaves.updateOne({req_id: req.body.reqID}, {status: 2});
                //remove from HOD's list
                for(let i = 0; i < firstHr.accidentalLeaverequests.length; i++){
                    if(firstHr.accidentalLeaverequests[i].req_id == req.body.reqID){
                        firstHr.accidentalLeaverequests.splice(i,1);
                    }
                }
                await firstHr.save();
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

portal.post('/AcceptMaternityLeaveHR', authH,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        const firstHr = await HrMembers.findOne({id: "hr-1"});
        if(verified.id != "hr-1"){
            return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
        }
        else{
            const request = await MaternityRequest.findOne({req_id: req.body.reqID});
            if(!request){
                return res.status(400).json({msg:"Request wasn't found in the database"});
            }
            else{
                await MaternityRequest.updateOne({req_id: req.body.reqID}, {status: 1});
                 //remove from HR's list
                 for(let i = 0; i < firstHr.maternityLeaverequests.length; i++){
                    if(firstHr.maternityLeaverequests[i].req_id == req.body.reqID){
                        firstHr.maternityLeaverequests.splice(i,1);
                    }
                }
                await firstHr.save();
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

portal.post('/RejectMaternityLeaveHR', authH,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        const firstHr = await HrMembers.findOne({id: "hr-1"});
        if(verified.id != "hr-1"){
            return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
        }
        else{
            const request = await MaternityRequest.findOne({req_id: req.body.reqID});
            if(!request){
                return res.status(400).json({msg:"Request wasn't found in the database"});
            }
            else{
                await MaternityRequest.updateOne({req_id: req.body.reqID}, {status: 2});
                 //remove from HR's list
                 for(let i = 0; i < firstHr.maternityLeaverequests.length; i++){
                    if(firstHr.maternityLeaverequests[i].req_id == req.body.reqID){
                        firstHr.maternityLeaverequests.splice(i,1);
                    }
                }
                await firstHr.save();
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

portal.post('/AcceptSickLeaveHR', authH,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        const firstHr = await HrMembers.findOne({id: "hr-1"});
        if(verified.id != "hr-1"){
            return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
        }
        else{
            const request = await SickLeave.findOne({req_id: req.body.reqID});
            if(!request){
                return res.status(400).json({msg:"Request wasn't found in the database"});
            }
            else{
                await SickLeave.updateOne({req_id: req.body.reqID}, {status: 1});
                 //remove from HR's list
                 for(let i = 0; i < firstHr.sickLeaverequests.length; i++){
                    if(firstHr.sickLeaverequests[i].req_id == req.body.reqID){
                        firstHr.sickLeaverequests.splice(i,1);
                    }
                }
                await firstHr.save();
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

portal.post('/RejectSickLeaveHR', authH,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        const firstHr = await HrMembers.findOne({id: "hr-1"});
        if(verified.id != "hr-1"){
            return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
        }
        else{
            const request = await SickLeave.findOne({req_id: req.body.reqID});
            if(!request){
                return res.status(400).json({msg:"Request wasn't found in the database"});
            }
            else{
                await SickLeave.updateOne({req_id: req.body.reqID}, {status: 2});
                 //remove from HR's list
                 for(let i = 0; i < firstHr.sickLeaverequests.length; i++){
                    if(firstHr.sickLeaverequests[i].req_id == req.body.reqID){
                        firstHr.sickLeaverequests.splice(i,1);
                    }
                }
                await firstHr.save();
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

portal.post('/viewStaffAttendance',authH,async(req,res)=>{
    try{
        const JWT_Password = "RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        if(verified.role != "HR"){
            res.send("You're not allowed to view other staff members' Attendance Records");
        }
        else{
            if(req.body.staffcategory == "HR"){
                console.log(req.body.staffid);
                const HRfound= await HrMembers.findOne({id:req.body.staffid});
                console.log("uhmm");
                res.send(HRfound.AttendanceRecords);
            }
            else{
                const AMfound = await AcademicMember.findOne({id:req.body.staffid});
                res.send(AMfound.AttendanceRecords);
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

portal.post('/staffWithMissingHours',authH,async(req,res)=>{
    try{
        const JWT_Password = "RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        if(verified.role != "HR"){
            res.send("You're not allowed to view staff members with missing hours");
        }
        else{
            const todaysDate = new Date();
            const todaysMonth = todaysDate.getMonth() + 1;
            let nextMonth;
            let prevMonth;
            let missingHours = 0;
            let missingMinutes = 0;
            let extraHours = 0;
            let extraMinutes = 0;
            if(todaysMonth == 12){
                nextMonth =  1;
            }
            else{
                nextMonth = todaysMonth + 1;
            }
            if(todaysMonth == 1){
                prevMonth = 12;
            }
            else{
                prevMonth = todaysMonth - 1;
            }
            let staffs = {
                staffid:[],
                missinghours:[],
                missingminutes:[]
            }
            let hrmembers = await HrMembers.find({});
            let amembers = await AcademicMember.find({});
            console.log(amembers.length);
            if(req.body.category == "HR"){
            for(let j = 0; j < hrmembers.length; j++){
                const memFound= hrmembers[j];
                for(let i = 0; i < memFound.AttendanceRecords.length; i++){
                    let date = memFound.AttendanceRecords[i].date;
                    let month = memFound.AttendanceRecords[i].month;
                        if(todaysDate.getDate() >= 11){
                            if(month == todaysMonth && date >= 11){
                                if(memFound.AttendanceRecords[i].hours > 0){
                                    missingHours += memFound.AttendanceRecords[i].hours;
                                    missingMinutes += memFound.AttendanceRecords[i].minutes;
                                }
                                if(memFound.AttendanceRecords[i].hours < 0){
                                    extraHours -= memFound.AttendanceRecords[i].hours;
                                    extraMinutes -= memFound.AttendanceRecords[i].minutes;
                                }
                            }
                            if(month == nextMonth && date <= 10){
                                if(memFound.AttendanceRecords[i].hours > 0){
                                    missingHours += memFound.AttendanceRecords[i].hours;
                                    missingMinutes += memFound.AttendanceRecords[i].minutes;
                                }
                                if(memFound.AttendanceRecords[i].hours < 0){
                                    extraHours -= memFound.AttendanceRecords[i].hours;
                                    extraMinutes -= memFound.AttendanceRecords[i].minutes;
                                }
                            }
                        }
                        else{
                            if(month == todaysMonth && date <= 10){
                                if(memFound.AttendanceRecords[i].hours > 0){
                                    missingHours += memFound.AttendanceRecords[i].hours;
                                    missingMinutes += memFound.AttendanceRecords[i].minutes;
                                }
                                if(memFound.AttendanceRecords[i].hours < 0){
                                    extraHours -= memFound.AttendanceRecords[i].hours;
                                    extraMinutes -= memFound.AttendanceRecords[i].minutes;
                                }
                            }
                            if(month == prevMonth && date >=11){
                                if(memFound.AttendanceRecords[i].hours > 0){
                                    missingHours += memFound.AttendanceRecords[i].hours;
                                    missingMinutes += memFound.AttendanceRecords[i].minutes;
                                }
                                if(memFound.AttendanceRecords[i].hours < 0){
                                    extraHours -= memFound.AttendanceRecords[i].hours;
                                    extraMinutes -= memFound.AttendanceRecords[i].minutes;
                                }
                            }
                        }
                    }
                    extraHours = extraHours * -1;
                    extraMinutes = extraMinutes * -1;
                    let hours = missingHours - extraHours;
                    let minutes = missingMinutes - extraMinutes;
                    if(minutes < 0 && hours > 0){
                        minutes = minutes * -1;
                        minutes = 60 - minutes;
                        hours += 1;
                    }
                    if(hours <= 0 && minutes > 0){
                        minutes = 60 - minutes;
                        hours += 1;
                        minutes = minutes * -1;
                    }
                    if(hours >= 0 && minutes >= 0){
                        missingHours = hours;
                        missingMinutes = minutes;
                        extraHours = 0;
                        extraMinutes = 0;
                    }
                    else{
                        extraHours = hours;
                        extraMinutes = minutes;
                        missingHours = 0;
                        missingMinutes = 0;
                    }
                    if(missingHours > 0 || missingMinutes > 0){
                        console.log("adding");
                        staffs.staffid.push(memFound.id);
                        staffs.missinghours.push(missingHours);
                        staffs.missingminutes.push(missingMinutes);
                    }
                }
            }if(req.body.category == "AM"){
            for(let j = 0; j < amembers.length; j++){
                const memFound= amembers[j];
                for(let i = 0; i < memFound.AttendanceRecords.length; i++){
                let date = memFound.AttendanceRecords[i].date;
                let month = memFound.AttendanceRecords[i].month;
                    if(todaysDate.getDate() >= 11){
                        if(month == todaysMonth && date >= 11){
                            if(memFound.AttendanceRecords[i].hours > 0){
                                missingHours += memFound.AttendanceRecords[i].hours;
                                missingMinutes += memFound.AttendanceRecords[i].minutes;
                            }
                            if(memFound.AttendanceRecords[i].hours < 0){
                                extraHours -= memFound.AttendanceRecords[i].hours;
                                extraMinutes -= memFound.AttendanceRecords[i].minutes;
                            }
                        }
                        if(month == nextMonth && date <= 10){
                            if(memFound.AttendanceRecords[i].hours > 0){
                                missingHours += memFound.AttendanceRecords[i].hours;
                                missingMinutes += memFound.AttendanceRecords[i].minutes;
                            }
                            if(memFound.AttendanceRecords[i].hours < 0){
                                extraHours -= memFound.AttendanceRecords[i].hours;
                                extraMinutes -= memFound.AttendanceRecords[i].minutes;
                            }
                        }
                    }
                    else{
                        if(month == todaysMonth && date <= 10){
                            if(memFound.AttendanceRecords[i].hours > 0){
                                missingHours += memFound.AttendanceRecords[i].hours;
                                missingMinutes += memFound.AttendanceRecords[i].minutes;
                            }
                            if(memFound.AttendanceRecords[i].hours < 0){
                                extraHours -= memFound.AttendanceRecords[i].hours;
                                extraMinutes -= memFound.AttendanceRecords[i].minutes;
                            }
                        }
                        if(month == prevMonth && date >=11){
                            if(memFound.AttendanceRecords[i].hours > 0){
                                missingHours += memFound.AttendanceRecords[i].hours;
                                missingMinutes += memFound.AttendanceRecords[i].minutes;
                            }
                            if(memFound.AttendanceRecords[i].hours < 0){
                                extraHours -= memFound.AttendanceRecords[i].hours;
                                extraMinutes -= memFound.AttendanceRecords[i].minutes;
                            }
                        }
                    }
                }
                extraHours = extraHours * -1;
                extraMinutes = extraMinutes * -1;
                let hours = missingHours - extraHours;
                let minutes = missingMinutes - extraMinutes;
                if(minutes < 0 && hours > 0){
                    minutes = minutes * -1;
                    minutes = 60 - minutes;
                    hours += 1;
                }
                if(hours <= 0 && minutes > 0){
                    minutes = 60 - minutes;
                    hours += 1;
                    minutes = minutes * -1;
                }
                if(hours >= 0 && minutes >= 0){
                    missingHours = hours;
                    missingMinutes = minutes;
                    extraHours = 0;
                    extraMinutes = 0;
                }
                else{
                    extraHours = hours;
                    extraMinutes = minutes;
                    missingHours = 0;
                    missingMinutes = 0;
                }
                if(missingHours > 0 || missingMinutes > 0){
                    staffs.staffid.push(memFound.id);
                    staffs.missinghours.push(missingHours);
                    staffs.missingminutes.push(missingMinutes);
                } 
            }
        }
            console.log(staffs);
            res.send(staffs);
        }
    }
    catch(err){
        console.log(err);
    }
});

portal.post('/viewStaffWithMissingDays', authH,async(req,res)=>{
    try{
        const JWT_Password = "RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        const todaysDate = new Date();
        let nextMonth;
        let prevMonth;
        const todaysMonth = todaysDate.getMonth() + 1;
        if(todaysMonth == 12)
            nextMonth = 1;
        else
            nextMonth = todaysMonth+1;
        if(todaysMonth == 1)
            prevMonth = 12;
        else
            prevMonth = todaysMonth - 1;
        if(verified.role != "HR"){
            res.send("You're not allowed to enter this page");
        }
        else{
            let toreturn = [{
                day: '',
                month: ''
            }];
            let MissingDays = [];
            let ARecords = [];
            let memFound = await HrMembers.findOne({id: req.body.id});
            if(!memFound){
                memFound = await AcademicMember.findOne({id: req.body.id});
            }
            for(let i = 0; i < memFound.AttendanceRecords.length; i++){
                let date = memFound.AttendanceRecords[i].date;
                let month = memFound.AttendanceRecords[i].month;
                if(todaysDate >= 11){
                    if(month == todaysMonth && date >= 11){
                        ARecords.push(memFound.AttendanceRecords[i]);
                    }
                    if(month == nextMonth && date <= 10){
                        ARecords.push(memFound.AttendanceRecords[i]);
                    }
                }
                else{
                    if(month == todaysMonth && date <= 10){
                        ARecords.push(memFound.AttendanceRecords[i]);
                    }
                    if(month == prevMonth && date >=11){
                        ARecords.push(memFound.AttendanceRecords[i]);
                    }
                }
            }
            console.log("attendance records pushed");
            console.log(todaysDate.getDate());
            //loop over the days to check if it exists in ARecords or any request table
            if(todaysDate.getDate() >= 11){
                console.log("day > 11");
                let numOfDays = todaysDate.getDate() - 11;
                let dayOfWeek = todaysDate.getDay();
                for(let k = 0; k < numOfDays;k++){
                    if(dayOfWeek == 0){
                        dayOfWeek = 6;
                    }
                    else{
                        dayOfWeek -= 1;
                    }
                }
                console.log("counted days");
                for(let i = 11; i <=30; i++){
                    let dayFound = false;
                    //searching for this day
                    for(let j = 0; j <ARecords.length; j++){
                        if(ARecords[j].month == todaysMonth && ARecords[j].date == i){
                            dayFound = true;
                        }
                    }
                    if(!dayFound){
                        //search in Annual Leave Requests
                        const AnnualFound = await AnnualLeave.findOne({id: memFound.id, date: i, month: todaysMonth, status: 1});
                        if(AnnualFound){
                            dayFound = true;
                        }
                    }
                    if(!dayFound){
                        //search in Accidental Leave Requests
                        const AccidentalFound = await AccidentalLeave.findOne({id: memFound.id, date: i, month: todaysMonth, status: 1});
                        if(AccidentalFound){
                            dayFound = true;
                        }
                    }
                    //won't search in compensation requests because if it's accepted, a new Attendance Record will be created to calculate the extra 8 hours and 24 minutes
                    if(!dayFound){
                        //search in Maternity Request
                        const MaternityFound = await MaternityRequest.findOne({id: memFound.id, month: todaysMonth, status: 1});
                        if(MaternityFound){
                            //see if the day is in between dateFrom and dateTo
                            if(MaternityFound.dateTo < MaternityFound.dateFrom){
                                if(i >= MaternityFound.dateFrom && i <= 30){
                                    dayFound = true;
                                }
                            }
                            else{
                                if(i >= MaternityFound.dateFrom && i <= MaternityFound.dateTo){
                                    dayFound = true;
                                }
                            }
                        }
                    }
                    if(!dayFound){
                        //search in sick leave requests
                        const SickFound = await SickLeave.findOne({id: memFound.id, date: i, month: todaysMonth, status: 1});
                        if(SickFound){
                            dayFound = true;
                        }
                    }
                    if(!dayFound){
                        if(req.body.category =="HR"){
                            if(dayOfWeek != 5 && dayOfWeek != 6){
                                console.log("pushed day");
                                toreturn.push({i, todaysMonth});
                            }
                            
                        }
                        else{
                            let dayoff = memFound.dayoff;
                            if(dayOfWeek != 5 && dayOfWeek != dayoff){
                                toreturn.push({i, todaysMonth});
                            }
                        }
                      
                    }
                    if(dayOfWeek == 6){
                        dayOfWeek = 0;
                    }
                    else{
                        dayOfWeek++;
                    }
    
                }
                for(let i = 1; i <=10; i++){
                    let dayFound = false;
                    //searching for this day
                    for(let j = 0; j <ARecords.length; j++){
                        if(ARecords[j].month == nextMonth && ARecords[j].date == i){
                            dayFound = true;
                        }
                    }
                    if(!dayFound){
                        //search in Annual Leave Requests
                        const AnnualFound = await AnnualLeave.findOne({id: memFound.id, date: i, month: nextMonth, status: 1});
                        if(AnnualFound){
                            dayFound = true;
                        }
                    }
                    if(!dayFound){
                        //search in Accidental Leave Requests
                        const AccidentalFound = await AccidentalLeave.findOne({id: memFound.id, date: i, month: nextMonth, status: 1});
                        if(AccidentalFound){
                            dayFound = true;
                        }
                    }
                    //won't search in compensation requests because if it's accepted, a new Attendance Record will be created to calculate the extra 8 hours and 24 minutes
                    if(!dayFound){
                        //search in Maternity Request
                        const MaternityFound = await MaternityRequest.findOne({id: memFound.id, month: nextMonth, status: 1});
                        if(MaternityFound){
                            //see if the day is in between dateFrom and dateTo
                            if(MaternityFound.dateTo < MaternityFound.dateFrom){
                                if(i >= MaternityFound.dateFrom && i <= 30){
                                    dayFound = true;
                                }
                            }
                            else{
                                if(i >= MaternityFound.dateFrom && i <= MaternityFound.dateTo){
                                    dayFound = true;
                                }
                            }
                        }
                    }
                    if(!dayFound){
                        //search in sick leave requests
                        const SickFound = await SickLeave.findOne({id: memFound.id, date: i, month: nextMonth, status: 1});
                        if(SickFound){
                            dayFound = true;
                        }
                    }
                    if(!dayFound){
                        if(req.body.category =="HR"){
                            if(dayOfWeek != 5 && dayOfWeek != 6){
                                console.log("pushed day from next month");
                                toreturn.push({i, todaysMonth});
                            }
                            
                        }
                        else{
                            let dayoff = memFound.dayoff;
                            if(dayOfWeek != 5 && dayOfWeek != dayoff){
                                console.log("pushed");
                                toreturn.push({i, todaysMonth});
                            }
                        }
                      
                    }
                    if(dayOfWeek == 6){
                        dayOfWeek = 0;
                    }
                    else{
                        dayOfWeek++;
                    }
    
                }
              
            }
            else{
                console.log("day is less than 11");
                let numOfDays = todaysDate.getDate() - 1;
                let dayOfWeek = todaysDate.getDay();
                console.log(dayOfWeek);
                for(let k = 0; k < numOfDays;k++){
                    if(dayOfWeek == 0){
                        dayOfWeek = 6;
                    }
                    else{
                        dayOfWeek -= 1;
                    }
                }
                for(let i = 1; i <=10; i++){
                    let dayFound = false;
                    //searching for this day
                    for(let j = 0; j <ARecords.length; j++){
                        console.log("yaraby");
                        if(ARecords[j].month == todaysMonth && ARecords[j].date == i){
                            dayFound = true;
                            console.log("found it?");
                        }
                    }
                    if(!dayFound){
                        //search in Annual Leave Requests
                        console.log("not in records, search in annual");
                        const AnnualFound = await AnnualLeave.findOne({id: memFound.id, date: i, month: todaysMonth, status: 1});
                        if(AnnualFound){
                            dayFound = true;
                        }
                    }
                    if(!dayFound){
                        console.log("not in annual, search in acci");
                        //search in Accidental Leave Requests
                        const AccidentalFound = await AccidentalLeave.findOne({id: memFound.id, date: i, month: todaysMonth, status: 1});
                        if(AccidentalFound){
                            dayFound = true;
                        }
                    }
                    //won't search in compensation requests because if it's accepted, a new Attendance Record will be created to calculate the extra 8 hours and 24 minutes
                    if(!dayFound){
                        console.log("search in mater");
                        //search in Maternity Request
                        const MaternityFound = await MaternityRequest.findOne({id: memFound.id, month: todaysMonth, status: 1});
                        if(MaternityFound){
                            //see if the day is in between dateFrom and dateTo
                            if(MaternityFound.dateTo < MaternityFound.dateFrom){
                                if(i >= MaternityFound.dateFrom && i <= 30){
                                    dayFound = true;
                                }
                            }
                            else{
                                if(i >= MaternityFound.dateFrom && i <= MaternityFound.dateTo){
                                    dayFound = true;
                                }
                            }
                        }
                    }
                    if(!dayFound){
                        console.log("search in sick");
                        //search in sick leave requests
                        const SickFound = await SickLeave.findOne({id: memFound.id, date: i, month: todaysMonth, status: 1});
                        if(SickFound){
                            dayFound = true;
                        }
                    }
                    if(!dayFound){
                        if(req.body.category =="HR"){
                            console.log("pushing");
                            if(dayOfWeek != 5 && dayOfWeek != 6){
                                toreturn.push({i, todaysMonth});
                            }
                            
                        }
                        else{
                            let dayoff = memFound.dayoff;
                            if(dayOfWeek != 5 && dayOfWeek != dayoff){
                                toreturn.push({i, todaysMonth});
                            }
                        }
                      
                    }
                    if(dayOfWeek == 6){
                        dayOfWeek = 0;
                    }
                    else{
                        dayOfWeek++;
                    }
                }
                for(let i = 11; i <=30; i++){
                    let dayFound = false;
                    //searching for this day
                    for(let j = 0; j <ARecords.length; j++){
                        if(ARecords[j].month == prevMonth && ARecords[j].date == i){
                            dayFound = true;
                        }
                    }
                    if(!dayFound){
                        //search in Annual Leave Requests
                        const AnnualFound = await AnnualLeave.findOne({id: memFound.id, date: i, month: prevMonth, status: 1});
                        if(AnnualFound){
                            dayFound = true;
                        }
                    }
                    if(!dayFound){
                        //search in Accidental Leave Requests
                        const AccidentalFound = await AccidentalLeave.findOne({id: memFound.id, date: i, month: prevMonth, status: 1});
                        if(AccidentalFound){
                            dayFound = true;
                        }
                    }
                    //won't search in compensation requests because if it's accepted, a new Attendance Record will be created to calculate the extra 8 hours and 24 minutes
                    if(!dayFound){
                        //search in Maternity Request
                        const MaternityFound = await MaternityRequest.findOne({id: memFound.id, month: prevMonth, status: 1});
                        if(MaternityFound){
                            //see if the day is in between dateFrom and dateTo
                            if(MaternityFound.dateTo < MaternityFound.dateFrom){
                                if(i >= MaternityFound.dateFrom && i <= 30){
                                    dayFound = true;
                                }
                            }
                            else{
                                if(i >= MaternityFound.dateFrom && i <= MaternityFound.dateTo){
                                    dayFound = true;
                                }
                            }
                        }
                    }
                    if(!dayFound){
                        //search in sick leave requests
                        const SickFound = await SickLeave.findOne({id: memFound.id, date: i, month: prevMonth, status: 1});
                        if(SickFound){
                            dayFound = true;
                        }
                    }
                    if(!dayFound){
                        if(req.body.category =="HR"){
                            if(dayOfWeek != 5 && dayOfWeek != 6){
                                toreturn.push({i, todaysMonth});
                            }
                            
                        }
                        else{
                            let dayoff = memFound.dayoff;
                            if(dayOfWeek != 5 && dayOfWeek != dayoff){
                                toreturn.push({i, todaysMonth});
                            }
                        }
                      
                    }
                    if(dayOfWeek == 6){
                        dayOfWeek = 0;
                    }
                    else{
                        dayOfWeek++;
                    }
                }
            }
            res.send(toreturn);
        }

    }
    catch(err){
        console.log(err);
    }
});

portal.post('/addMissingSignIn',authH,async(req,res)=>{
    //needed in the body:
    //staffid , staffcategory, date , month , day , hourin , minutein
    try{
    const {staffcategory,staffid}=req.body;
    console.log(staffcategory,staffid);
    const JWT_Password = "RandomString";
    const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
    if(verified.role != "HR" || verified.id == req.body.staffid){
        res.send("You're not allowed to add a missing sign in");
    }
    else{
        const signRecord = {"hourin": req.body.hourin, "minutein": req.body.minutein, "signin": 1};
        if(req.body.staffcategory == "HR"){
            console.log(req.body.staffid);
            const HRfound = await HrMembers.findOne({id: req.body.staffid});
            //console.log(HRfound);
            const Arecord = await HrMembers.findOne({'id': req.body.staffid, 'AttendanceRecords': {'$elemMatch': {'date': req.body.date, 'month': req.body.month}}});
            if(Arecord){
               await HrMembers.updateOne({'id': req.body.staffid, 'AttendanceRecords': {'$elemMatch': {'date': req.body.date, 'month': req.body.month}}},{$push: {'AttendanceRecords.$.signs': signRecord}});
            }
            if(!Arecord){ 
                console.log("adding a new record");
                const todaysRecord = {"day":req.body.day, "date": req.body.date, "month": req.body.month, "hours": 8, "minutes":24};
                await HrMembers.updateOne({"id": req.body.staffid},{$push: {'AttendanceRecords': todaysRecord}});
                await HrMembers.updateOne({'id': req.body.staffid, 'AttendanceRecords': {'$elemMatch': {'date': req.body.date, 'month': req.body.month}}},{$push: {'AttendanceRecords.$.signs': signRecord}});
            }
        }
        else{
            const Arecord = await AcademicMember.findOne({'id': req.body.staffid, 'AttendanceRecords.date': req.body.date, 'AttendanceRecords.month': req.body.month});
            if(Arecord){
                await AcademicMember.updateOne({'id': Arecord, 'AttendanceRecords': {'$elemMatch': {'date': req.body.date, 'month': req.body.month}}},{$push: {'AttendanceRecords.$.signs': signRecord}});
            }
            if(!Arecord){ 
                console.log("adding a new record");
                const todaysRecord = {"day":req.body.day, "date": req.body.date, "month": req.body.month, "hours": 8, "minutes":24};
                await AcademicMember.updateOne({"id": req.body.staffid},{$push: {'AttendanceRecords': todaysRecord}});
                await AcademicMember.updateOne({'id': req.body.staffid, 'AttendanceRecords': {'$elemMatch': {'date': req.body.date, 'month': req.body.month}}},{$push: {'AttendanceRecords.$.signs': signRecord}});
            }
        }
    }
    }
    catch(err){
        console.log(err);
    }
});



portal.post('/addmissingSignOut',authH,async(req,res)=>{
    try{
        const JWT_Password = "RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        if(req.body.staffid == verified.id || verified.role != "HR"){
            res.send("You're not allowed to add a sign out");
        }
        else{
            let theRecord;
            if(req.body.staffcategory == "HR"){
                theRecord = await HrMembers.findOne({'id': req.body.staffid, 'AttendanceRecords': {'$elemMatch':{ 'date': req.body.date, 'month': req.body.month}}});
            }
            else{//academic member
                let AMfound = await AcademicMember.findOne({'id': req.body.staffid});
                console.log(AMfound.id);
                theRecord = await AcademicMember.findOne({'id': req.body.staffid, 'AttendanceRecords': {'$elemMatch':{ 'date': req.body.date, 'month': req.body.month}}});
            }
            if(!theRecord){
                console.log("not signed in aslan");
            }
            else{
                let ARlength = theRecord.AttendanceRecords.length-1;
                console.log(ARlength);
                let signsLength = theRecord.AttendanceRecords[ARlength].signs.length -1;
                theRecord.AttendanceRecords[ARlength].signs[signsLength].signout = 1;
                theRecord.AttendanceRecords[ARlength].signs[signsLength].hourout = req.body.hourout;
                theRecord.AttendanceRecords[ARlength].signs[signsLength].minuteout = req.body.minuteout;
                await theRecord.save();
                let lastRecord = theRecord.AttendanceRecords[ARlength];
                let lastSign = theRecord.AttendanceRecords[ARlength].signs[signsLength];
                if(lastSign.signin){
                let updatedHours = lastSign.hourout - lastSign.hourin;
                    let updatedMinutes = lastSign.minuteout - lastSign.minutein;
                    if(updatedMinutes < 0){
                        updatedMinutes = updatedMinutes * -1;
                        updatedMinutes = 60 - updatedMinutes;
                        updatedHours -= 1;
                    }
                    //calculate hours and minutes - updated
                    lastRecord.hours -= updatedHours;
                    lastRecord.minutes -= updatedMinutes;
                    if(lastRecord.hours < 0){
                        if(lastRecord.minutes > 0){
                                lastRecord.minutes -= 60;
                                lastRecord.minutes = lastRecord.minutes * -1;
                                lastRecord.hours += 1; 
                            }
                     }
                    else{
                        if(lastRecord.minutes < 0){
                            lastRecord.minutes = lastRecord.minutes * -1;
                            lastRecord.minutes = 60 - lastRecord.minutes;
                            lastRecord.hours += 1;
                          }
                    }
                    await theRecord.save();
                    res.send("check timing");
                }
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

portal.get('/viewslotlinkingrequests',authH,async(req,res)=>{
    try{
      const listOfTas=[];
      const JWT_Password="RandomString";
      const verified = jwt.verify(req.header('x-auth-token'),JWT_Password); 
      if(verified.role=="AM"){
          const am= await AcademicMember.findOne({"id":verified.id,"coursecoordindator":1});
          if(!am){
              console.log("you are not a course coordinator");
          }
          else{
              //console.log(am.dayoffrequests)
              res.send(am.slotlinkingrequests)
          }
      }
  }
  catch(err){
      console.log(err);
  }
  });

portal.post('/acceptslotlinking',authH,async(req,res)=>{
    try{
        const slotlinkingrequest= await SlotLinkingRequest.findOne({"id":req.body.AMid});
        const day=slotlinkingrequest.requestedDay;
        const slot=slotlinkingrequest.slotNumber;
       console.log(slot);
       console.log(day);
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        if(verified.role=="AM"){  // academic member
            console.log("Academic member");
            const coursecoordinator= await AcademicMember.findOne({"id":verified.id}); 
            //await AcademicMember.updateOne({"id":req.body.AMid},{$push:{"courses":req.body.courseid}});
            const am= await AcademicMember.findOne({"id":req.body.AMid});
            //console.log(am);
            console.log(verified.id);
            console.log(coursecoordinator.coursecoordindator);
            if(coursecoordinator.coursecoordindator==1){    //course coordinator
                console.log("I am coordinator");
                //console.log(am.faculty)
            const fac= await Faculties.findOne({"name":req.body.facultyname});
            let i=0;
            let j=0;
            let k;
            let l ;
            for(i=0;i<fac.departments.length;i++){
                console.log("department not empty");
                if (fac.departments[i].id==req.body.departmentid){
                    console.log("we have equal departments names!!");
                 for (j=0;j<fac.departments[i].courses.length;j++){
                    console.log("courses not empty thankfully");
                    // if(fac.departments[i].courses[j].coordinator==verified.id){  //got course
                        console.log("I am this course's coordinator!!");
                                          //made sure he is a coordinator of this course
                                          if(day=="Saturday"){
                                            k=0;
                                }
                                if(day=="Sunday"){
                                    k=1;
                                        }
                                if(day=="Monday"){
                                    k=2;
                                       }
                             if(day=="Tuesday"){
                                     k=3;
                                      }                           
                             if(day=="Wednesday"){
                                      k=4;
                                    }
                            if(day=="Thursday"){
                                        k=5;
                                        console.log("thursday")
                            }
                            if(slot=="first"){
                                for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].first.length;l++) {
                                    console.log(fac.departments[i].courses[j].courseSchedule[k].first.length);
                                //    if(fac.departments[i].courses[j].courseSchedule[k].first[l][0].location==req.body.location){
                                       // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                                  fac.departments[i].courses[j].courseSchedule[k].first[l][0].AM=req.body.AMid;
                                  am.Schedule[k].first.push(fac.departments[i].courses[j].courseSchedule[k].first[l][0]);
                                //    }
                                  console.log("TA added successfully");
                      } 
                       }   //if location
                     if(slot=="second"){
                        for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].second.length;l++) {
                            //if(fac.departments[i].courses[j].courseSchedule[k].second[l][0].location==req.body.location){
                                // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                           fac.departments[i].courses[j].courseSchedule[k].second[l][0].AM=req.body.AMid;
                           am.Schedule[k].second.push(fac.departments[i].courses[j].courseSchedule[k].second[l][0]);
                           //  }
                            console.log("TA added successfully");
                } 
                 }  
                    if(slot=="third" || slot == 3){
                        console.log("here at third")
                        console.log(fac.departments[i].courses[j].courseSchedule[k].third);
                        for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].third.length;l++) {
                          //  if(fac.departments[i].courses[j].courseSchedule[k].third[l][0].location==req.body.location){
                                // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                           fac.departments[i].courses[j].courseSchedule[k].third[l][0].AM=req.body.AMid;
                           am.Schedule[k].third.push(fac.departments[i].courses[j].courseSchedule[k].third[l][0]);
                          //   }
                            console.log("TA added successfully");
                } 
                 } 
                     
                     if(slot=="fourth" || slot == 4){
                        for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].fourth.length;l++) {
                          //  if(fac.departments[i].courses[j].courseSchedule[k].fourth[l][0].location==req.body.location){
                                // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                           fac.departments[i].courses[j].courseSchedule[k].fourth[l][0].AM=req.body.AMid;
                           am.Schedule[k].fourth.push(fac.departments[i].courses[j].courseSchedule[k].fourth[l][0]);
                          //   }
                            console.log("TA added successfully");
                } 
                 } 
                    if(slot=="fifth"){
                        for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].fifth.length;l++) {
                          //  console.log(fac.departments[i].courses[j].courseSchedule[k].fifth[l][0].location);
                          //  if(fac.departments[i].courses[j].courseSchedule[k].fifth[l][0].location==req.body.location){
                             //  console.log(fac.departments[i].courses[j].TAs[10]);
                           fac.departments[i].courses[j].courseSchedule[k].fifth[l][0].AM=req.body.AMid;
                           am.Schedule[k].fifth.push(fac.departments[i].courses[j].courseSchedule[k].fifth[l][0]);
                           console.log("TA added successfully");                        
                } 
                 } 
     //if coordinator id
    } //if courseid
     } //for course
    
    } //if departments
    const saved=  await  fac.save();   
    await am.save();
    await SlotLinkingRequest.updateOne({"id":req.body.AMid, "requestedDay": req.body.requestedday},{"acceptanceStatus":1})
    
} //for departments
    
    // console.log(saved);
    console.log("and saved");           
    } //coordinator if
    } // AM if
     //try bracket
    catch(err){
        console.log(err);
    }
    });
    portal.post('/rejectslotlinking',authH,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            const coordinator = await AcademicMember.findOne({id: verified.id});
            if(coordinator.coursecoordindator != 1){
                console.log("not allowed");
            }else{
                await SlotLinkingRequest.updateOne({"id":req.body.AMid, "requestedDay": req.body.requestedday},{"acceptanceStatus":2});
                console.log(req.body.AMid);
            }
        }
        catch(err){
            console.log(err);
        }        
        });


portal.post('/addcourseslot',authH,async(req,res)=>{
            try{
                const JWT_Password="RandomString";
                const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
                if(verified.role=="AM"){  // academic member
                    console.log("Academic member");
                    const coursecoordinator= await AcademicMember.findOne({"id":verified.id}); 
                    console.log(verified.id);
                    if(coursecoordinator.coursecoordindator==1){    //course coordinator
                        console.log("I am coordinator");
                    const fac= await Faculties.findOne({"name":req.body.facultyname});
                    let i=0;
                    let j=0;
                    for(i=0;i<fac.departments.length;i++){
                        console.log("department not empty");
                        if (fac.departments[i].id==req.body.departmentid){
                            console.log("we have equal departments ids!!");
                         for (j=0;j<fac.departments[i].courses.length;j++){
                            console.log("courses not empty thankfully");
                             if(fac.departments[i].courses[j].id==req.body.courseid){  //got course
                                console.log("course ids are equal !!");
                                 if(fac.departments[i].courses[j].coordinator==verified.id){  //made sure he is a coordinator of this course
                                     console.log("coordinator"); 
                                     let k;
                                     let t;
                                     let s;
                                     let l=0;
                                     const day= await Availability.findOne({"day":req.body.day}); // got row from avaialability
                                    // for(k=0;k<fac.departments[i].courses[j].courseSchedule.length;k++){
                                        if(req.body.day=="Saturday"){
                                                    k=0;
                                        }
                                        if(req.body.day=="Sunday"){
                                            k=1;
                                                }
                                        if(req.body.day=="Monday"){
                                            k=2;
                                               }
                                     if(req.body.day=="Tuesday"){
                                             k=3;
                                              }                           
                                     if(req.body.day=="Wednesday"){
                                              k=4;
                                            }
                                    if(req.body.day=="Thursday"){
                                                k=5;
                                    }
        
                                    if(req.body.slot=="first"){
                                        t="8:15 to 9;45";
                                     }   
                                     
                                     if(req.body.slot=="second"){
                                       t="10:00 to 11:30";
                                    }   
                                    if(req.body.slot=="third"){
                                        t="11:45 to 1:15";
                                     }   
                                     
                                     if(req.body.slot=="fourth"){
                                        t="1:45 to 3:15";
                                    }   
                                    if(req.body.slot=="fifth"){
                                        t="3:45 to 5:15";
                                     }   
                                     if(req.body.slot=="first"){
                                        for(l=0;l<day.first.length;l++){
                                             
                                            if(day.first[l]==req.body.location){
                                              await Availability.updateOne({"day":req.body.day},{$pull:{"first":req.body.location}});
                                                  
                                                  const slot1 = {
                                                      timing:t,
                                                      course: req.body.courseid,
                                                      location:req.body.location
                                                  }; //slot1
          
                                                  fac.departments[i].courses[j].courseSchedule[k].first.push(slot1);
                                                  console.log(fac.departments[i].courses[j].courseSchedule[k].day);
                                                  console.log("slot added successfully");
                                      }    //if location
                                     
                           } // for availibility "day"
                                     }   
                                     
                                     if(req.body.slot=="second"){
                                         console.log("second slot");
                                        for(l=0;l<day.second.length;l++){
                                             
                                            if(day.second[l]==req.body.location){
                                              await Availability.updateOne({"day":req.body.day},{$pull:{"second":req.body.location}});
                                                  console.log(day.second[l]);
                                                  const slot1 = {
                                                      timing:t,
                                                      course: req.body.courseid,
                                                      location:req.body.location
                                                  }; //slot1
          
                                                  fac.departments[i].courses[j].courseSchedule[k].second.push(slot1);
                                                  console.log(fac.departments[i].courses[j].courseSchedule[k].day);
                                                  console.log("slot added successfully");
                                      }    //if location
                                     
                           } // for availibility "day"
                                    }   
                                    if(req.body.slot=="third"){
                                        for(l=0;l<day.third.length;l++){
                                             
                                            if(day.third[l]==req.body.location){
                                              await Availability.updateOne({"day":req.body.day},{$pull:{"third":req.body.location}});
                                                  
                                                  const slot1 = {
                                                      timing:t,
                                                      course: req.body.courseid,
                                                      location:req.body.location
                                                  }; //slot1
          
                                                  fac.departments[i].courses[j].courseSchedule[k].third.push(slot1);
                                                  console.log(fac.departments[i].courses[j].courseSchedule[k].day);
                                                  console.log("slot added successfully");
                                      }    //if location
                                     
                           } // for availibility "day"
                                     }   
                                     
                                     if(req.body.slot=="fourth"){
                                        for(l=0;l<day.fourth.length;l++){
                                             
                                            if(day.fourth[l]==req.body.location){
                                              await Availability.updateOne({"day":req.body.day},{$pull:{"fourth":req.body.location}});
                                                  
                                                  const slot1 = {
                                                      timing:t,
                                                      course: req.body.courseid,
                                                      location:req.body.location
                                                  }; //slot1
          
                                                  fac.departments[i].courses[j].courseSchedule[k].fourth.push(slot1);
                                                  console.log(fac.departments[i].courses[j].courseSchedule[k].day);
                                                  console.log("slot added successfully");
                                      }    //if location
                                     
                           } // for availibility "day"
                                    }   
                                    if(req.body.slot=="fifth"){
                                        for(l=0;l<day.fifth.length;l++){
                                             
                                            if(day.fifth[l]==req.body.location){
                                              await Availability.updateOne({"day":req.body.day},{$pull:{"fifth":req.body.location}});
                                                  
                                                  const slot1 = {
                                                      timing:t,
                                                      course: req.body.courseid,
                                                      location:req.body.location
                                                  }; //slot1
          
                                                  fac.departments[i].courses[j].courseSchedule[k].fifth.push(slot1);
                                                  console.log(fac.departments[i].courses[j].courseSchedule[k].day);
                                                  console.log("slot added successfully");
                                      }    //if location
                                     
                           } // for availibility "day"
                                     } 
                                     
                                             
        
                                      //  if(fac.departments[i].courses[j].courseSchedule[k].day==req.body.day){ // day given "row"
                                        
                                           //  let whatever = req.body.slot;
                                         //  console.log(day.second);
                                           // console.log(slot);
                                       
                               // res.send("choose another location :)");
                          // } // if courseschedule.day
                            //if day
                                    
                    } //if coordinator id
                } //if courseid
                     } //for course
                   
                    } //if departments
                } //for departments
              const saved=  await  fac.save();   
             // console.log(saved);
                console.log("and saved");           
            } //coordinator if
        } // AM if
            } //try bracket
             
            catch(err){
                console.log(err);
            }
});

portal.post('/updatecourseslot',authH,async(req,res)=>{
    try{
    const JWT_Password="RandomString";
    const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
    if(verified.role=="AM"){  // academic member
    console.log("Academic member");
    const coursecoordinator= await AcademicMember.findOne({"id":verified.id}); 
     console.log(verified.id);
    if(coursecoordinator.coursecoordindator==1){    //course coordinator
    console.log("I am coordinator");
    const fac= await Faculties.findOne({"name":req.body.facultyname});
      let i=0;
     let j=0;
     for(i=0;i<fac.departments.length;i++){
       console.log("department not empty");
         if (fac.departments[i].id==req.body.departmentid){
           console.log("we have equal departments ids!!");
            for (j=0;j<fac.departments[i].courses.length;j++){
               console.log("courses not empty thankfully");
                 if(fac.departments[i].courses[j].id==req.body.courseid){  //got course
                   console.log("course ids are equal !!");
                      if(fac.departments[i].courses[j].coordinator==verified.id){  //made sure he is a coordinator of this course
                             console.log("academic"); 
                             let k;
                             let t;
                             let s;
                             let l=0;
                             const day= await Availability.findOne({"day":req.body.day}); // got row from avaialability
                            // for(k=0;k<fac.departments[i].courses[j].courseSchedule.length;k++){
                                if(req.body.day=="Saturday"){
                                            k=0;
                                }
                                if(req.body.day=="Sunday"){
                                    k=1;
                                        }
                                if(req.body.day=="Monday"){
                                    k=2;
                                       }
                             if(req.body.day=="Tuesday"){
                                     k=3;
                                      }                           
                             if(req.body.day=="Wednesday"){
                                      k=4;
                                    }
                            if(req.body.day=="Thursday"){
                                        k=5;
                            }

                            if(req.body.slot=="first"){
                                t="8:15 to 9;45";
                             }   
                             
                             if(req.body.slot=="second"){
                               t="10:00 to 11:30";
                            }   
                            if(req.body.slot=="third"){
                                t="11:45 to 1:15";
                             }   
                             
                             if(req.body.slot=="fourth"){
                                t="1:45 to 3:15";
                            }   
                            if(req.body.slot=="fifth"){
                                t="3:45 to 5:15";
                             }   
                             if(req.body.slot=="first"){
                               await Availability.updateOne({"day":req.body.day},{$push:{"first":req.body.oldlocation}});
                                          
                                          for(l=0;l<day.first.length;l++){
                                     
                                           if(day.first[l]==req.body.newlocation){
                                             await Availability.updateOne({"day":req.body.day},{$pull:{"first":req.body.newlocation}});
                                                  
                                               
                                              let z;
                                              for (z=0;z<fac.departments[i].courses[j].courseSchedule[k].first.length;z++){
                                                  console.log(fac.departments[i].courses[j].courseSchedule[k].first[z].location);
                                                  if(fac.departments[i].courses[j].courseSchedule[k].first[z][0].location==req.body.oldlocation ){
                                                    fac.departments[i].courses[j].courseSchedule[k].first[z][0].location=req.body.newlocation;
                                              }
                                            }
                                       
                                          console.log("slot updated successfully");
                                               } //location for      
                            }   //first closure
                            }
                             if(req.body.slot=="second"){
                               console.log("here");
                            
                        
                               
                                for(l=0;l<day.second.length;l++){
                                   // console.log(day.second[l]);
                                  if(day.second[l]==req.body.newlocation){
                                      console.log("available room");
                                    await Availability.updateOne({"day":req.body.day},{$push:{"second":req.body.oldlocation}});
                                    await Availability.updateOne({"day":req.body.day},{$pull:{"second":req.body.newlocation}});
                                    let z;
                                      for (z=0;z<fac.departments[i].courses[j].courseSchedule[k].second.length;z++){
                                          
                                          if(fac.departments[i].courses[j].courseSchedule[k].second[z][0].location==req.body.oldlocation ){
                                           
                                            fac.departments[i].courses[j].courseSchedule[k].second[z][0].location=req.body.newlocation;
                                      }
                                    }
                                        
                             
                                console.log("slot updated successfully");
                                    }
                   }    
                }
                            if(req.body.slot=="third"){
                                
                               await  Availability.updateOne({"day":req.body.day},{$push:{"third":req.body.oldlocation}});
                                          
                               
                                
                                for(l=0;l<day.third.length;l++){
                           
                                  if(day.third[l]==req.body.newlocation){
                                    await Availability.updateOne({"day":req.body.day},{$pull:{"third":req.body.newlocation}});
                                    let z;
                                    for (z=0;z<fac.departments[i].courses[j].courseSchedule[k].third.length;z++){
                                        if(fac.departments[i].courses[j].courseSchedule[k].third[z][0].location==req.body.oldlocation ){
                                          fac.departments[i].courses[j].courseSchedule[k].third[z][0].location=req.body.newlocation;
                                    }
                                  }
                                console.log("slot updated successfully");
                                    }
                   }   
                }
                             if(req.body.slot=="fourth"){
                             await   Availability.updateOne({"day":req.body.day},{$push:{"fourth":req.body.oldlocation}});
                                          
                                          
                                         
                                          for(l=0;l<day.fourth.length;l++){
                                     
                                            if(day.fourth[l]==req.body.newlocation){
                                              await Availability.updateOne({"day":req.body.day},{$pull:{"fourth":req.body.newlocation}});
                                                  
                                              let z;
                                              for (z=0;z<fac.departments[i].courses[j].courseSchedule[k].fourth.length;z++){
                                                  if(fac.departments[i].courses[j].courseSchedule[k].fourth[z][0].location==req.body.oldlocation ){
                                                    fac.departments[i].courses[j].courseSchedule[k].fourth[z][0].location=req.body.newlocation;
                                              }
                                            }
                                       
                                          console.log("slot updated successfully");
                                                }   
                                            }
                             }   
                            if(req.body.slot=="fifth"){
                                
                             await   Availability.updateOne({"day":req.body.day},{$push:{"fifth":req.body.oldlocation}});
                                          
            
                             
                                for(l=0;l<day.fifth.length;l++){
                           
                                  if(day.fifth[l]==req.body.newlocation){
                                    await Availability.updateOne({"day":req.body.day},{$pull:{"fifth":req.body.newlocation}});
                                        
                                    let z;
                                    for (z=0;z<fac.departments[i].courses[j].courseSchedule[k].fifth.length;z++){
                                      //  console.log(fac.departments[i].courses[j].courseSchedule[k].fifth[z][0].location);
                                        if(fac.departments[i].courses[j].courseSchedule[k].fifth[z][0].location==req.body.oldlocation ){
                                           
                                            fac.departments[i].courses[j].courseSchedule[k].fifth[z][0].location=req.body.newlocation;
                                    }
                                  }

                                console.log("slot updated successfully");
                                    }
                   }   
                }     
                                     

                            
                            
                } //coordinator id
              }//course id
             } //for courses closure
              
            }//departments for closure
            
         } //course coordinator if
         const saved=  await  fac.save();
        } //AM closure
       
     // console.log(saved);
      //  console.log("and saved");           
    } //try closure
            }
    


    catch(err){
        console.log(err);
    }
});

portal.post('/deletecourseslot',authH,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        if(verified.role=="AM"){  // academic member
            console.log("Academic member");
            const coursecoordinator= await AcademicMember.findOne({"id":verified.id}); 
            console.log(verified.id);
            if(coursecoordinator.coursecoordindator==1){    //course coordinator
                console.log("I am coordinator");
            const fac= await Faculties.findOne({"name":req.body.facultyname});
            let i=0;
            let j=0;
            for(i=0;i<fac.departments.length;i++){
                console.log("department not empty");
                if (fac.departments[i].id==req.body.departmentid){
                    console.log("we have equal departments ids!!");
                 for (j=0;j<fac.departments[i].courses.length;j++){
                    console.log("courses not empty thankfully");
                     if(fac.departments[i].courses[j].id==req.body.courseid){  //got course
                        console.log("course ids are equal !!");
                         if(fac.departments[i].courses[j].coordinator==verified.id){  //made sure he is a coordinator of this course
                            // console.log("academic"); 
                             let k;
                             let t;
                             let s;
                             let l=0;
                             const day= await Availability.findOne({"day":req.body.day}); // got row from avaialability
                            // for(k=0;k<fac.departments[i].courses[j].courseSchedule.length;k++){
                                if(req.body.day=="Saturday"){
                                            k=0;
                                }
                                if(req.body.day=="Sunday"){
                                    k=1;
                                        }
                                if(req.body.day=="Monday"){
                                    k=2;
                                       }
                             if(req.body.day=="Tuesday"){
                                     k=3;
                                      }                           
                             if(req.body.day=="Wednesday"){
                                      k=4;
                                    }
                            if(req.body.day=="Thursday"){
                                        k=5;
                            }

                            if(req.body.slot=="first"){
                                t="8:15 to 9;45";
                             }   
                             
                             if(req.body.slot=="second"){
                               t="10:00 to 11:30";
                            }   
                            if(req.body.slot=="third"){
                                t="11:45 to 1:15";
                             }   
                             
                             if(req.body.slot=="fourth"){
                                t="1:45 to 3:15";
                            }   
                            if(req.body.slot=="fifth"){
                                t="3:45 to 5:15";
                             }   
                             if(req.body.slot=="first"){
                                Availability.updateOne({"day":req.body.day},{$push:{"first":req.body.location}});
                                          
                                          const slot1 = {
                                              _id: "5ffa2d5d54160c3f68091ab3",
                                              timing:t,
                                              course: req.body.courseid,
                                              location:req.body.location
                                          }; //slot1
  
                                          fac.departments[i].courses[j].courseSchedule[k].first.pull(slot1);
                                          await fac.save();
                                          console.log(fac.departments[i].courses[j].courseSchedule[k].day);
                                          console.log(fac.departments[i].courses[j].courseSchedule[k].first);
                                          
                             }   
                             
                             if(req.body.slot=="second"){
                               
                                      await Availability.updateOne({"day":req.body.day},{$push:{"second":req.body.location}});
                                          console.log(day.second[l]);
                                          const slot1 = {
                                              timing:t,
                                              course: req.body.courseid,
                                              location:req.body.location
                                          }; //slot1
  
                                          fac.departments[i].courses[j].courseSchedule[k].second.pull(slot1);
                                          console.log(fac.departments[i].courses[j].courseSchedule[k].day);
                                          console.log("slot removed successfully");
                             
                            }   
                            if(req.body.slot=="third"){
                                
                                      await Availability.updateOne({"day":req.body.day},{$push:{"third":req.body.location}});
                                          
                                          const slot1 = {
                                              timing:t,
                                              course: req.body.courseid,
                                              location:req.body.location
                                          }; //slot1
  
                                          fac.departments[i].courses[j].courseSchedule[k].third.pull(slot1);
                                          console.log(fac.departments[i].courses[j].courseSchedule[k].day);
                                          console.log("slot removed successfully");
                              
                             }   
                             
                             if(req.body.slot=="fourth"){
                               
                                      await Availability.updateOne({"day":req.body.day},{$push:{"fourth":req.body.location}});
                                          
                                          const slot1 = {
                                              timing:t,
                                              course: req.body.courseid,
                                              location:req.body.location
                                          }; //slot1
  
                                          fac.departments[i].courses[j].courseSchedule[k].fourth.pull(slot1);
                                          console.log(fac.departments[i].courses[j].courseSchedule[k].day);
                                          console.log("slot removed successfully");
                              }    //if location
                             
                   } // for availibility "day"
                            }   
                            if(req.body.slot=="fifth"){
                                
                                      await Availability.updateOne({"day":req.body.day},{$push:{"fifth":req.body.location}});
                                          
                                          const slot1 = {
                                              timing:t,
                                              course: req.body.courseid,
                                              location:req.body.location
                                          }; //slot1
  
                                          fac.departments[i].courses[j].courseSchedule[k].fifth.pull(slot1);
                                          console.log(fac.departments[i].courses[j].courseSchedule[k].day);
                                          console.log("slot removed successfully");
                              
                             } 
                             
                                     

                              //  if(fac.departments[i].courses[j].courseSchedule[k].day==req.body.day){ // day given "row"
                                
                                   //  let whatever = req.body.slot;
                                 //  console.log(day.second);
                                   // console.log(slot);
                               
                       // res.send("choose another location :)");
                  // } // if courseschedule.day
                    //if day
                            
            } //if coordinator id
        } //if courseid
             } //for course
             const saved=  await  fac.save();  
            } //if departments
        } //for departments
       
     // console.log(saved);
        console.log("and saved");           
    } //coordinator if
 // AM if
    //try bracket

     
    catch(err){
        console.log(err);
    }
})

portal.post('/assignTAs',authA,async(req,res)=>{
    try{
        console.log("got here");
        const am= await AcademicMember.findOne({"id":req.body.TAid});
        am.courses.push(req.body.courseid);
        await am.save();
    }
    catch(err){
console.log(err)
    }
})


portal.post('/assigncoursecoordinator',authA,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        if(verified.role=="AM"){
            const courseinstructor= await AcademicMember.findOne({"id":verified.id}); 
            const fac=await Faculties.findOne({"name":req.body.facultyname});
            if(courseinstructor.courseinstructor==1){
                let i=0;
               for(i=0;i<fac.departments.length;i++){
                   if(fac.departments[i].id==req.body.departmentid){  
                    let j=0;
                    for (j=0;j<fac.departments[i].courses.length;j++){
                        if(fac.departments[i].courses[j].id==req.body.courseid){  //course wanted
                            let x;
                            for (x=0;x<fac.departments[i].courses[j].instructor.length;x++){
                        if(fac.departments[i].courses[j].instructor[x]==verified.id){
                            fac.departments[i].courses[j].coordinator=req.body.coordinatorid;
    
                            fac.save();
                        }
                    }
            }
        }
        await AcademicMember.updateOne({"id":req.body.coordinatorid},{$set:{"coursecoordindator":1}});
        res.send("coordinator assigned successfullly");
        }

        }
        }
        }

    }
catch(err){
    console.log(err);
}

})

portal.post('/assignunassignedslots',authA,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        if(verified.role=="AM"){  // academic member
            console.log("Academic member");
            const courseinstructor= await AcademicMember.findOne({"id":verified.id}); 
            //await AcademicMember.updateOne({"id":req.body.AMid},{$push:{"courses":req.body.courseid}});
            const am= await AcademicMember.findOne({"id":req.body.AMid});
            console.log(verified.id);
            if(courseinstructor.courseinstructor==1){    //course coordinator
                console.log("I am instructor");
            const fac= await Faculties.findOne({"name":req.body.facultyname});
            let i=0;
            let j=0;
            for(i=0;i<fac.departments.length;i++){
                console.log("department not empty");
                if (fac.departments[i].id==req.body.departmentid){
                    console.log("we have equal departments ids!!");
                 for (j=0;j<fac.departments[i].courses.length;j++){
                    console.log("courses not empty thankfully");
                     if(fac.departments[i].courses[j].id==req.body.courseid){  //got course
                        console.log("course ids are equal !!");
                         if(fac.departments[i].courses[j].instructor[1]==verified.id){  //made sure he is a coordinator of this course
                            fac.departments[i].courses[j].TAs.push(req.body.AMid);
                            fac.departments[i].courses[j].NoOfAssignedSlots=fac.departments[i].courses[j].NoOfAssignedSlots+1;

                            console.log("right academic"); 
                             let k;
                             let t;
                             let s;
                             let l;
                             const day= await Availability.findOne({"day":req.body.day}); // got row from avaialability
                            // for(k=0;k<fac.departments[i].courses[j].courseSchedule.length;k++){
                                if(req.body.day=="Saturday"){
                                            k=0;
                                }
                                if(req.body.day=="Sunday"){
                                    k=1;
                                        }
                                if(req.body.day=="Monday"){
                                    k=2;
                                       }
                             if(req.body.day=="Tuesday"){
                                     k=3;
                                      }                           
                             if(req.body.day=="Wednesday"){
                                      k=4;
                                    }
                            if(req.body.day=="Thursday"){
                                        k=5;
                            }

                            if(req.body.slot=="first"){
                                t="8:15 to 9;45";
                             }   
                             
                             if(req.body.slot=="second"){
                               t="10:00 to 11:30";
                            }   
                            if(req.body.slot=="third"){
                                t="11:45 to 1:15";
                             }   
                             
                             if(req.body.slot=="fourth"){
                                t="1:45 to 3:15";
                            }   
                            if(req.body.slot=="fifth"){
                                t="3:45 to 5:15";
                             }   
                            
                             if(req.body.slot=="first"){
                               
                                        for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].first.length;l++) {
                                            console.log(req.body.slot);
                                            console.log(fac.departments[i].courses[j].courseSchedule[k].first.length);
                                            if(fac.departments[i].courses[j].courseSchedule[k].first[l][0].location==req.body.location){
                                               // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                                          fac.departments[i].courses[j].courseSchedule[k].first[l][0].AM=req.body.AMid;
                                          am.Schedule[k].first.push(fac.departments[i].courses[j].courseSchedule[k].first[l][0]);
                                            }
                                          console.log("TA added successfully");
                              } 
                               }   //if location
                             
                
                              
                             
                             if(req.body.slot=="second"){
                                for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].second.length;l++) {
                                    if(fac.departments[i].courses[j].courseSchedule[k].second[l][0].location==req.body.location){
                                        // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                                   fac.departments[i].courses[j].courseSchedule[k].second[l][0].AM=req.body.AMid;
                                   am.Schedule[k].second.push(fac.departments[i].courses[j].courseSchedule[k].second[l][0]);
                                     }
                                    console.log("TA added successfully");
                        } 
                         }  
                            if(req.body.slot=="third"){
                                for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].third.length;l++) {
                                    if(fac.departments[i].courses[j].courseSchedule[k].third[l][0].location==req.body.location){
                                        // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                                   fac.departments[i].courses[j].courseSchedule[k].third[l][0].AM=req.body.AMid;
                                   am.Schedule[k].third.push(fac.departments[i].courses[j].courseSchedule[k].third[l][0]);
                                     }
                                    console.log("TA added successfully");
                        } 
                         } 
                             
                             if(req.body.slot=="fourth"){
                                for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].fourth.length;l++) {
                                    if(fac.departments[i].courses[j].courseSchedule[k].fourth[l][0].location==req.body.location){
                                        // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                                   fac.departments[i].courses[j].courseSchedule[k].fourth[l][0].AM=req.body.AMid;
                                   am.Schedule[k].fourth.push(fac.departments[i].courses[j].courseSchedule[k].fourth[l][0]);
                                     }
                                    console.log("TA added successfully");
                        } 
                         } 
                            if(req.body.slot=="fifth"){
                                for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].fifth.length;l++) {
                                  //  console.log(fac.departments[i].courses[j].courseSchedule[k].fifth[l][0].location);
                                    if(fac.departments[i].courses[j].courseSchedule[k].fifth[l][0].location==req.body.location){
                                       console.log(fac.departments[i].courses[j].TAs[10]);
                                   fac.departments[i].courses[j].courseSchedule[k].fifth[l][0].AM=req.body.AMid;
                                   am.Schedule[k].fifth.push(fac.departments[i].courses[j].courseSchedule[k].fifth[l][0]);
                                   console.log("TA added successfully");
                                     }
                                    
                                   
                        } 
                         } 
                             
                                     

                            
            } //if coordinator id
        } //if courseid
             } //for course
           
            } //if departments
        } //for departments
      const saved=  await  fac.save();   
      await am.save();
     // console.log(saved);
        console.log("and saved");           
    } //coordinator if
} // AM if
    } //try bracket
     
    catch(err){
        console.log(err);
    }
});

portal.get('/viewcoursecoverageCI',authA,async(req,res)=>{
    try{
        const listOfcoverage=[];
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
       // console.log(token);
        if(verified.role=="AM"){
            const am= AcademicMember.findOne({"id":verified.id,"courseinstructor":1});
            if(!am){
                console.log("you are not a course instructor")
            }
            else{
                console.log(req.query.facultyname);
                const fac=await Faculties.findOne({"name":req.query.facultyname});
                for(i=0;i<fac.departments.length;i++){//maskeen el department el fiha el hod
                    
                        let j=0;
                        for (j=0;j<fac.departments[i].courses.length;j++){//maskeen el courses le kol department
                         
                            for(k=0;k<fac.departments[i].courses[j].instructor.length;k++){
                                
                             //   console.log(fac.departments[i].courses[j].courseinstructor[k])
                            if(fac.departments[i].courses[j].instructor[k]==verified.id){
                               // console.log(fac.departments[i].courses.length)
                                let slots=fac.departments[i].courses[j].NoOfSlots
                                let ass=fac.departments[i].courses[j].NoOfAssignedSlots
                                let coverage=(ass/slots)*100
                                fac.departments[i].courses[j].coverage=coverage
                                //console.log("sdf")
                                    listOfcoverage.push(fac.departments[i].courses[j].name+" covergae: "+fac.departments[i].courses[j].coverage+"%")
                            
                    }
                }
               // const department=faculty.findOne({"departments.HOD":verified.id})
               
               console.log(listOfcoverage)
                res.send(listOfcoverage);
                
            }


        }
    }
}
    }
    catch(err){
        console.log(err)
    }
})

portal.post('/deleteassigningunassignedslots',authA,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        if(verified.role=="AM"){  // academic member
            console.log("Academic member");
            const courseinstructor= await AcademicMember.findOne({"id":verified.id}); 
            //await AcademicMember.updateOne({"id":req.body.AMid},{$push:{"courses":req.body.courseid}});
            const am= await AcademicMember.findOne({"id":req.body.AMid});
            console.log(verified.id);
            if(courseinstructor.courseinstructor==1){    //course coordinator
                console.log("I am instructor");
            const fac= await Faculties.findOne({"name":req.body.facultyname});
            let i=0;
            let j=0;
            for(i=0;i<fac.departments.length;i++){
                console.log("department not empty");
                if (fac.departments[i].id==req.body.departmentid){
                    console.log("we have equal departments ids!!");
                 for (j=0;j<fac.departments[i].courses.length;j++){
                    console.log("courses not empty thankfully");
                     if(fac.departments[i].courses[j].id==req.body.courseid){  //got course
                        console.log("course ids are equal !!");
                         if(fac.departments[i].courses[j].instructor[1]==verified.id){  //made sure he is a coordinator of this course
                       //     fac.departments[i].courses[j].TAs.pull(req.body.AMid);
                            fac.departments[i].courses[j].NoOfAssignedSlots=fac.departments[i].courses[j].NoOfAssignedSlots-1;

                            console.log("right academic"); 
                            let k;
                            let t;
                            let s;
                            let l;
                            const day= await Availability.findOne({"day":req.body.day}); // got row from avaialability
                           // for(k=0;k<fac.departments[i].courses[j].courseSchedule.length;k++){
                               if(req.body.day=="Saturday"){
                                           k=0;
                               }
                               if(req.body.day=="Sunday"){
                                   k=1;
                                       }
                               if(req.body.day=="Monday"){
                                   k=2;
                                      }
                            if(req.body.day=="Tuesday"){
                                    k=3;
                                     }                           
                            if(req.body.day=="Wednesday"){
                                     k=4;
                                   }
                           if(req.body.day=="Thursday"){
                                       k=5;
                           }

                            if(req.body.slot=="first"){
                                       for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].first.length;l++) {
                                           console.log(fac.departments[i].courses[j].courseSchedule[k].first.length);
                                           if(fac.departments[i].courses[j].courseSchedule[k].first[l][0].AM==req.body.AMid){
                                              // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                                         fac.departments[i].courses[j].courseSchedule[k].first[l][0].AM="no assigned AM";
                                         am.Schedule[k].first.pull(fac.departments[i].courses[j].courseSchedule[k].first[l][0]);
                                           }
                                         console.log("TA removed successfully");
                             } 
                              }   //if location
                            
               
                             
                            
                            if(req.body.slot=="second"){
                               for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].second.length;l++) {
                                   if(fac.departments[i].courses[j].courseSchedule[k].second[l][0].AM==req.body.AMid){
                                       // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                                  fac.departments[i].courses[j].courseSchedule[k].second[l][0].AM="no assigned AM";
                                  am.Schedule[k].second.pull(fac.departments[i].courses[j].courseSchedule[k].second[l][0]);
                                    }
                                   console.log("TA removed successfully");
                       } 
                        }  
                           if(req.body.slot=="third"){
                               for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].third.length;l++) {
                                   if(fac.departments[i].courses[j].courseSchedule[k].third[l][0].AM==req.body.AMid){
                                       // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                                  fac.departments[i].courses[j].courseSchedule[k].third[l][0].AM="no assigned AM";
                                  am.Schedule[k].third.pull(fac.departments[i].courses[j].courseSchedule[k].third[l][0]);
                                    }
                                   console.log("TA removed successfully");
                       } 
                        } 
                            
                            if(req.body.slot=="fourth"){
                               for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].fourth.length;l++) {
                                   if(fac.departments[i].courses[j].courseSchedule[k].fourth[l][0].AM==req.body.AMid){
                                       // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                                  fac.departments[i].courses[j].courseSchedule[k].fourth[l][0].AM="no assigned AM";
                                  am.Schedule[k].fourth.pull(fac.departments[i].courses[j].courseSchedule[k].fourth[l][0]);
                                    }
                                   console.log("TA removed successfully");
                       } 
                        } 
                           if(req.body.slot=="fifth"){
                               for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].fifth.length;l++) {
                                 //  console.log(fac.departments[i].courses[j].courseSchedule[k].fifth[l][0].location);
                                   if(fac.departments[i].courses[j].courseSchedule[k].fifth[l][0].AM==req.body.AMid){
                                      console.log(fac.departments[i].courses[j].TAs[10]);
                                  fac.departments[i].courses[j].courseSchedule[k].fifth[l][0].AM="no assigned AM";
                                  am.Schedule[k].fifth.pull(fac.departments[i].courses[j].courseSchedule[k].fifth[l][0]);
                                  console.log("TA removed successfully");
                                    }
                                   
                                  
                       } 
                        } 
                            
                                    

                           
           } //if coordinator id
       } //if courseid
            } //for course
          
           } //if departments
       } //for departments
     const saved=  await  fac.save();   
     await am.save();
    // console.log(saved);
       console.log("and saved");           
   } //coordinator if
} // AM if
   } //try bracket
    
   catch(err){
       console.log(err);
   }
})

portal.post('/removeassignedAM',authA,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password); 
        if(verified.role=="AM"){
            const courseinstructor= await AcademicMember.findOne({"id":verified.id});
            const am= await AcademicMember.findOne({"id":req.body.AMid});
            console.log(verified.id);
            if(courseinstructor.courseinstructor==1){    //course coordinator
                console.log("I am instructor");
            const fac= await Faculties.findOne({"name":req.body.facultyname});
            let i=0;
            let j=0;
            for(i=0;i<fac.departments.length;i++){
                console.log("department not empty");
                if (fac.departments[i].id==req.body.departmentid){
                    console.log("we have equal departments ids!!");
                 for (j=0;j<fac.departments[i].courses.length;j++){
                    console.log("courses not empty thankfully");
                    console.log(fac.departments[i].courses[j].id);
                     if(fac.departments[i].courses[j].id==req.body.courseid){  //got course
                        console.log("course ids are equal !!");
                        for(x=0;x<fac.departments[i].courses[j].instructor.length;x++){
                         if(fac.departments[i].courses[j].instructor[x]==verified.id){  
                             console.log("el course is your course");
                            fac.departments[i].courses[j].TAs.pull(req.body.AMid);
                            am.courses.pull(req.body.courseid);
                        }
                    }
        }
    }
}
            }
            await fac.save();
            await am.save();
        }
    }
}
    catch(err){
console.log(err);
    }
})

portal.get('/viewslotsassignment',authA,async(req,res)=>{
    try{
        const listOfTas=[];
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password); 
        if(verified.role=="AM"){
        let assignmentslist=[];
        const fac= await Faculties.findOne({"name":req.query.facultyname});
        const courseinstructor= await AcademicMember.findOne({"id":verified.id}); 
        if(courseinstructor.courseinstructor==1){    //course coordinator
            console.log("I am instructor");
     
        let i=0;
        let j=0;
        let x=0;
        for(i=0;i<fac.departments.length;i++){
            console.log("department not empty");
            if (fac.departments[i].id==req.query.departmentid){
                console.log("we have equal departments ids!!");
             for (j=0;j<fac.departments[i].courses.length;j++){
                console.log("courses not empty thankfully");
                 // searching for instructor of course 
                 if(fac.departments[i].courses[j].id==req.query.courseid){  //got course
                    console.log("course ids are equal !!");
                    for(x=0;x<fac.departments[i].courses[j].instructor.length;x++){ 
                     if(fac.departments[i].courses[j].instructor[x]==verified.id){  //made sure he is a coordinator of this course
                       let y;
                       let z;
                       let h;
                   
                    //    for(y=0;y<fac.departments[i].courses[j].courseSchedule.length;i++){
                           // for(z=0;z<fac.departments[i].courses[j].courseSchedule[y].length;z++){
                            if(fac.departments[i].courses[j].courseSchedule[0].first[0]){   // saturday slots
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[0].first[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[0].first[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[0].first[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[0].second[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[0].second[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[0].second[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[0].second[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[0].third[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[0].third[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[0].third[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[0].third[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[0].fourth[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[0].fourth[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[0].fourth[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[0].fourth[0][b]);
                                    }
                                } 
                              }
                              
                              if(fac.departments[i].courses[j].courseSchedule[0].fifth[0]){
                                  let b;
                                 // console.log(fac.departments[i].courses[j].courseSchedule[0].fifth[0].length);
                                  for(b=0;b<fac.departments[i].courses[j].courseSchedule[0].fifth[0].length;b++){
                                      if(fac.departments[i].courses[j].courseSchedule[0].fifth[0][b].AM==verified.id){
                                       //   console.log(fac.departments[i].courses[j].courseSchedule[0].fifth[0][b].AM);
                                        assignmentslist.push(fac.departments[i].courses[j].courseSchedule[0].fifth[0][b]);
                                      }
                                  }
                                
                              }

                              if(fac.departments[i].courses[j].courseSchedule[1].first[0]){   // sunday slots
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[1].first[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[1].first[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[1].first[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[1].second[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[1].second[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[1].second[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[1].second[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[1].third[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[1].third[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[1].third[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[1].third[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[1].fourth[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[1].fourth[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[1].fourth[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[1].fourth[0][b]);
                                    }
                                } 
                              }
                              
                              if(fac.departments[i].courses[j].courseSchedule[1].fifth[0]){
                                  let b;
                                  for(b=0;b<fac.departments[i].courses[j].courseSchedule[1].fifth[0].length;b++){
                                      if(fac.departments[i].courses[j].courseSchedule[1].fifth[0][b].AM==verified.id){
                                        assignmentslist.push(fac.departments[i].courses[j].courseSchedule[1].fifth[0][b]);
                                      }
                                  }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[2].first[0]){   // monday slots
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[2].first[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[2].first[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[2].first[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[2].second[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[2].second[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[2].second[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[2].second[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[2].third[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[2].third[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[2].third[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[2].third[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[2].fourth[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[2].fourth[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[2].fourth[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[2].fourth[0][b]);
                                    }
                                } 
                              }
                              
                              if(fac.departments[i].courses[j].courseSchedule[2].fifth[0]){
                                  let b;
                                  for(b=0;b<fac.departments[i].courses[j].courseSchedule[2].fifth[0].length;b++){
                                      if(fac.departments[i].courses[j].courseSchedule[2].fifth[0][b].AM==verified.id){
                                        assignmentslist.push(fac.departments[i].courses[j].courseSchedule[2].fifth[0][b]);
                                      }
                                  }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[3].first[0]){   // tuesday slots
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[3].first[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[3].first[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[3].first[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[3].second[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[3].second[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[3].second[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[3].second[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[3].third[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[3].third[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[3].third[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[3].third[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[3].fourth[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[3].fourth[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[3].fourth[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[3].fourth[0][b]);
                                    }
                                } 
                              }
                              
                              if(fac.departments[i].courses[j].courseSchedule[3].fifth[0]){
                                  let b;
                                  for(b=0;b<fac.departments[i].courses[j].courseSchedule[3].fifth[0].length;b++){
                                      if(fac.departments[i].courses[j].courseSchedule[3].fifth[0][b].AM==verified.id){
                                        assignmentslist.push(fac.departments[i].courses[j].courseSchedule[3].fifth[0][b]);
                                      }
                                  }
                              }

                              if(fac.departments[i].courses[j].courseSchedule[4].first[0]){   // wednesday slots
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[4].first[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[4].first[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[4].first[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[4].second[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[4].second[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[4].second[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[4].second[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[4].third[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[4].third[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[4].third[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[4].third[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[4].fourth[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[4].fourth[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[4].fourth[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[4].fourth[0][b]);
                                    }
                                } 
                              }
                              
                              if(fac.departments[i].courses[j].courseSchedule[4].fifth[0]){
                                  let b;
                                  for(b=0;b<fac.departments[i].courses[j].courseSchedule[4].fifth[0].length;b++){
                                      if(fac.departments[i].courses[j].courseSchedule[4].fifth[0][b].AM==verified.id){
                                        assignmentslist.push(fac.departments[i].courses[j].courseSchedule[4].fifth[0][b]);
                                      }
                                  }
                              }

                              if(fac.departments[i].courses[j].courseSchedule[5].first[0]){   // thursday slots
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[5].first[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[5].first[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[5].first[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[5].second[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[5].second[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[5].second[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[5].second[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[5].third[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[5].third[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[5].third[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[5].third[0][b]);
                                    }
                                }
                              }
                              if(fac.departments[i].courses[j].courseSchedule[5].fourth[0]){
                                let b;
                                for(b=0;b<fac.departments[i].courses[j].courseSchedule[5].fourth[0].length;b++){
                                    if(fac.departments[i].courses[j].courseSchedule[5].fourth[0][b].AM==verified.id){
                                      assignmentslist.push(fac.departments[i].courses[j].courseSchedule[5].fourth[0][b]);
                                    }
                                } 
                              }
                              
                              if(fac.departments[i].courses[j].courseSchedule[5].fifth[0]){
                                  let b;
                                  for(b=0;b<fac.departments[i].courses[j].courseSchedule[5].fifth[0].length;b++){
                                      if(fac.departments[i].courses[j].courseSchedule[5].fifth[0][b].AM==verified.id){
                                        assignmentslist.push(fac.departments[i].courses[j].courseSchedule[5].fifth[0][b]);
                                      }
                                  }
                              }

                            
                        }

                     }
                     }
    }
}
            
}
res.send(assignmentslist);
        }
    }
   
}

    catch(err){
        console.log(err);
    }
})

portal.post('/updateassigningunassignedslots',authA,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        if(verified.role=="AM"){  // academic member
            console.log("Academic member");
            const courseinstructor= await AcademicMember.findOne({"id":verified.id}); 
            //await AcademicMember.updateOne({"id":req.body.AMid},{$push:{"courses":req.body.courseid}});
            const oldam= await AcademicMember.findOne({"id":req.body.oldAMid});
            const newam= await AcademicMember.findOne({"id":req.body.newAMid});
            console.log(verified.id);
            if(courseinstructor.courseinstructor==1){    //course coordinator
                console.log("I am instructor");
            const fac= await Faculties.findOne({"name":req.body.facultyname});
            let i=0;
            let j=0;
            for(i=0;i<fac.departments.length;i++){
                console.log("department not empty");
                if (fac.departments[i].id==req.body.departmentid){
                    console.log("we have equal departments ids!!");
                 for (j=0;j<fac.departments[i].courses.length;j++){
                    console.log("courses not empty thankfully");
                     if(fac.departments[i].courses[j].id==req.body.courseid){  //got course
                        console.log("course ids are equal !!");
                         if(fac.departments[i].courses[j].instructor[1]==verified.id){  //made sure he is a coordinator of this course
                      //      fac.departments[i].courses[j].TAs.pull(req.body.oldAMid);
                        //    fac.departments[i].courses[j].TAs.push(req.body.newAMid);
                         //   fac.departments[i].courses[j].NoOfAssignedSlots=fac.departments[i].courses[j].NoOfAssignedSlots+1;

                            console.log("right academic"); 
                             let k;
                             let t;
                             let s;
                             let l;
                             const day= await Availability.findOne({"day":req.body.day}); // got row from avaialability
                            // for(k=0;k<fac.departments[i].courses[j].courseSchedule.length;k++){
                                if(req.body.day=="Saturday"){
                                            k=0;
                                }
                                if(req.body.day=="Sunday"){
                                    k=1;
                                        }
                                if(req.body.day=="Monday"){
                                    k=2;
                                       }
                             if(req.body.day=="Tuesday"){
                                     k=3;
                                      }                           
                             if(req.body.day=="Wednesday"){
                                      k=4;
                                      //console.log("wednesday");
                                    }
                            if(req.body.day=="Thursday"){
                                        k=5;
                            }

                             
                             if(req.body.slot=="first"){
                                        for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].first.length;l++) {
                                           // console.log(fac.departments[i].courses[j].courseSchedule[k].first.length);
                                            
                                            if(fac.departments[i].courses[j].courseSchedule[k].first[l][0].AM==req.body.oldAMid){
                                               
                                          fac.departments[i].courses[j].courseSchedule[k].first[l][0].AM=req.body.newAMid;
                                          newam.Schedule[k].first.push(fac.departments[i].courses[j].courseSchedule[k].first[l][0]);
                                          oldam.Schedule[k].first.pull(fac.departments[i].courses[j].courseSchedule[k].first[l][0]);
                                            }
                                          console.log("TA updated successfully");
                              } 
                               }   //if location
                             
                
                              
                             
                             if(req.body.slot=="second"){
                                for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].second.length;l++) {
                                    if(fac.departments[i].courses[j].courseSchedule[k].second[l][0].AM==req.body.oldAMid){
                                        // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                                   fac.departments[i].courses[j].courseSchedule[k].second[l][0].AM=req.body.newAMid;
                                   newam.Schedule[k].second.push(fac.departments[i].courses[j].courseSchedule[k].second[l][0]);
                                   oldam.Schedule[k].second.pull(fac.departments[i].courses[j].courseSchedule[k].second[l][0]);
                                     }
                                    console.log("TA updated successfully");
                        } 
                         }  
                            if(req.body.slot=="third"){
                                for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].third.length;l++) {
                                    if(fac.departments[i].courses[j].courseSchedule[k].third[l][0].AM==req.body.oldAMid){
                                        // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                                   fac.departments[i].courses[j].courseSchedule[k].third[l][0].AM=req.body.newAMid;
                                   newam.Schedule[k].third.push(fac.departments[i].courses[j].courseSchedule[k].third[l][0]);
                                   oldam.Schedule[k].third.pull(fac.departments[i].courses[j].courseSchedule[k].third[l][0]);
                                     }
                                    console.log("TA updated successfully");
                        } 
                         } 
                             
                             if(req.body.slot=="fourth"){
                                for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].fourth.length;l++) {
                                    if(fac.departments[i].courses[j].courseSchedule[k].fourth[l][0].AM==req.body.oldAMid){
                                        // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                                   fac.departments[i].courses[j].courseSchedule[k].fourth[l][0].AM=req.body.newAMid;
                                   newam.Schedule[k].fourth.push(fac.departments[i].courses[j].courseSchedule[k].fourth[l][0]);
                                   oldam.Schedule[k].fourth.pull(fac.departments[i].courses[j].courseSchedule[k].fourth[l][0]);
                                     }
                                    console.log("TA updated successfully");
                        } 
                         } 
                            if(req.body.slot=="fifth"){
                                console.log(fac.departments[i].courses[j].courseSchedule[k].fifth.length);
                                for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].fifth.length;l++) {
                                  //  console.log(fac.departments[i].courses[j].courseSchedule[k].fifth[l][0].location);
                                  console.log(fac.departments[i].courses[j].courseSchedule[k].fifth[l][0].AM);
                                    if(fac.departments[i].courses[j].courseSchedule[k].fifth[l][0].AM==req.body.oldAMid){
                                     // console.log(fac.departments[i].courses[j].TAs[10]);
                                     
                                   fac.departments[i].courses[j].courseSchedule[k].fifth[l][0].AM=req.body.newAMid;
                                   newam.Schedule[k].fifth.push(fac.departments[i].courses[j].courseSchedule[k].fifth[l][0]);
                                   oldam.Schedule[k].fifth.pull(fac.departments[i].courses[j].courseSchedule[k].fifth[l][0]);
                                   console.log("TA updated successfully");
                                     }
                                    
                                   
                        } 
                         } 
                             
                                     

                            
            } //if coordinator id
        } //if courseid
             } //for course
           
            } //if departments
        } //for departments
      const saved=  await  fac.save();   
      await oldam.save();
      await newam.save();
     // console.log(saved);
        console.log("and saved");           
    } //coordinator if
} // AM if
    } //try bracket
     
    catch(err){
        console.log(err);
    }
}) 

portal.get('/instviewstaffbydep',authA,async(req,res)=>{
    try{
        // let schema=Joi.object().keys({
        //     facultyname:Joi.string().min(4).max(30).required(),
        //     coursename:Joi.string().min(4).max(30).required(),
            
        // });
        // const{body}=req;
        // const joiresult=schema.validate(body);
        // const {error} =joiresult;
        // const valid=(error==null);
        // if(!valid){
        //     return res.status(400).json({msg: "faculty name not valid"});
        // }
        let listOfTas=[];
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password); 
        if(verified.role=="AM"){
            const am= await AcademicMember.findOne({"id":verified.id,"courseinstructor":1});
            if(!am){
                res.send("you are not a course instructor")
            }
            else{
               // console.log(req.body.facultyname)
                const faculty=await Faculties.findOne({"name":req.query.facultyname});
              
                for(i=0;i<faculty.departments.length;i++){//maskeen el department el fiha el hod
                    //res.send(faculty.departments[i].courses[i].TAs)
                  
                    
                    if(faculty.departments[i].name==req.query.department_name){
                        for (j=0;j<faculty.departments[i].courses[i].instructor.length;j++){
                        if(faculty.departments[i].courses[i].instructor[j]==verified.id){
                           for( k=0;k<faculty.departments[i].courses[i].TAs.length;k++){
                            let member1= await AcademicMember.findOne({id:faculty.departments[i].courses[i].TAs[k]});

 
                            let loc = {
                                name: member1.name,
                                office:member1.office,
                               email:member1.email,
                               dayoff:member1.dayoff,
                               Salary:member1.salary,
                               id:member1.id
                    
                               
                            }
                          listOfTas.push(loc);
                          
                           }
                          
                            
                        }
                        
                       
                    
            }
            res.send(listOfTas);


        }
        else{
            res.send("enter a vaild department")
        }
    }
}
    }}
    catch(err){
        console.log(err)
    }
})

portal.get('/instviewstaffbycourse',authA,async(req,res)=>{
    try{
        // let schema=Joi.object().keys({
        //     facultyname:Joi.string().min(4).max(30).required(),
        //     coursename:Joi.string().min(4).max(30).required(),
            
        // });
        // const{body}=req;
        // const joiresult=schema.validate(body);
        // const {error} =joiresult;
        // const valid=(error==null);
        // if(!valid){
        //     return res.status(400).json({msg: "faculty name not valid"});
        // }
        const listOfTas=[];
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password); 
        if(verified.role=="AM"){
            const am= await AcademicMember.findOne({"id":verified.id,"courseinstructor":1});
            if(!am){
                res.send("you are not a course instructor")
            }
            else{
               // console.log(req.body.facultyname)
                const faculty=await Faculties.findOne({"name":req.query.facultyname});
                //department id needed and course id 
                for(i=0;i<faculty.departments.length;i++){//maskeen el department el fiha el hod
                    if(faculty.departments[i].name==req.query.department_name){
                        for( k=0;k<faculty.departments[i].courses.length;k++){
                          
                    if(faculty.departments[i].courses[k].id==req.query.courseid){
                        for( j=0;j<faculty.departments[i].courses[k].instructor.length;j++){
                        if(faculty.departments[i].courses[k].instructor[j]==verified.id){
                            for( l=0;l<faculty.departments[i].courses[k].TAs.length;l++){
                                let member1= await AcademicMember.findOne({id:faculty.departments[i].courses[k].TAs[l]});
    
     
                                let loc = {
                                    name: member1.name,
                                    office:member1.office,
                                   email:member1.email,
                                   dayoff:member1.dayoff,
                                   Salary:member1.salary,
                                   id:member1.id
                        
                                   
                                }
                              listOfTas.push(loc);
                              
                               }
                        }

                    }
                }
            }
            }
 

        }
        res.send(listOfTas);
    }
}
    }
    catch(err){
        console.log(err)
    }
})
portal.post('/AcceptAccidentalLeaveHOD', authA,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const requester = await AcademicMember.findOne({id: req.body.id});
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
          // find HOD
          let HODid;
          const faculty = await Faculties.findOne({"name": requester.faculty});
          //console.log(requester.faculty)
          for(let i = 0; i < faculty.departments.length;i++){
              if(faculty.departments[i].name == requester.department){
                  HODid = faculty.departments[i].HOD;
              }
          }
        const HODfound = await AcademicMember.find({id:HODid});
        if(verified.id != HODid){
            return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
        }
        else{
            const request = await AccidentalLeaves.findOne({req_id: req.body.reqID});
            const requester = await AcademicMember.findOne({id: request.id});
            if(!request){
                res.send("0")
                return res.status(400).json({msg:"Request wasn't found in the database"});
            }
            else{
                await AccidentalLeaves.updateOne({req_id: req.body.reqID}, {status: 1});
                //remove from HOD's list
                for(let i = 0; i < HODfound[0].accidentalLeaverequests.length; i++){
                    if(HODfound[0].accidentalLeaverequests[i].id == req.body.id){
                        HODfound[0].accidentalLeaverequests.splice(i,1);
                    }
                }
                requester.accidentalLeave = requester.accidentalLeave - 1;
                await requester.save();
                await HODfound[0].save();
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

portal.post('/RejectAccidentalLeaveHOD', authA,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        const requester = await AcademicMember.findOne({id: req.body.id});
          // find HOD
          let HODid;
          const faculty = await Faculties.findOne({"name": requester.faculty});
          for(let i = 0; i < faculty.departments.length;i++){
              if(faculty.departments[i].name == requester.department){
                  HODid = faculty.departments[i].HOD;
              }
          }
        const HODfound = await AcademicMember.find({id:HODid});
        if(verified.id != HODid){
            return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
        }
        else{
            const request = await AccidentalLeaves.findOne({req_id: req.body.reqID});
            if(!request){
                return res.status(400).json({msg:"Request wasn't found in the database"});
            }
            else{
                await AccidentalLeaves.updateOne({req_id: req.body.reqID}, {status: 2});
                //remove from HOD's list
                for(let i = 0; i < HODfound[0].accidentalLeaverequests.length; i++){
                    if(HODfound[0].accidentalLeaverequests[i].id == req.body.id){
                        HODfound[0].accidentalLeaverequests.splice(i,1);
                    }
                }
                await HODfound[0].save();
            }
        }
    }
    catch(err){
        console.log(err);
    }
});


portal.post('/AcceptAnnualLeaveHOD', authA,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        const requester = await AcademicMember.findOne({id: req.body.id});
          // find HOD
          let HODid;
        //  console.log("as")
          const faculty = await Faculties.findOne({"name":requester.faculty});
       // console.log(requester)
          for(let i = 0; i < faculty.departments.length;i++){
              if(faculty.departments[i].name == requester.department){
                  HODid = faculty.departments[i].HOD;
              }
          }
          const HODfound = await AcademicMember.find({id:HODid});
         // console.log(verified.id)
        //  console.log(HODfound)
        if(verified.id != HODid){
            return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
        }
        else{
           
           // console.log(req.body.reqID)
            const request = await AnnualLeave.findOne({req_id: req.body.reqID});
           
            const requester = await AcademicMember.findOne({id: req.body.id});
          // console.log(requester)
            if(!request){
                return res.status(400).json({msg:"Request wasn't found in the database"});
            }
            else{
               // console.log(HODfound[0].id)
                //console.log(HODfound)
             //    req= await AnnualLeave.findOne({req_id: req.body.req_id});
             //    console.log(req)
                await AnnualLeave.updateOne({req_id: req.body.reqID}, {status: 1});
                //remove from HOD's list
               // console.log(HODfound[0])
                for(let i = 0; i < HODfound[0].annualLeaverequests.length; i++){

                    if(HODfound[0].annualLeaverequests[i].id == req.body.id){
                        HODfound[0].annualLeaverequests.splice(i,1);
                    }
                }
                console.log("dd")
              //  console.log(requester)
                requester.annualdays = requester.annualdays - 1;
               await requester.save();
                await HODfound[0].save();
            }
        }
    }
    catch(err){
        console.log(err);
    }
});


portal.post('/AcceptCompensationLeaveHOD', authA,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        const requester = await AcademicMember.findOne({id: req.body.id});
        // find HOD
        let HODid;
        const faculty = await Faculties.findOne({"name": requester.faculty});
       // console.log(faculty.departments)
        for(let i = 0; i < faculty.departments.length;i++){
            if(faculty.departments[i].name == requester.department){
                HODid = faculty.departments[i].HOD;
            }
        }
        const HODfound = await AcademicMember.find({id:HODid});
        if(verified.id != HODid){
            return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
        }
        else{
            const request = await CompensationRequest.findOne({req_id: req.body.reqID});
            if(!request){
                return res.status(400).json({msg:"Request wasn't found in the database"});
            }
            else{
                await CompensationRequest.updateOne({req_id: req.body.reqID}, {status: 1});
                 //remove from HOD's list
                 for(let i = 0; i < HODfound[0].compensationrequests.length; i++){
                    console.log(HODfound[0].compensationrequests[i].req_id)
                    if(HODfound[0].compensationrequests[i].id == req.body.id){
                      
                        HODfound[0].compensationrequests.splice(i,1);
                    }
                }
                await HODfound[0].save();
                const todaysDate = new Date();
                //add an attendance record to the requester
                const todaysRecord = {"day":todaysDate.getDay(), "date": request.date, "month": request.month, "hours": 8, "minutes":24};
                await AcademicMember.updateOne({"id": requester.id},{$push: {'AttendanceRecords': todaysRecord}});
            }
        }
    }
    catch(err){
        console.log(err);
    }
});


portal.post('/acceptdayoff',authA,async(req,res)=>{
    const listOfTas=[];
    const JWT_Password="RandomString";
    const verified = jwt.verify(req.header('x-auth-token'),JWT_Password); 
    
    if(verified.role=="AM"){
        const am= await AcademicMember.findOne({"id":verified.id,"HOD":1});
        if(!am){
            console.log("you are not a head of department")
        }
        else{
            let request="";
            console.log(req.body.AMid)
            await DayOffRequest.updateOne({id:req.body.AMid},{"acceptanceStatus":1})
                  
            for(i=0;i<am.dayoffrequests.length;i++){
                
                if(am.dayoffrequests[i].id==req.body.AMid)
                {
                    await AcademicMember.updateOne({id:req.body.AMid},{"dayoff":am.dayoffrequests[i].requestedDayoff})
                    await DayOffRequest.updateOne({id:req.body.AMid},{"acceptanceStatus":1})
                       
                       // const request=await DayOffRequest.findOne({id:req.body.AMid});
                       // await AcademicMember.updateOne({id:verified.id},{$pull:{"dayoffrequests":request}})
                        am.dayoffrequests[i].acceptanceStatus=1;
                      await  am.save();
                }
            }
        }
    }
    res.send("dayoff request accepted")
})



portal.post('/AcceptMaternityLeaveHOD', authA,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        const requester = await AcademicMember.findOne({id: req.body.id});
          // find HOD
          let HODid;
          const faculty =await Faculties.findOne({"name": requester.faculty});
          for(let i = 0; i < faculty.departments.length;i++){
              if(faculty.departments[i].name == requester.department){
                  HODid = faculty.departments[i].HOD;
              }
          }
          const HODfound = await AcademicMember.find({id:HODid});
        if(verified.id != HODid){
            return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
        }
        else{
            const request = await MaternityRequest.findOne({req_id: req.body.reqID});
            if(!request){
                return res.status(400).json({msg:"Request wasn't found in the database"});
            }
            else{
                await MaternityRequest.updateOne({req_id: req.body.reqID}, {status: 1});
                //remove from HOD's list
                for(let i = 0; i < HODfound[0].maternityLeave.length; i++){
                    if(HODfound[0].maternityLeave[i].id == req.body.id){
                        HODfound[0].maternityLeave.splice(i,1);
                    }
                }
                await HODfound[0].save();
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

portal.post('/acceptreplacement',authA,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        if(verified.role=="AM"){
             
            await ReplacementRequest.updateOne({id:req.body.sender_id},{$set:{"request_status":"accepted"}});
            res.send("Request accepted")
        }
    }
    
        catch(err){
            console.log(err);
        }
})

portal.post('/AcceptSickLeaveHOD', authA,async(req,res)=>{
    try{
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        const requester = await AcademicMember.findOne({id: req.body.id});
          // find HOD
          let HODid;
        
          const faculty =await Faculties.findOne({"name": requester.faculty});
          for(let i = 0; i < faculty.departments.length;i++){
              if(faculty.departments[i].name == requester.department){
                  HODid = faculty.departments[i].HOD;
              }
          }
          const HODfound = await AcademicMember.find({id:HODid});
        if(verified.id != HODid){
            return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
        }
        else{  
            const request = await SickLeave.findOne({id: req.body.id});
           // console.log(req.body.reqID)
           // console.log(request)
            if(!request){
                return res.status(400).json({msg:"Request wasn't found in the database"});
            }
            else{
                await SickLeave.updateOne({id: req.body.id}, {status: 1});
                //remove from HOD's list
               // console.log(HODfound[0])
                for(let i = 0; i < HODfound[0].sickleaverequests.length; i++){
                  
                    if(HODfound[0].sickleaverequests[i].id == req.body.id){
                        HODfound[0].sickleaverequests.splice(i,1);
                    }
                }
                await HODfound[0].save();
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

portal.post('/acceptslotlinking',authA,async(req,res)=>{
    try{
        const slotlinkingrequest= await SlotLinkingRequest.findOne({"id":req.body.requesterid});
        const day=slotlinkingrequest.requestedDay;
        const slot=slotlinkingrequest.slotNumber;
       console.log(slot);
       console.log(day);
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        if(verified.role=="AM"){  // academic member
            console.log("Academic member");
            const coursecoordinator= await AcademicMember.findOne({"id":verified.id}); 
            //await AcademicMember.updateOne({"id":req.body.AMid},{$push:{"courses":req.body.courseid}});
            const am= await AcademicMember.findOne({"id":req.body.requesterid});
            //console.log(am);
            console.log(verified.id);
            console.log(coursecoordinator.coursecoordindator);
            if(coursecoordinator.coursecoordindator==1){    //course coordinator
                console.log("I am coordinator");
                //console.log(am.faculty)
            const fac= await Faculties.findOne({"name":req.body.facultyname});
            let i=0;
            let j=0;
            let k;
            let l ;
            for(i=0;i<fac.departments.length;i++){
                console.log("department not empty");
                if (fac.departments[i].id==req.body.departmentid){
                    console.log("we have equal departments names!!");
                 for (j=0;j<fac.departments[i].courses.length;j++){
                    console.log("courses not empty thankfully");
                    // if(fac.departments[i].courses[j].coordinator==verified.id){  //got course
                        console.log("I am this course's coordinator!!");
                                          //made sure he is a coordinator of this course
                                          if(day=="Saturday"){
                                            k=0;
                                }
                                if(day=="Sunday"){
                                    k=1;
                                        }
                                if(day=="Monday"){
                                    k=2;
                                       }
                             if(day=="Tuesday"){
                                     k=3;
                                      }                           
                             if(day=="Wednesday"){
                                      k=4;
                                    }
                            if(day=="Thursday"){
                                        k=5;
                                        console.log("thursday")
                            }
                            if(slot=="first"){
                                for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].first.length;l++) {
                                    console.log(fac.departments[i].courses[j].courseSchedule[k].first.length);
                                //    if(fac.departments[i].courses[j].courseSchedule[k].first[l][0].location==req.body.location){
                                       // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                                  fac.departments[i].courses[j].courseSchedule[k].first[l][0].AM=req.body.AMid;
                                  am.Schedule[k].first.push(fac.departments[i].courses[j].courseSchedule[k].first[l][0]);
                                //    }
                                  console.log("TA added successfully");
                      } 
                       }   //if location
                     
        
                      
                     
                     if(slot=="second"){
                        for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].second.length;l++) {
                            //if(fac.departments[i].courses[j].courseSchedule[k].second[l][0].location==req.body.location){
                                // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                           fac.departments[i].courses[j].courseSchedule[k].second[l][0].AM=req.body.AMid;
                           am.Schedule[k].second.push(fac.departments[i].courses[j].courseSchedule[k].second[l][0]);
                           //  }
                            console.log("TA added successfully");
                } 
                 }  
                    if(slot=="third"){
                        console.log("here at third")
                        console.log(fac.departments[i].courses[j].courseSchedule[k].third);
                        for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].third.length;l++) {
                          //  if(fac.departments[i].courses[j].courseSchedule[k].third[l][0].location==req.body.location){
                                // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                           fac.departments[i].courses[j].courseSchedule[k].third[l][0].AM=req.body.AMid;
                           am.Schedule[k].third.push(fac.departments[i].courses[j].courseSchedule[k].third[l][0]);
                          //   }
                            console.log("TA added successfully");
                } 
                 } 
                     
                     if(slot=="fourth"){
                        for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].fourth.length;l++) {
                          //  if(fac.departments[i].courses[j].courseSchedule[k].fourth[l][0].location==req.body.location){
                                // console.log(fac.departments[i].courses[j].courseSchedule[k].first[l].location);
                           fac.departments[i].courses[j].courseSchedule[k].fourth[l][0].AM=req.body.AMid;
                           am.Schedule[k].fourth.push(fac.departments[i].courses[j].courseSchedule[k].fourth[l][0]);
                          //   }
                            console.log("TA added successfully");
                } 
                 } 
                    if(slot=="fifth"){
                        for(l=0;l<fac.departments[i].courses[j].courseSchedule[k].fifth.length;l++) {
                          //  console.log(fac.departments[i].courses[j].courseSchedule[k].fifth[l][0].location);
                          //  if(fac.departments[i].courses[j].courseSchedule[k].fifth[l][0].location==req.body.location){
                             //  console.log(fac.departments[i].courses[j].TAs[10]);
                           fac.departments[i].courses[j].courseSchedule[k].fifth[l][0].AM=req.body.AMid;
                           am.Schedule[k].fifth.push(fac.departments[i].courses[j].courseSchedule[k].fifth[l][0]);
                           console.log("TA added successfully");
                             
                            
                           
                } 
                 } 
                     
                             
    
                    
     //if coordinator id
    } //if courseid
     } //for course
    
    } //if departments
    console.log("asf")
    const saved=  await  fac.save();   
    await am.save();
    await SlotLinkingRequest.updateOne({"id":req.body.requesterid},{"acceptanceStatus":1})
    } //for departments
    
    // console.log(saved);
    console.log("and saved");           
    } //coordinator if
    res.send("successful")
    } // AM if
     //try bracket
    
    
    
        
    
    catch(err){
        console.log(err);
    }
    
    
    })



    portal.post('/assigncourseinstructor',authA,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            if(verified.role=="AM"){
                const HOD= await AcademicMember.findOne({"id":verified.id});
                const fac=await Faculties.findOne({"name":req.body.facultyname});
                if(HOD.HOD==1){
                    let i=0;
                   for(i=0;i<fac.departments.length;i++){
                       if(fac.departments[i].HOD==verified.id){  //mskt l department l howa feeeha mn his id 
                        let j=0;
                        for (j=0;j<fac.departments[i].courses.length;j++){
                            if(fac.departments[i].courses[j].id==req.body.courseid){
                                fac.departments[i].courses[j].instructor.push(req.body.instructorid);
                                fac.save();
                    await AcademicMember.updateOne({"id":req.body.instructorid},{"courseinstructor":1});
                }
            }
            }
            }
            }
            }
    
        }
        catch(err){
            console.log(err);
        }
    
    })

    portal.post('/deletecourseinstructor',authA,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            if(verified.role=="AM"){
                const HOD= await AcademicMember.findOne({"id":verified.id});
                const fac=await Faculties.findOne({"name":req.body.facultyname});
                if(HOD.HOD==1){
                    let i=0;
                   for(i=0;i<fac.departments.length;i++){
                       if(fac.departments[i].HOD==verified.id){  //mskt l department l howa feeeha mn his id 
                        let j=0;
                        for (j=0;j<fac.departments[i].courses.length;j++){
                            if(fac.departments[i].courses[j].id==req.body.courseid){
                                await AcademicMember.updateOne({"id":fac.departments[i].courses[j].instructor},{"courseinstructor":0});
                                fac.departments[i].courses[j].instructor="No assigned Instructor";
                                fac.save();
                    
                }
            }
            }
            }
            }
            }
    
        res.send("deleted successfully")}
        catch(err){
            console.log(err);
        }
    
    })

    portal.post('/RejectAccidentalLeaveHOD', authA,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            const requester = await AcademicMember.findOne({id: req.body.id});
              // find HOD
              let HODid;
              const faculty = await Faculties.findOne({"name": requester.faculty});
              for(let i = 0; i < faculty.departments.length;i++){
                  if(faculty.departments[i].name == requester.department){
                      HODid = faculty.departments[i].HOD;
                  }
              }
            const HODfound = await AcademicMember.find({id:HODid});
            if(verified.id != HODid){
                return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
            }
            else{
                const request = await AccidentalLeaves.findOne({req_id: req.body.reqID});
                if(!request){
                    return res.status(400).json({msg:"Request wasn't found in the database"});
                }
                else{
                    await AccidentalLeaves.updateOne({req_id: req.body.reqID}, {status: 2});
                    //remove from HOD's list
                    for(let i = 0; i < HODfound[0].accidentalLeaverequests.length; i++){
                        if(HODfound[0].accidentalLeaverequests[i].id == req.body.id){
                            HODfound[0].accidentalLeaverequests.splice(i,1);
                        }
                    }
                    await HODfound[0].save();
                }
            }
        }
        catch(err){
            console.log(err);
        }
    });

    portal.post('/RejectAnnualLeaveHOD', authA,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            const requester = await AcademicMember.findOne({id: req.body.id});
            // find HOD
            let HODid;
            console.log("asd")
            const faculty = await Faculties.findOne({"name": requester.faculty});
            for(let i = 0; i < faculty.departments.length;i++){
                if(faculty.departments[i].name == requester.department){
                    HODid = faculty.departments[i].HOD;
                }
            }
            const HODfound = await AcademicMember.find({id:HODid});
            if(verified.id != HODid){
                return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
            }
            else{
                const request = await AnnualLeave.findOne({req_id: req.body.reqID});
                if(!request){
                    return res.status(400).json({msg:"Request wasn't found in the database"});
                }
                else{
                    await AnnualLeave.updateOne({req_id: req.body.reqID}, {status: 2});
                     //remove from HOD's list
                     for(let i = 0; i < HODfound[0].annualLeaverequests.length; i++){
                        if(HODfound[0].annualLeaverequests[i].id == req.body.id){
                            HODfound[0].annualLeaverequests.splice(i,1);
                        }
                    }
                    await HODfound[0].save();
                }
            }
        }
        catch(err){
            console.log(err);
        }
    });

    portal.post('/RejectCompensationLeaveHOD', authA,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            const requester = await AcademicMember.findOne({id: req.body.id});
            // find HOD
            let HODid;
            const faculty = await Faculties.findOne({"name": requester.faculty});
            for(let i = 0; i < faculty.departments.length;i++){
                if(faculty.departments[i].name == requester.department){
                    HODid = faculty.departments[i].HOD;
                }
            }
            const HODfound = await AcademicMember.find({id:HODid});
            
            if(verified.id != HODid){
                return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
            }
            else{
                const request = await CompensationRequest.findOne({req_id: req.body.reqID});
                if(!request){
                    return res.status(400).json({msg:"Request wasn't found in the database"});
                }
                else{
                    await CompensationRequest.updateOne({req_id: req.body.reqID}, {status: 2});
                     //remove from HOD's list
                     for(let i = 0; i < HODfound[0].compensationrequests.length; i++){
                        if(HODfound[0].compensationrequests[i].id == req.body.id){
                            HODfound[0].compensationrequests.splice(i,1);
                            console.log("srf")
                        }
                    }
                    await HODfound[0].save();
                }
            }
        }
        catch(err){
            console.log(err);
        }
    });


    portal.post('/rejectdayoff',authA,async(req,res)=>{
        const listOfTas=[];
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password); 
        if(verified.role=="AM"){
            const am= await AcademicMember.findOne({"id":verified.id,"HOD":1});
            if(!am){
                console.log("you are not a head of department")
            }
            else{
                let request="";
                for(i=0;i<am.dayoffrequests.length;i++){
                    if(am.dayoffrequests[i].id==req.body.AMid)
                    {
                         //acceptance status=2 means rejected
                          //  await AcademicMember.updateOne({id:req.body.AMid},{"dayoff":am.dayoffrequests[i].requestedDayoff})
                            await DayOffRequest.updateOne({id:req.body.AMid},{"acceptanceStatus":2})
                           // const request=await DayOffRequest.findOne({id:req.body.AMid});
                           // await AcademicMember.updateOne({id:verified.id},{$pull:{"dayoffrequests":request}})
                            am.dayoffrequests[i].acceptanceStatus=2;
                          await  am.save();
                    }
                }
            }
        }
        res.send("dayoff request rejected")
    })
    portal.post('/RejectAccidentalLeaveHR', authA,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            const firstHr = await HrMembers.find({id:"hr-1"});
            if(verified.id != firstHr.id){
                return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
            }
            else{
                const request = await AccidentalLeaves.findOne({req_id: req.body.reqID});
                if(!request){
                    return res.status(400).json({msg:"Request wasn't found in the database"});
                }
                else{
                    await AccidentalLeaves.updateOne({req_id: req.body.reqID}, {status: 1});
                    //remove from HOD's list
                    for(let i = 0; i < firstHr.accidentalLeaverequests.length; i++){
                        if(firstHr.accidentalLeaverequests[i].req_id == req.body.reqID){
                            firstHr.accidentalLeaverequests.splice(i,1);
                        }
                    }
                    await firstHr.save();
                }
            }
        }
        catch(err){
            console.log(err);
        }
    });

    portal.post('/RejectMaternityLeaveHOD', authA,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            const requester = await AcademicMember.findOne({id: req.body.id});
              // find HOD
             // console.log("daa")
              let HODid;
              const faculty =await Faculties.findOne({"name": requester.faculty});
              for(let i = 0; i < faculty.departments.length;i++){
                  if(faculty.departments[i].name == requester.department){
                      HODid = faculty.departments[i].HOD;
                  }
              }
              const HODfound = await AcademicMember.find({id:HODid});
            if(verified.id != HODid){
                return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
            }
            else{
                const request = await MaternityRequest.findOne({req_id: req.body.reqID});
                if(!request){
                    return res.status(400).json({msg:"Request wasn't found in the database"});
                }
                else{
                    await MaternityRequest.updateOne({req_id: req.body.reqID}, {status: 2});
                    //remove from HOD's list
                    
                    for(let i = 0; i < HODfound[0].maternityLeave.length; i++){
                        if(HODfound[0].maternityLeave[i].id == req.body.id){
                            HODfound[0].maternityLeave.splice(i,1);
                        }
                    }
                    await HODfound[0].save();
                }
            }
        }
        catch(err){
            console.log(err);
        }
    });

    portal.post('/rejectreplacement',authA,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            if(verified.role=="AM"){
                 
                await ReplacementRequest.updateOne({id:req.body.sender_id},{$set:{"request_status":"rejected"}});
                res.send("Request rejected")
            }
        }
        
            catch(err){
                console.log(err);
            }
    })

    portal.post('/RejectSickLeaveHOD', authA,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            const requester = await AcademicMember.findOne({id: req.body.id});
              // find HOD
             console.log("daa")
              let HODid;
              const faculty =await Faculties.findOne({"name": requester.faculty});
              for(let i = 0; i < faculty.departments.length;i++){
                  if(faculty.departments[i].name == requester.department){
                      HODid = faculty.departments[i].HOD;
                  }
              }
              const HODfound = await AcademicMember.find({id:HODid});
            if(verified.id != HODid){
                return res.status(400).json({msg:"You are not allowed to accept or reject requests"});
            }
            else{
                const request = await SickLeave.findOne({id: req.body.id});
                if(!request){console.log("asd")
                    return res.status(400).json({msg:"Request wasn't found in the database"});
                }
                else{
                    await SickLeave.updateOne({id: req.body.id}, {status: 2});
                    //remove from HOD's list
                    
                    for(let i = 0; i < HODfound[0].sickleaverequests.length; i++){
                        if(HODfound[0].sickleaverequests[i].id == req.body.id){
                            HODfound[0].sickleaverequests.splice(i,1);
                        }
                    }
                    await HODfound[0].save();
                }
            }
        }
        catch(err){
            console.log(err);
        }
    });

    portal.post('/rejectslotlinking',authA,async(req,res)=>{
        try{
        
        
            await SlotLinkingRequest.updateOne({"id":req.body.requesterid},{"acceptanceStatus":2})
            res.send("successful")}
        catch(err){
            console.log(err);
        }
        
        
        })

        portal.post('/updatecourseinstructor',authA,async(req,res)=>{
            try{
                const JWT_Password="RandomString";
                const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
                if(verified.role=="AM"){
                    const HOD= await AcademicMember.findOne({"id":verified.id});
                    const fac=await Faculties.findOne({"name":req.body.facultyname});
                    const newinstructor= await AcademicMember.findOne({"id":req.body.instructorid});
                    if(HOD.HOD==1){
                        let i=0;
                       for(i=0;i<fac.departments.length;i++){
                           if(fac.departments[i].HOD==verified.id){  //mskt l department l howa feeeha mn his id 
                            let j=0;
                            for (j=0;j<fac.departments[i].courses.length;j++){
                                if(fac.departments[i].courses[j].id==req.body.courseid){
                                    await AcademicMember.updateOne({"id":fac.departments[i].courses[j].instructor},{"courseinstructor":0});
                                    await AcademicMember.updateOne({"id":req.body.instructorid},{$set:{"courseinstructor":1}});
                                    fac.departments[i].courses[j].instructor=req.body.instructorid;
        
                                    fac.save();
                        
                    }
                }
                }
                }
                }
                }
        
            }
            catch(err){
                console.log(err);
            }
        
        })

        portal.get('/viewaccidentalleaverequests',authA,async(req,res)=>{
            const listOfTas=[];
            const JWT_Password="RandomString";
            let leave=[];
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            console.log(verified.id)
            if(verified.role=="AM"){
    
                const am= await AcademicMember.findOne({"id":verified.id});
                console.log(am.HOD)
                if(!am){
                    console.log("you are not a head of department")
                }
                else{
                   
               //   console.log(am)
                    if(!am.accidentalLeaverequests){
    
                    }
                    else{
                     //   console.log("wd")
                   res.send(am.accidentalLeaverequests);}
                   
                     
                }
            }
        })


        portal.get('/viewannualleaverequests',authA,async(req,res)=>{
            const listOfTas=[];
            const JWT_Password="RandomString";
            let leave=[];
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            console.log(verified.id)
            if(verified.role=="AM"){
    
                const am= await AcademicMember.findOne({"id":verified.id});
                console.log(am.HOD)
                if(!am){
                    console.log("you are not a head of department")
                }
                else{
                    
                    if(!am.annualLeaverequests){}
                    else{
                  res.send(am.annualLeaverequests);}
                   
                }
            }
        })


         portal.get('/viewcompensationleaverequests',authA,async(req,res)=>{
        const listOfTas=[];
        const JWT_Password="RandomString";
        let leave=[];
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        console.log(verified.id)
        if(verified.role=="AM"){

            const am= await AcademicMember.findOne({"id":verified.id});
            console.log(am.HOD)
            if(!am){
                console.log("you are not a head of department")
            }
            else{
                
                if(!am.compensationrequests){

                }
                else{
                res.send(am.compensationrequests);}
               
               
            }
        }
    })





    portal.get('/viewcompensationleaverequests',authA,async(req,res)=>{
        const listOfTas=[];
        const JWT_Password="RandomString";
        let leave=[];
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        console.log(verified.id)
        if(verified.role=="AM"){

            const am= await AcademicMember.findOne({"id":verified.id});
            console.log(am.HOD)
            if(!am){
                console.log("you are not a head of department")
            }
            else{
                
                if(!am.compensationrequests){

                }
                else{
                res.send(am.compensationrequests);}
               
               
            }
        }
    })











    portal.post('/viewteachingassignment',authA,async(req,res)=>{
        try{
            const listOfTas=[];
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password); 
            if(verified.role=="AM"){
            let assignmentslist=[];
            const fac= await Faculties.findOne({"name":req.body.facultyname});
            const HOD= await AcademicMember.findOne({"id":verified.id}); 
            if(HOD.HOD==1){    //head of department
                console.log("I am HOD");
         
            let i=0;
            let j=0;
            let x=0;
            for(i=0;i<fac.departments.length;i++){
                console.log("department not empty");
                if (fac.departments[i].id==req.body.departmentid){
                    console.log("we have equal departments ids!!");
                 for (j=0;j<fac.departments[i].courses.length;j++){
                    console.log("courses not empty thankfully");
                     // searching for instructor of course 
                    
                        for(x=0;x<fac.departments[i].courses[j].instructor.length;x++){ 
                     
                           let y;
                           let z;
                           let h;
                       
                        //    for(y=0;y<fac.departments[i].courses[j].courseSchedule.length;i++){
                               // for(z=0;z<fac.departments[i].courses[j].courseSchedule[y].length;z++){
                                if(fac.departments[i].courses[j].courseSchedule[0].first[0]){   // saturday slots
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[0].first[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[0].first[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[0].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[0].first[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[0].second[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[0].second[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[0].second[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[0].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[0].second[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[0].third[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[0].third[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[0].third[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[0].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[0].third[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[0].fourth[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[0].fourth[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[0].fourth[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[0].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[0].fourth[0][b]);
                                        }
                                    } 
                                  }
                                  
                                  if(fac.departments[i].courses[j].courseSchedule[0].fifth[0]){
                                      let b;
                                      for(b=0;b<fac.departments[i].courses[j].courseSchedule[0].fifth[0].length;b++){
                                          if(fac.departments[i].courses[j].courseSchedule[0].fifth[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[0].day);
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[0].fifth[0][b]);
                                          }
                                      }
                                  }
    
                                  if(fac.departments[i].courses[j].courseSchedule[1].first[0]){   // sunday slots
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[1].first[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[1].first[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[1].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[1].first[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[1].second[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[1].second[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[1].second[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[1].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[1].second[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[1].third[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[1].third[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[1].third[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[1].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[1].third[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[1].fourth[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[1].fourth[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[1].fourth[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[1].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[1].fourth[0][b]);
                                        }
                                    } 
                                  }
                                  
                                  if(fac.departments[i].courses[j].courseSchedule[1].fifth[0]){
                                      let b;
                                      for(b=0;b<fac.departments[i].courses[j].courseSchedule[1].fifth[0].length;b++){
                                          if(fac.departments[i].courses[j].courseSchedule[1].fifth[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[1].day);
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[1].fifth[0][b]);
                                          }
                                      }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[2].first[0]){   // monday slots
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[2].first[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[2].first[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[2].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[2].first[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[2].second[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[2].second[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[2].second[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[2].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[2].second[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[2].third[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[2].third[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[2].third[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[2].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[2].third[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[2].fourth[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[2].fourth[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[2].fourth[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[2].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[2].fourth[0][b]);
                                        }
                                    } 
                                  }
                                  
                                  if(fac.departments[i].courses[j].courseSchedule[2].fifth[0]){
                                      let b;
                                      for(b=0;b<fac.departments[i].courses[j].courseSchedule[2].fifth[0].length;b++){
                                          if(fac.departments[i].courses[j].courseSchedule[2].fifth[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[2].day);
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[2].fifth[0][b]);
                                          }
                                      }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[3].first[0]){   // tuesday slots
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[3].first[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[3].first[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[3].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[3].first[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[3].second[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[3].second[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[3].second[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[3].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[3].second[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[3].third[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[3].third[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[3].third[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[3].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[3].third[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[3].fourth[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[3].fourth[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[3].fourth[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[3].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[3].fourth[0][b]);
                                        }
                                    } 
                                  }
                                  
                                  if(fac.departments[i].courses[j].courseSchedule[3].fifth[0]){
                                      let b;
                                      for(b=0;b<fac.departments[i].courses[j].courseSchedule[3].fifth[0].length;b++){
                                          if(fac.departments[i].courses[j].courseSchedule[3].fifth[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[3].day);
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[3].fifth[0][b]);
                                          }
                                      }
                                  }
    
                                  if(fac.departments[i].courses[j].courseSchedule[4].first[0]){   // wednesday slots
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[4].first[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[4].first[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[4].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[4].first[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[4].second[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[4].second[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[4].second[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[4].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[4].second[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[4].third[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[4].third[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[4].third[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[4].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[4].third[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[4].fourth[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[4].fourth[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[4].fourth[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[4].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[4].fourth[0][b]);
                                        }
                                    } 
                                  }
                                  
                                  if(fac.departments[i].courses[j].courseSchedule[4].fifth[0]){
                                      let b;
                                      for(b=0;b<fac.departments[i].courses[j].courseSchedule[4].fifth[0].length;b++){
                                          if(fac.departments[i].courses[j].courseSchedule[4].fifth[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[4].day);
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[4].fifth[0][b]);
                                          }
                                      }
                                  }
    
                                  if(fac.departments[i].courses[j].courseSchedule[5].first[0]){   // thursday slots
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[5].first[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[5].first[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[5].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[5].first[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[5].second[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[5].second[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[5].second[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[5].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[5].second[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[5].third[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[5].third[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[5].third[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[5].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[5].third[0][b]);
                                        }
                                    }
                                  }
                                  if(fac.departments[i].courses[j].courseSchedule[5].fourth[0]){
                                    let b;
                                    for(b=0;b<fac.departments[i].courses[j].courseSchedule[5].fourth[0].length;b++){
                                        if(fac.departments[i].courses[j].courseSchedule[5].fourth[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[5].day);
                                          assignmentslist.push(fac.departments[i].courses[j].courseSchedule[5].fourth[0][b]);
                                        }
                                    } 
                                  }
                                  
                                  if(fac.departments[i].courses[j].courseSchedule[5].fifth[0]){
                                      let b;
                                      for(b=0;b<fac.departments[i].courses[j].courseSchedule[5].fifth[0].length;b++){
                                          if(fac.departments[i].courses[j].courseSchedule[5].fifth[0][b]){
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[5].day);
                                            assignmentslist.push(fac.departments[i].courses[j].courseSchedule[5].fifth[0][b]);
                                          }
                                      }
                                  }
    
                                
                            }
    
                
                         
        }
    }
                
    }
    res.send(assignmentslist);
            }
        }
       
    }
    
        catch(err){
            console.log(err);
        }
    })




    portal.post('/viewcoursecoverageHOD',authA,async(req,res)=>{
        try{
            const listOfcoverage=[];
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password); 
            if(verified.role=="AM"){
                const am= AcademicMember.findOne({"id":verified.id,"HOD":1});
                if(!am){
                    console.log("you are not a head of department")
                }
                else{
                    const fac=await Faculties.findOne({"name":req.body.facultyname});
                    for(i=0;i<fac.departments.length;i++){//maskeen el department el fiha el hod
                        if(fac.departments[i].HOD==verified.id){
                            let j=0;
                            for (j=0;j<fac.departments[i].courses.length;j++){//maskeen el courses le kol department
                               let slots=fac.departments[i].courses[j].NoOfSlots
                               let ass=fac.departments[i].courses[j].NoOfAssignedSlots
                               let coverage=(ass/slots)*100
                               fac.departments[i].courses[j].coverage=coverage
                                        listOfcoverage.push(fac.departments[i].courses[j].name+": coverage: "+fac.departments[i].courses[j].coverage+"%")
                                       
                        }
                   // const department=faculty.findOne({"departments.HOD":verified.id})
                  
                   
                    res.send(listOfcoverage);
                    
                }
    
    
            }
        }
    }
        }
        catch(err){
            console.log(err)
        }
    })



    portal.get('/viewdayoffrequests',authA,async(req,res)=>{
        const listOfTas=[];
        const JWT_Password="RandomString";
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password); 
        if(verified.role=="AM"){
            const am= await AcademicMember.findOne({"id":verified.id,"HOD":1});
            if(!am){
                console.log("you are not a head of department")
            }
            else{
                console.log(am.dayoffrequests)
                res.send(am.dayoffrequests)
            }
        }
    })



    portal.get('/viewmaternityleaverequests',authA,async(req,res)=>{
        const listOfTas=[];
        const JWT_Password="RandomString";
        let leave=[];
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        console.log(verified.id)
        if(verified.role=="AM"){

            const am= await AcademicMember.findOne({"id":verified.id});
            console.log(am.HOD)
            if(!am){
                console.log("you are not a head of department")
            }
            else{
                
                if(!am.maternityLeaverequests){}
                else{
                    console.log(am.maternityLeaverequests)
               res.send(am.maternityLeaverequests);}
              
            }
        }
    })
    


    portal.get('/viewreplacement',authA,async(req,res)=>{
        try{
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
            if(verified.role=="AM"){
                 const am= await AcademicMember.findOne({id:verified.id});
                console.log(am.id);
            
    
             res.send(am.replacementrequest);
    
            }
        }
        
            catch(err){
                console.log(err);
            }
    })



    portal.get('/viewsickleaverequests',authA,async(req,res)=>{
        const listOfTas=[];
        const JWT_Password="RandomString";
        let leave=[];
        const verified = jwt.verify(req.header('x-auth-token'),JWT_Password);
        console.log(verified.id)
        if(verified.role=="AM"){

            const am= await AcademicMember.findOne({"id":verified.id});
            console.log(am.HOD)
            if(!am){
                console.log("you are not a head of department")
            }
            else{
                console.log(am.sickleaverequests)
                if(!am.sickleaverequests)
                    {
console.log("dsf");
                }
                else{
                res.send(am.sickleaverequests);}
                
               
            }
        }
    })



    portal.post('/viewsinglestaffdayoff',authA,async(req,res)=>{
        try{
            const listOfTas=[];
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password); 
            if(verified.role=="AM"){
                const am= AcademicMember.findOne({"id":verified.id,"HOD":1});
                if(!am){
                    console.log("you are not a head of department")
                }
                else{
                    const fac=await Faculties.findOne({"name":req.body.facultyname});
                    for(i=0;i<fac.departments.length;i++){//maskeen el department el fiha el hod
                        if(fac.departments[i].HOD==verified.id){
                            let j=0;
    
                            for (j=0;j<fac.departments[i].courses.length;j++){//maskeen el courses le kol department
                                let k=0
                                for(k=0;k<fac.departments[i].courses[j].TAs.length;k++){//maskeen el tas le kol course
                                   if(fac.departments[i].courses[j].TAs[k]==req.body.id){
                                    let mem=await AcademicMember.findOne({"id":req.body.id})
                                        listOfTas.push("name: "+mem.name+" dayoff: "+mem.dayoff)
                                   }
                                }
                        }
                   // const department=faculty.findOne({"departments.HOD":verified.id})
                   
                   
                    res.send(listOfTas);
                    
                }
    
    
            }
        }
    }
        }
        catch(err){
            console.log(err)
        }
    })



    portal.get('/viewslotlinkingrequests',authA,async(req,res)=>{
        try{
          const listOfTas=[];
          const JWT_Password="RandomString";
          const verified = jwt.verify(req.header('x-auth-token'),JWT_Password); 
          if(verified.role=="AM"){
              const am= await AcademicMember.findOne({"id":verified.id,"HOD":1});
              if(!am){
                  console.log("you are not a head of department")
              }
              else{
                  console.log(am.slotlinkingrequests)
                  res.send(am.slotlinkingrequests)
              }
          }
      }
      catch(err){
          console.log(err);
      }
      })



      portal.post('/viewstaff',authA,async(req,res)=>{
        try{
            
            const listOfTas=[];
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password); 
            if(verified.role=="AM"){
                const am= await AcademicMember.findOne({"id":verified.id,"HOD":1});
                if(!am){
                    console.log("you are not a head of department")
                }
                else{
                   // console.log(req.body.facultyname)
                    const faculty=await Faculties.findOne({"name":req.body.facultyname});
                    console.log(faculty.name)
                    for(i=0;i<faculty.departments.length;i++){//maskeen el department el fiha el hod
                        if(faculty.departments[i].HOD==verified.id){
                            
                            let j=0;
                            for (j=0;j<faculty.departments[i].courses.length;j++){//maskeen el courses le kol department
                                
                                let k=0
                                for(k=0;k<faculty.departments[i].courses[j].TAs.length;k++){//maskeen el tas le kol course
                                    console.log(faculty.departments[i].courses[j].TAs[k])
                                    let mid=faculty.departments[i].courses[j].TAs[k]
                                    let mem=await AcademicMember.findOne({"id":mid})
                                      // listOfTas.push(faculty.departments[i].courses[j].TAs[k])
                                      listOfTas.push("name: "+mem.name+", office: "+mem.office+ ", dayoff: "+mem.dayoff+", email: "+mem.email)
                                }
                        }
                   // const department=faculty.findOne({"departments.HOD":verified.id})
                   
                   console.log(listOfTas);
                   res.send(listOfTas);
                    //view their profiles
                }
    
    
            }
        }
    }
        }
        catch(err){
            console.log(err)
        }
    })


    portal.post('/viewstaffbycourse',authA,async(req,res)=>{
        try{
            
            const listOfTas=[];
            const JWT_Password="RandomString";
            const verified = jwt.verify(req.header('x-auth-token'),JWT_Password); 
            if(verified.role=="AM"){
                const am= await AcademicMember.findOne({"id":verified.id,"HOD":1});
                if(!am){
                    console.log("you are not a head of department")
                }
                else{
                   // console.log(req.body.facultyname)
                    const faculty=await Faculties.findOne({"name":req.body.facultyname});
                   // console.log(faculty.name)
                    for(i=0;i<faculty.departments.length;i++){//maskeen el department el fiha el hod
                        if(faculty.departments[i].HOD==verified.id){
                            
                           
                            for (j=0;j<faculty.departments[i].courses.length;j++){//maskeen el courses le kol department
                                if(faculty.departments[i].courses[j].name==req.body.coursename)
                                
                                for(k=0;k<faculty.departments[i].courses[j].TAs.length;k++){//maskeen el tas le kol course
                                   // console.log(faculty.departments[i].courses[j].TAs[k])
                                    let mid=faculty.departments[i].courses[j].TAs[k]
                                    let mem=await AcademicMember.findOne({"id":mid})
                                      // listOfTas.push(faculty.departments[i].courses[j].TAs[k])
                                      listOfTas.push("name: "+mem.name+", office: "+mem.office+ ", dayoff: "+mem.dayoff+", email: "+mem.email)
                                }
                        }
                   // const department=faculty.findOne({"departments.HOD":verified.id})
                   
                   console.log(listOfTas);
                    res.send(listOfTas);
                    //view their profiles
                }
            }
        }
    }
        }
                catch(err){
                    console.log(err);
                }
            })


            portal.post('/viewstaffdayoff',authA,async(req,res)=>{
                try{
                    const listOfTas=[];
                    const JWT_Password="RandomString";
                    const verified = jwt.verify(req.header('x-auth-token'),JWT_Password); 
                    if(verified.role=="AM"){
                        const am= AcademicMember.findOne({"id":verified.id,"HOD":1});
                        if(!am){
                            console.log("you are not a head of department")
                        }
                        else{
                            const fac=await Faculties.findOne({"name":req.body.facultyname});
                            for(i=0;i<fac.departments.length;i++){//maskeen el department el fiha el hod
                                if(fac.departments[i].HOD==verified.id){
                                    let j=0;
            
                                    for (j=0;j<fac.departments[i].courses.length;j++){//maskeen el courses le kol department
                                        let k=0
                                        for(k=0;k<fac.departments[i].courses[j].TAs.length;k++){//maskeen el tas le kol course
                                            let mid=fac.departments[i].courses[j].TAs[k]
                                            let mem=await AcademicMember.findOne({"id":mid})
                                                listOfTas.push("name: "+mem.name+" dayoff: "+mem.dayoff)
                                        }
                                }
                           // const department=faculty.findOne({"departments.HOD":verified.id})
                           
                           
                            res.send(listOfTas);
                            
                        }
            
            
                    }
                }
            }
                }
                catch(err){
                    console.log(err)
                }
            })