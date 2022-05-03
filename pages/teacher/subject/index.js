import React, { Fragment, useState,useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, TableRow, TableCell,Table,Button,FormGroup,FormLabel, TextField, Grid, FormControl, InputLabel,Select,MenuItem  } from '@material-ui/core'
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { FaTrashAlt,FaPencilAlt } from 'react-icons/fa';
import { default as ReactSelect } from "react-select";
import style from './addSubjectMain.module.css';

function AddSubjectMain({handleToggleSidebar}){
  const [loading, setLoading] = useState(true);
  const [subject,setSubject]=useState();
  const [subjectCode, setSubjectCode]=useState([]);
  const [subjectShort, setSubjectShort]=useState([]);  
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]); 
  const [teacherList, setTeacherList] = useState([]);
  const [assignTeacher, setAssignTeacher] = useState([]);
  const [optionSelected , selectOptionSelected]= useState();
  const [mod1,setMod1]=useState();
  const [mod2,setMod2]=useState();
  const [mod3,setMod3]=useState();
  const [mod4,setMod4]=useState();
  const [mod5,setMod5]=useState();
  const [showing, setShowing] = useState(false);
  const handleClickToOpen = () => {setOpen(true);};
  const handleToClose = () => {setOpen(false);   setSubject("");
  setSubjectCode("");
  setSubjectShort("");};
  
  const deleteSub =(id)=>{
    console.log(id);
    const subjectJson = {
      _id: id,
    };
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "localhost:3000",
      }
    };
    console.log(subjectJson)
  axios.post('http://localhost:3000/deleteSubject',  {"_id":id} , axiosConfig)
    .then(res => {
      if(res.data.data.length===0){
        handleClickToOpen();
      }else{
        
        getData();
      }
    }).catch(e=>console.log(e))
  }
  const onEdit=(id)=>{
    console.log(id);
    const subjectJson = {
      _id: id,
    };
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "localhost:3000",
      }
    };
    console.log(subjectJson)
  axios.post('http://localhost:3000/getSubjectById',  {"_id":id} , axiosConfig)
    .then(res => {
      console.log(res.data[0]);
      setSubject(res.data[0].name);
      setSubjectCode(res.data[0].code);
      setSubjectShort(res.data[0].shortName);
      setOpen(true);
    }).catch(e=>console.log(e))
    setLoading(false);
  }
  const onSubmit=event=>{  
    event.preventDefault();
    
    var assignTeacherId=[];
    assignTeacher.map(e=>{
      assignTeacherId.push(e.value);
    })
    const subjectJson = {
      _id:"",
      name: subject,
      shortName:subjectShort,
      code:subjectCode,
      assignTeacher:assignTeacherId
    };
    console.log(assignTeacherId);
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "localhost:3000",
      }
    };
    
    console.log("JSsssJkkkk");
  axios.post('http://localhost:3000/addSubject',  subjectJson , axiosConfig)
    .then(res => {
      console.log(res);
      console.log("JSsssJ");
      if(res.data==undefined){
        handleClickToOpen();
      }else{
       handleToClose();
       
      }
      getData();
      setSubject("");
    setSubjectCode("");
    setSubjectShort("");
     }).catch(e=>console.log(e))
  }
  const getData=()=>{
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "localhost:300",
      }
    };
  
  axios.get('http://localhost:3000/getSubject', {},axiosConfig)
    .then(res => {
      console.log(res);
      setData(res.data);
      setShowing(true);
  })};
  useEffect(() => {
    getTeacherList();
    getData();
    
    },[]);
  const getTeacherList =()=>{
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "localhost:300",
      }
    };
    console.log("Hi");
    axios.get('http://localhost:3000/teacherList', {},axiosConfig)
    .then(res => {
      res.data.map(v=>{
        console.log("*");
        return teacherList.push({value:v._id,label:v.name})
      },);
    });
  };
  if (!showing) {
    return null;
  }
      
  if(typeof window === 'undefined'){
    return <></>
  }else{
    return (
    
      <main  className={style.main}>
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
        <div>
        <div>
        <h1 className={style.marginZero}>Subject List</h1>
      
        </div>
        
          <Table>
         
        <Fragment key={0}>
            <TableRow className='firstRow'>
              <TableCell className='index' align="left"><b> Index</b></TableCell>
              <TableCell className='question' align="left"><b>Subject Name</b></TableCell>
              <TableCell className='subjectCode' align="center"><b>Subject Code</b></TableCell>
              <TableCell className='marks' align="center"><b>Subject ShortName</b></TableCell>
              <TableCell className='delete' align='center'></TableCell>
            </TableRow>
          </Fragment>
        {data.map((subject,index)=>(
        <Fragment key={subject._id}>
          <TableRow key={subject._id}  justify="space-between">
            <TableCell className='index' align="left" >{ index+1}</TableCell>
            <TableCell className='question' align="left" dangerouslySetInnerHTML={ { __html: subject.name } }></TableCell>
            <TableCell className='subjectCode' align="center" >{ subject.code }</TableCell>
            <TableCell className='marks' align="center">{ subject.shortName }</TableCell>
            <TableCell className='delete' align='center'><Button color='red' className={style.deleteBtn} onClick={()=>deleteSub(subject._id)}><FaTrashAlt className='color' /></Button><Button className='deleteBtn' onClick={()=>onEdit(subject._id)}><FaPencilAlt className='color' /></Button></TableCell>
             </TableRow>
        </Fragment>
        ))}
        </Table>
        </div>
          <Button onClick={()=>setOpen(true)}>ADD Subject</Button>
         
      {open?<Dialog open={open} onClose={ () => setOpen(false) } fullWidth maxWidth="lg"> <div class="container">
      <FormControl className="subjectForm lg-12 md-12" onSubmit={onSubmit}>
      <center><h1>Add Subject</h1></center>
          <Grid container>
                <Grid item>
                <TextField className={style.text1}  fullWidth label="Subject Name" id="subjectname"  onChange={e=>setSubject(e.target.value)}/>
                </Grid>
          </Grid>

          <br/>

          <Grid container>
                <Grid item>
                <TextField className={style.text1}  fullWidth label="Subject Short Name" id="subjectnameshort"  onChange={e=>setSubject(e.target.value)}/>
                </Grid>
          </Grid>

          <br/>

          <Grid container>
                <Grid item>
                <TextField className={style.text1}  fullWidth label="Subject Code" id="subjectcode"  onChange={e=>setSubject(e.target.value)}/>
                </Grid>
          </Grid>

          <br/>
            <Grid container>
                          <Grid item>
                              <FormControl fullWidth className={style.text1} >
                                  <InputLabel id="demo-simple-select-label">Assign Teacher</InputLabel>
                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={optionSelected}
                                      label="Assign Teacher"
                                      onChange={e=>setAssignTeacher(e.target.value)}
                                  >
                                      <MenuItem value={"teacher1"}>teacher1</MenuItem>
                                      <MenuItem value={"teacher2"}>teacher2</MenuItem>
                                      <MenuItem value={"teacher3"}>teacher3</MenuItem>
                                      <MenuItem value={"teacher4"}>teacher4</MenuItem>
                                      <MenuItem value={"teacher5"}>teacher5</MenuItem>
                                  </Select>
                              </FormControl>
                          </Grid>
                      </Grid>

          <br/>

          <Grid container>
                <Grid item>
                <TextField className={style.text1}  fullWidth label="Module 1 Topic" id="moduletopic1"  onChange={e=>setMod1(e.target.value)} value={mod1}/>
                </Grid>
          </Grid>

          <br/>

          <Grid container>
                <Grid item>
                <TextField className={style.text1}  fullWidth label="Module 2 Topic" id="moduletopic2"  onChange={e=>setMod2(e.target.value)} value={mod2}/>
                </Grid>
          </Grid>

          <br/>

          <Grid container>
                <Grid item>
                <TextField className={style.text1}  fullWidth label="Module 3 Topic" id="moduletopic3"  onChange={e=>setMod3(e.target.value)} value={mod3}/>
                </Grid>
          </Grid>

          <br/>

          <Grid container>
                <Grid item>
                <TextField className={style.text1}  fullWidth label="Module 4 Topic" id="moduletopic4"  onChange={e=>setMod4(e.target.value)} value={mod4}/>
                </Grid>
          </Grid>

          <br/>
          
          <Grid container>
                <Grid item>
                <TextField className={style.text1}  fullWidth label="Module 5 Topic" id="moduletopic5"  onChange={e=>setMod5(e.target.value)} value={mod5}/>
                </Grid>
          </Grid>

          <br/>

          <Button variant="contained" className={style.text1}>Submit</Button>
      </FormControl>  
        </div></Dialog>:<></> }
      </main>
    );
  }
}

export default AddSubjectMain;