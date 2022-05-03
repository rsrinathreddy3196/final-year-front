import React, { Fragment, useState,useEffect } from 'react';

import { Dialog, TableRow, TableCell, Button,Grid,FormControl,InputLabel,MenuItem,Select,TextField } from '@material-ui/core'
import axios from 'axios';
import { FaTrashAlt,FaPencilAlt } from 'react-icons/fa';
import style from './questionMain.module.css'
function QuestionSetMain(){
  const [loading, setLoading] = useState(true);
  const [data,setData]=useState([]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState();
  const [subjectCode, setSubjectCode] = useState();
  const [question, setQuestion] = useState();
  const [mark, setMark] = useState();
  const [moduleNo, setModuleNo] = useState();
  const [topic, setTopic] = useState();
  const [rbtLevel, setRbtLevel] = useState();
  const [coNo, setCoNo] = useState();
  const [option,setOption] = useState([]);
  const [answerScheme, setAnswerScheme] = useState();
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
  const addQuestion=async()=>{
    const questModel = {
      "type":type,
      "subjectCode":subjectCode,
      "questionText":question,
      "marks":mark,
      "moduleNumber":moduleNo,
      "topic":topic,
      "rbtlevel":rbtLevel,
      "coNumber":coNo,
      "hasImage":false,
      "image":"",
      "option":option,
      "answerScheme":answerScheme
    }
    console.log(questModel);
     
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "localhost:3000",
      }
    };
  axios.post('http://localhost:3000/addQuestion', questModel , axiosConfig)
    .then(res => {
      console.log(res);
    }).catch(e=>console.log(e))
  };
  const getData=()=>{
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "localhost:300",
      }
    };
  
  axios.get('http://localhost:3000/getQuestion', {},axiosConfig)
    .then(res => {
      console.log(res);
      setData(res.data);
      setLoading(false);
  })};
  useEffect(() => {
    getData();
    
    },[]);
  return (
    <main className={style.main}>
      
      <h1 className={style.marginZero}>Question To Database</h1>
    
     { loading?<></>:
      <div>
      <Fragment key={0}>
          <TableRow className='firstRow'>
            <TableCell className='index' align="left"><b> Index</b></TableCell>
            <TableCell className='question' align="left"><b>Question</b></TableCell>
            <TableCell className='subjectCode' align="center"><b>Subject Code</b></TableCell>
            <TableCell className='marks' align="center"><b>Marks</b></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </Fragment>
      {
          data!=undefined?data.map((ques,index)=>(

            <Fragment key={ques._id}>
              <TableRow key={ques._id}  justify="space-between">
                <TableCell className='index' align="left" >{ index}</TableCell>
                <TableCell className='question' align="left" dangerouslySetInnerHTML={ { __html: ques.questionText } }></TableCell>
                <TableCell className='subjectCode' align="center" >{ ques.subjectCode }</TableCell>
                <TableCell className='marks' align="center">{ ques.marks }</TableCell>
                <TableCell className='delete' align='center'><Button className='deleteBtn' onClick={()=>console.log(ques.id)}><FaTrashAlt className='color' /></Button><Button className='deleteBtn' onClick={()=>setOpen(true)}><FaPencilAlt className='color' /></Button></TableCell>
              
              </TableRow>
            </Fragment>
            )):<></>
      }
       <Button onClick={()=>{setOpen(true); console.log(open)}}>Add Ques</Button>
      </div>
}
      {open?<Dialog open={open} onClose={ () => setOpen(false) } fullWidth maxWidth="lg">
      
                <div className={style.subMain}>
                    <h5 className={style.heading}>Add Question To Database</h5>
                    <div className={style.registerform}>
                    <Grid container>
                          <Grid item>
                              <FormControl fullWidth className={style.text1} >
                                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={type}
                                      label="Type"
                                      onChange={e=>setType(e.target.value)}
                                  >
                                      <MenuItem value={"subjective"}>Subjective</MenuItem>
                                      <MenuItem value={"objective"}>Objective</MenuItem>
                                  </Select>
                              </FormControl>
                          </Grid>
                      </Grid>
                      
                      <br/>

                    <Grid container>
                          <Grid item>
                          <TextField className={style.text1}  fullWidth label="Subject Code" id="subjectCode"  onChange={e=>setSubjectCode(e.target.value)}/>
                          </Grid>
                    </Grid>
                    
                    <br/>

                    <Grid container>
                          <Grid item>
                          <TextField className={style.text1}  fullWidth label="Question" id="address"  onChange={e=>setQuestion(e.target.value)}/>
                          </Grid>
                    </Grid>

                    <br/>

                    <Grid container>
                          <Grid item>
                          <TextField className={style.text1} InputProps={{ inputProps: { min: 1, max: 20 } }} fullWidth label="Marks" id="number"  onChange={e=>setMark(e.target.value)} type='number'/>
                          </Grid>
                    </Grid>

                    <br/>

                    <Grid container>
                          <Grid item>
                          <TextField className={style.text1} InputProps={{ inputProps: { min: 1, max: 5 } }} fullWidth label="Module No." id="moduleNo"  onChange={e=>setModuleNo(e.target.value)} type='number'/>
                          </Grid>
                    </Grid>

                    <br/>

                    <Grid container>
                          <Grid item>
                          <TextField className={style.text1} fullWidth label="Topic" id="topic"  onChange={e=>setTopic(e.target.value)}/>
                          </Grid>
                    </Grid>

                    <br/>

                    <Grid container>
                          <Grid item>
                              <FormControl fullWidth className={style.text1} >
                                  <InputLabel id="demo-simple-select-label">RBT Level</InputLabel>
                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={rbtLevel}
                                      label="rbtLevel"
                                      onChange={e=>setRbtLevel(e.target.value)}
                                  >
                                      <MenuItem value={"1"}>1</MenuItem>
                                      <MenuItem value={"2"}>2</MenuItem>
                                      <MenuItem value={"3"}>3</MenuItem>
                                      <MenuItem value={"4"}>4</MenuItem>
                                      <MenuItem value={"5"}>5</MenuItem>
                                  </Select>
                              </FormControl>
                          </Grid>
                      </Grid>

                      <br/>
                      
                    <Grid container>
                          <Grid item>
                          <TextField className={style.text1} InputProps={{ inputProps: { min: 1, max: 5 } }} fullWidth label="CO No." id="moduleNo"  onChange={e=>setCoNo(e.target.value)} type='number'/>
                          </Grid>
                    </Grid>

                    <br/>

                    {type === "objective"?
                    <Grid container>
                          <Grid item>
                          <TextField className={style.text1}  fullWidth label="Objective Options" id="address"  onChange={e=>setOption(e.target.value)}/>
                          </Grid>
                    </Grid>:<></>}

                    <br/>

                    <Grid container>
                          <Grid item>
                          <TextField className={style.text1}  fullWidth label="Answer Schema" id="address"  onChange={e=>setAnswerScheme(e.target.value)}/>
                          </Grid>
                    </Grid>

                    <br/>
                    
                    <Button variant="contained" className={style.text1}onClick={addQuestion}>Submit</Button>

                    </div>
                </div>
                
            </Dialog>:<></>}
    </main>
  );
}

export default QuestionSetMain;