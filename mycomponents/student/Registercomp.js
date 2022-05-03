import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import style from '../../pages/signup/index.module.css';
import {Grid} from '@material-ui/core'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
function Registercomp() {
    const router = useRouter()
    const [usn, setUSN] = useState();
    const [usnErr, setusnErr] = useState({});
    const [name, setName] = useState();
    const [nameErr,setnameErr] = useState({});
    const [sem, setSem] = useState();
    const [semErr,setSemErr] = useState({});
    const [branch, setBranch] = useState();
    const [dob, setDob] = useState(null);
    const [dobErr, setDobErr] = useState({});
    const [mobile, setMobile] = useState();
    const [mobileErr, setMobileErr] = useState({});
    const [parentsmobile, setParentsmobile] = useState();
    const [parentsmobileErr, setParentsmobileErr] = useState({});
    const [password, setPassword] = useState();
    const [passwordErr, setPasswordErr] = useState({});
    // const [gender, setGender] = useState();
    const [address, setAddress] = useState();
    const [addressErr,setAddressErr] = useState({});
  
 
    const handleSubmit = event => {
      event.preventDefault();
      const validate = FormValidation();
      console.log(usn,password,sem,branch,dob,mobile,parentsmobile,password);
      const user = {
          USN:usn,
          name:name,
          branch:branch,
          sem:sem,
          subject:[],
          dob:dob,
          contactInfo:{
              address:address,
              mobileNo:mobile,
              parentMobileNo:parentsmobile
          },
          password:password
      };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "localhost:3000",
          }
        };
        axios.post('http://localhost:3000/studentRegistration',  user , axiosConfig)
            .then(res => {
              console.log(res.data);
              if(res.data.data.length===0){
              //   handleClickToOpen();
              }else{
                router.push('/');
            
              }
            
              
            })
  }
  const FormValidation = () =>{
    const usnErr = {};
    const nameErr = {};
    const addressErr = {};
    const mobileErr = {};
    const parentsmobileErr= {};
    const passwordErr = {};
    const semErr = {};
    const dobErr = {};
    let validate = true;

    if(usn==null || usn.length==0 ){
      usnErr.error = "Field cannot be empty";
      validate = false;

    }

    else if(usn.trim().length!=10 || usn==undefined){
          usnErr.usnerror = "Invalid Usn";
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
    if(parentsmobile==null||parentsmobile.length==0){
        parentsmobileErr.mobileerr = "Field cannot be empty";
        validate = false;
    }
    else if(parentsmobile.length!=10||parentsmobile==undefined){
        parentsmobileErr.error = "invalid mobile number";
        validate = false;
    }
    if(dob==null||dob.length==0){
        dobErr.err = "select the date";
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
    if(sem==null||sem.length==0){
        semErr.err = "please select the semester";
        validate = false;
    }
    if(password==null||password.length==0){
        passwordErr.passerror = "Field cannot be empty";
        validate = false;
    }
    else if(password.length<8){
        passwordErr.passerror = "password must be 8 characters long";
        validate = false;
    }
    
    setusnErr(usnErr);
    setnameErr(nameErr);
    setMobileErr(mobileErr);
    setParentsmobileErr(parentsmobileErr);
    setPasswordErr(passwordErr);
    setAddressErr(addressErr);
    setSemErr(semErr);
    setDobErr(dobErr);
    return validate;
}
  return (
      
    <div >
    <div > 
    <div className={style.subMain}>
       
        <div className={style.registerform}>
        <h2 className={style.heading}>Student Registration</h2>
        <Grid container>
            <Grid item>
            <TextField className={style.text1}  fullWidth label="USN" id="usn"  onChange={e=>setUSN(e.target.value)}/>
            {Object.keys(usnErr).map((key)=>{
                    return <div className='usncheck' style={{color:"red"}}>{usnErr[key]}</div>
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
            <TextField className={style.text1} fullWidth label="Sem" id="sem"  onChange={e=>setSem(e.target.value)}  type="number"   InputProps={{ inputProps: { min: 1, max: 8 } }}/>
            {Object.keys(semErr).map((key)=>{
                    return <div className='usncheck' style={{color:"red"}}>{semErr[key]}</div>
                  })}
             </Grid>
        </Grid>
        
        <br/>
        <Grid container>
            <Grid item>
                <FormControl fullWidth className={style.text1} >
                    <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={branch}
                        label="Branch"
                        onChange={e=>setBranch(e.target.value)}
                    >
                        <MenuItem value={"cse"}>CSE</MenuItem>
                        <MenuItem value={"ise"}>ISE</MenuItem>
                        <MenuItem value={"ece"}>ECE</MenuItem>
                        <MenuItem value={"mec"}>MEC</MenuItem>
                        <MenuItem value={"eee"}>EEE</MenuItem>
                        <MenuItem value={"civil"}>CIVIL</MenuItem>
                    </Select>
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
            <label htmlFor="gender" class="col-sm-2 col-form-label"><h3>Gender</h3></label>
            <Grid container >
                <Grid item>
                <input type="radio" value="Male" name="gender"  /> Male 
                <input type="radio" value="Female" name="gender"  />     Female
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
            <TextField className={style.text1}  fullWidth label="Parent Mobile No" id="parentmobile"  onChange={e=>setParentsmobile(e.target.value)} type="number"/>
            {Object.keys(parentsmobileErr).map((key)=>{
                    return <div className='usncheck' style={{color:"red"}}>{parentsmobileErr[key]}</div>
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

export default Registercomp
