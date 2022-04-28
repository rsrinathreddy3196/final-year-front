import React, { useState } from 'react';
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

    const [usn, setUSN] = useState();
    const [name, setName] = useState();
    const [sem, setSem] = useState();
    const [branch, setBranch] = useState();
    const [dob, setDob] = useState(null);
    const [mobile, setMobile] = useState();
    const [parentsmobile, setParentsmobile] = useState();
    const [password, setPassword] = useState();
    // const [gender, setGender] = useState();
    const [address, setAddress] = useState();
  
 
    const handleSubmit = event => {
      event.preventDefault();
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
            
              }
            
              
            })
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
            </Grid>
        </Grid>
        <br/>
        <Grid container>
            <Grid item>
            <TextField className={style.text1}  fullWidth label="Name" id="name"  onChange={e=>setName(e.target.value)}/>
            </Grid>
        </Grid>
        <br/>
        <Grid container>
            <Grid item>
            <TextField className={style.text1} fullWidth label="Sem" id="sem"  onChange={e=>setSem(e.target.value)}  type="number"   InputProps={{ inputProps: { min: 1, max: 8 } }}/>
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
            </Grid>
        </Grid>

        <br/>
        <Grid container>
            <Grid item>
            <TextField className={style.text1}  fullWidth label="Mobile No" id="mobile"  onChange={e=>setMobile(e.target.value)} type="number"/>
            </Grid>
        </Grid>

        <br/>
        <Grid container>
            <Grid item>
            <TextField className={style.text1}  fullWidth label="Parent Mobile No" id="parentmobile"  onChange={e=>setParentsmobile(e.target.value)} type="number"/>
            </Grid>
        </Grid>
       
        <br/>
        <Grid container>
            <Grid item>
            <TextField className={style.text1}  fullWidth label="Password" id="password"  onChange={e=>setPassword(e.target.value)}/>
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
