import React, { useState } from 'react';
import axios  from 'axios';
import style from '../../pages/signup/index.module.css';
import {Grid} from '@material-ui/core';
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
function Registercomp() {
    const router = useRouter()
    const [employeeid, setEmployeeId] = useState();
    const [employeeErr, setEmployeeErr] = useState({});
    const [name, setName] = useState();
    const [nameErr,setnameErr] = useState({});
    const [department, setDepartment] = useState();
    const [departmentErr, setDepartmentErr] = useState({});
    const [dob, setDob] = useState();
    const [dobErr, setDobErr] = useState({});
    const [gender, setGender] = useState();
    const [genderErr, setGenderErr] = useState({});
    const [address, setAddress] = useState();
    const [addressErr,setAddressErr] = useState({});
    const [mobile, setMobile] = useState();
    const [mobileErr, setMobileErr] = useState({});
    const [password, setPassword] = useState();
    const [passwordErr, setPasswordErr] = useState({});
  
 
    const handleSubmit = event => {
      event.preventDefault();
      const validate = FormValidation();
      console.log(employeeid,password,department,gender,dob,mobile,password);
      const user = {
          EmployeeId:employeeid,
          name:name,
          sem:'7',
          Dep:department,
          gender:gender,
          subject:[],
          dob:dob,
          contactInfo:{
              address:address,
              mobileNo:9876543210,
              parentMobileNo:8976543210
              
          },
          role:'teachers',
          password:password
      };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "localhost:3000",
          }
        };
        console.log(user);
        axios.post('http://localhost:3000/teacherRegistration',  user , axiosConfig)
            .then(res => {
              console.log(res.data);
              if(res.data.data.length===0){
              //   handleClickToOpen();
              }else{
                router.push('/teacher');
            
              }
            
              
            })
  }
  const FormValidation = () =>{
    const employeeErr = {};
    const mobileErr = {};
    const passwordErr = {};
    const nameErr = {};
    const addressErr = {};
    const genderErr = {};
    const dobErr = {};
    let validate = true;

    if(employeeid==null||employeeid.length==0){
      employeeErr.error = "Field cannot be empty";
      validate = false;
    }

    else if(employeeid.trim().length!=10||employeeid==undefined){
          employeeErr.usnerror = "Invalid Usn";
          validate = false;
    }
    
    if(name==null||name.length==0){
        nameErr.error = "Field cannot be empty";
        validate = false;
    }
    if(address==null||address.length==0){
        addressErr.err = "Field cannot be empty";
        validate = false;
    }
    if(gender==null){
        genderErr.err = "select the gender";
        validate = false;
    }
    if(department==null){
        departmentErr.err = "select the department"
        validate = false;
    }
    if(dob==null){
        dobErr.err = "select the date";
        validate = false;
    }
    if(mobile==null||mobile.length==0){
        mobileErr.mobilerror = "Field cannot be empty";
        
        validate = false;
    }
    else if(mobile.length!=10||mobile==undefined){
        mobileErr.error = "invalid mobile number";
        validate = false;
    }
    if(password==null||password.length==0){
        passwordErr.passerror = "Field cannot be empty";
        validate = false;
    }
    else if(password.length<8){
        passwordErr.passerror = "Password must be minimum 8 characters long";
        validate = false;
    }
    setEmployeeErr(employeeErr);
    setMobileErr(mobileErr);
    setPasswordErr(passwordErr);
    setnameErr(nameErr);
    setAddressErr(addressErr);
    setGenderErr(genderErr);
    setDobErr(dobErr);
    setDepartmentErr(departmentErr);
    return validate;
}
  return (
      
    <div >
    <div > 
    <div className={style.subMain}>
       
        <div className={style.registerform}>
        <h2 className={style.heading}>Teacher Registration</h2>
        <Grid container>
            <Grid item>
            <TextField className={style.text1}  fullWidth label="Employee Id" id="employeeId"  onChange={e=>setEmployeeId(e.target.value)}/>
            {Object.keys(employeeErr).map((key)=>{
                    return <div className='usncheck' style={{color:"red"}}>{employeeErr[key]}</div>
                  })}
            </Grid>
        </Grid>
        <br/>
        <Grid container>
            <Grid item>
            <TextField className={style.text1}  fullWidth label="Name" id="name"  onChange={e=>setName(e.target.value)}/>
            {Object.keys(nameErr).map((key)=>{
                            return <div className='usncheck' style={{color:"red"}}>{nameErr[key]}</div>
                            })}
            </Grid>
        </Grid>
       
        
        <br/>
        <Grid container>
            <Grid item>
                <FormControl fullWidth className={style.text1} >
                    <InputLabel id="demo-simple-select-label">Department</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={department}
                        label="Branch"
                        onChange={e=>setDepartment(e.target.value)}
                    >
                        <MenuItem value={"cse"}>CSE</MenuItem>
                        <MenuItem value={"ise"}>ISE</MenuItem>
                        <MenuItem value={"ece"}>ECE</MenuItem>
                        <MenuItem value={"mec"}>MEC</MenuItem>
                        <MenuItem value={"eee"}>EEE</MenuItem>
                        <MenuItem value={"civil"}>CIVIL</MenuItem>
                    </Select>
                    {Object.keys(departmentErr).map((key)=>{
                    return <div className='usncheck' style={{color:"red"}}>{departmentErr[key]}</div>
                  })}
                </FormControl>
            </Grid>
        </Grid>
        
        <br/>
        <Grid container>
            <Grid item>
            <input type="date" className={style.dob} onChange={e=>setDob(e.target.value)} id="name"/>
            {Object.keys(dobErr).map((key)=>{
                            return <div className='usncheck' style={{color:"red"}}>{dobErr[key]}</div>
                            })}
            </Grid>
        </Grid>
       
        <Grid container style={{display:'inline'}}>
            <Grid item>
            <label htmlFor="gender" class="col-sm-2 col-form-label"><h4 style={{fontWeight:'250'}}>Gender</h4></label>
            <Grid container >
                <Grid item>
                <input type="radio" value="Male" name="gender"  onChange={e=>setGender(e.target.value)}/> Male 
                <input type="radio" value="Female" name="gender" onChange={e=>setGender(e.target.value)} />     Female
                {Object.keys(genderErr).map((key)=>{
                            return <div className='usncheck' style={{color:"red"}}>{genderErr[key]}</div>
                            })}
                </Grid>
            </Grid>
            
            </Grid>
        </Grid>

        <br/>
        <Grid container>
            <Grid item >
                <TextField
                className={style.text1}
                id="outlined-textarea"
                label="Address"
                placeholder="Enter Your Address"
                multiline
                onChange={e=>setAddress(e.target.value)}
                rows={3}
                />
                {Object.keys(addressErr).map((key)=>{
                             return <div className='usncheck' style={{color:"red"}}>{addressErr[key]}</div>
                            })}
            </Grid>
        </Grid>

        <br/>
        <Grid container>
            <Grid item>
            <TextField className={style.text1}  fullWidth label="Mobile No" id="mobile"  onChange={e=>setMobile(e.target.value)} type="number"/>
            {Object.keys(mobileErr).map((key)=>{
                    return <div className='usncheck' style={{color:"red"}}>{mobileErr[key]}</div>
                  })}
            </Grid>
        </Grid>
       
        <br/>
        <Grid container>
            <Grid item>
            <TextField className={style.text1}  fullWidth label="Password" id="password"  onChange={e=>setPassword(e.target.value)}/>
            {Object.keys(passwordErr).map((key)=>{
                    return <div className='usncheck' style={{color:"red"}}>{passwordErr[key]}</div>
                  })}
            </Grid>
        </Grid>
        <br/>
        <Button variant="contained" className={style.text1}onClick={handleSubmit}>Submit</Button>
        </div>
    </div>
    </div>
</div>
  )
}

export default Registercomp;