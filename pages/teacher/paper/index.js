import React, { useState,useEffect } from 'react';
import { Button } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import style from './paperGen.module.css'
function PaperGenMain({handleToggleSidebar,}){
  const [exam, setExam] = useState(1);
  const [subject, setSubject] = useState([]);
  const [selectedSubject,setSelectedSubject]=useState(); 
  
  const getData=()=>{
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "localhost:300",
      }
    };
  axios.get('http://localhost:3000/getSubject', {},axiosConfig)
    .then(res => {
      console.log(res.data);
      setSubject(res.data);
  })};
  useEffect(() => {
    getData();
    },[]);
  const generatePaper = ()=>{
    console.log("Generate Paper");
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "localhost:300",
      }
    };
  axios.get('http://localhost:3000/generateQP?IA='+exam,{},  axiosConfig,)
    .then(res => {
      if(res.data){
        console.log(res.data);
        doc.text("HKBK College Of Engineering",70,10)
        doc.text("Internal Assignment - "+exam,80,20)
        
        var line = 30;
        for(var i in res.data){
          console.log(line);
          doc.text("M "+res.data[i].moduleNumber+"  "+parseInt(parseInt(i)+1)+". "+res.data[i].questionText, 10, line);
          doc.text(res.data[i].marks+"\n",180,line);
          line+=10;
        }
      }
    
      console.log("Generate Paper");
      
    }).catch(e=>console.log(e))
  };
  return (
    <main className={style.main}>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
      
      </div>
      <h1>Paper Generator Main</h1>
      <div className="container">
        <div className={style.paperGen}>
          <div className="col-12 mb-3" >
            Select Subject
          </div>
            <div className='col-6'>
                <Select
                    labelId="subject"
                    id="subject"
                    value={selectedSubject}
                    label="Select Subject"
                    onChange={(e)=>setSelectedSubject(e.target.value)}
                >
                    {subject.map((e)=>{
                    return <MenuItem  value={e.shortName} key={e.shortName}>{e.shortName}</MenuItem>
                    })}
                    <MenuItem value={1}>IA 1</MenuItem>
                    <MenuItem value={2}>IA 2</MenuItem>
                    <MenuItem value={3}>IA 3</MenuItem>
                </Select>
            </div>
            <br/>
          <div className="col-12 mb-3" >
            Select Exam
          </div>
            <div className='col-6'>
            <Select
                labelId="exam"
                id="exam"
                value={exam}
                label="Select Exam"
                onChange={(e)=>setExam(e.target.value)}
            >
                <MenuItem value={1}>IA 1</MenuItem>
                <MenuItem value={2}>IA 2</MenuItem>
                <MenuItem value={3}>IA 3</MenuItem>
            </Select>
            </div>
            <br/>
            <div className='col-12'>
              <Button  variant="contained" onClick={generatePaper}>Generate Paper</Button>
            </div>
         
       </div>
        
      </div>
      

    </main>
  ); 
}

export default PaperGenMain;