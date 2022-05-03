import React, { Fragment, useState,useEffect } from 'react';
import { default as ReactSelect } from "react-select";
import axios from 'axios';
import { Dialog, DialogActions, Form,Button,FormGroup,FormLabel, FormControl} from '@material-ui/core'
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Backend from '../../../axios';
import style from './ia.module.css';
function IaMarksMain({handleToggleSidebar}){
  const [loading, setLoading] = useState(true);
  const [subject,setSubject]=useState([]);
  const [subjectCode, setSubjectCode]=useState([]);
  const [subjectlist, setSubjectList]=useState([]);  
  const [studentlist, setStudentList]=useState([]);  
  const [questionlist,setQuestionList] = useState([{value:"1",label:"1"},{value:"2",label:"2"},{value:"3",label:"3"},{value:"4",label:"4"},{value:"5",label:"5"},{value:"6",label:"6"},{value:"7",label:"7"},{value:"8",label:"8"},{value:"9",label:"9"},{value:"10",label:"10"}]);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]); 
  const [examList,setExamList] = useState([{value:"IA 1",label:"IA 1"},{value:"IA 2",label:"IA 2"},{value:"IA 3",label:"IA 3"},{value:"other",label:"Other"}]);
  const [optionSelected , selectOptionSelected]= useState(false);
  const [questionAttend, setQuestionAttend]=useState(0);
  const handleClickToOpen = () => {setOpen(true);};
  
  const handleToClose = () => {setOpen(false);};
  const onSubmit=event=>{  
    event.preventDefault();
    // console.log(subject,subjectCode,subjectShort);
    const subjectJson = {
      name: subject,
      // shortName:subjectShort,
      code:subjectCode
    };
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "localhost:3000",
      }
    };
  axios.post('http://localhost:3000/addSubject',  subjectJson , axiosConfig)
    .then(res => {
      if(res.data.data.length===0){
        handleClickToOpen();
      }else{
       handleToClose();
       getData();
      }
    
      
    }).catch(e=>console.log(e))
  }

  useEffect(() => {
    getSubjectList();
    getStudentList();
    getQuestionList();
    },[]);

    const getQuestionList =()=>{
      for(var i=1;i<5;i++){
        examList.push({value:i,label:i})
      }
      console.log(questionlist);
    }
    const getStudentList = () =>{
      
    Backend.get('/getStudentList', {})
    .then(res => {
      res.data.map(v=>{
        console.log("*");
        return studentlist.push({value:v._id,label:v.name})
      },);
    });
    setLoading(false);
  }

    const getSubjectList = () =>{
    setLoading(true);
      Backend.get('/getSubject', {})
      .then(res => {
        res.data.map(v=>{
          console.log("*");
          return subjectlist.push({value:v._id,label:v.name})
        },);
      });
      setLoading(false);
    }
    
  return (
    
  loading?<></>:  <main className={style.main}>
  <Dialog open={open} onClose={handleToClose}>
          <DialogTitle>{"Something went wrong"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Try Later
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleToClose} 
                    color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
  <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
  
  </div>
  <div className={style.main}>
    <h1>IA MARKS</h1>
    <Button onClick={()=>setOpen(true)}>ADD IA MARKS</Button>
  </div>
    
   
{open?<Dialog open={open} onClose={ () => setOpen(false) } fullWidth maxWidth="lg"> <div>

<FormControl className="subjectForm lg-12 md-12" onSubmit={onSubmit}>
<center><h1>Add Subject</h1></center>
    <FormGroup className="mb-6" controlId="formBasicSubjectName">
        <FormLabel>Exam</FormLabel>
        <ReactSelect
        options={examList}
        value={subject}
        onChange = {e=>setSubject(e.target.value)}
       />
    </FormGroup>
    <FormGroup className="mb-6" controlId="formBasicSubjectShortName">
        <FormLabel>Subject</FormLabel>
        <ReactSelect
        options={subjectlist}
        value={optionSelected}
       />
    </FormGroup>
    <FormGroup className="mb-6" controlId="formBasicSubjectCode">
        <FormLabel>Student</FormLabel>
        <ReactSelect
        options={studentlist}
        value={optionSelected}
       />
    </FormGroup>
    <FormGroup className="mb-6" controlId="formBasicSubjectCode">
        <FormLabel>Total Question Attend</FormLabel>
        <ReactSelect
        options={questionlist}
        value={optionSelected}
        onChange={e=>setQuestionAttend(e.value)}
       />
    </FormGroup>
    <FormGroup className="mb-6" controlId="formBasicSubjectCode">
        <FormLabel>No. of questions</FormLabel>
       <div className='questionMain  lg-6 md-6'>
       <div className='question'>
         Question No.
         <ReactSelect
        options={questionlist}
        value={optionSelected}
       />
       </div>
       <div className='question'>
         Marks
        <ReactSelect
        options={questionlist}
        value={optionSelected}
       />
       </div>
       </div>
    </FormGroup>
    <Button variant="primary" type="submit">
        Submit
    </Button>
</FormControl>   
</div></Dialog>:<></> }
</main>
  );
}

export default IaMarksMain;