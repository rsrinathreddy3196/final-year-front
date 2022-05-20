import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Dialog,DialogContentText,DialogTitle,DialogActions,DialogContent, Button,Grid,Box,TextField,FormControlLabel} from '@mui/material';

function LoginForm(){
      const router = useRouter()
      const [usn, setUSN] = useState();
      const [password, setPassword] = useState();
      const [empErr,setempErr] = useState({});
      const [passwordErr,setPasswordErr] = useState({});
      const [open, setOpen] = useState(false);
  
      const handleClickToOpen = () => {
        setOpen(true);
      };
      
      const handleToClose = () => {
        setOpen(false);
      };
      
    
      const handleSubmit = event => {
        event.preventDefault();
        const isValid = formValidation();
        console.log(usn,password);
        const user = {
          USN: usn,
          password:password
        };
    
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "localhost:3000",
            }
          };
        if(isValid){
        axios.post('http://localhost:3000/teacherLogin',  user , axiosConfig)
          .then(res => {
            console.log(res);
            if(res.data.data.length===0){
              handleClickToOpen();
            }else{
              
              // router.push('./pages/about')
              localStorage.setItem('token',res.data.token);
              localStorage.setItem('id',res.data.data.EmployeeId);
            }
          
            
          }).catch(e=>console.log(e))
        }
      }
      const formValidation = () =>{
        const empErr = {};
        const passwordErr = {};
        let isValid = true;

        if(usn==null){
          empErr.error = "usn cannot be empty";
          isValid = false;
        }
        if(password==null||password.length==0){
          passwordErr.passerr = "password cannot be empty";
          isValid = false;
        }

        else if(usn.trim().length!=10){
              empErr.emperror = "Invalid Usn";
              isValid = false;
        }
        
        setempErr(empErr);
        setPasswordErr(passwordErr);
        return isValid;
  }
      return(
        
            <>
             <Dialog open={open} onClose={handleToClose}>
              <DialogTitle>Wrong Password</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Invalid Id or Password
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleToClose} 
                        color="primary" autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            <Grid container>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className='LoginForm' sm={10}>
                <h2>Welcome Teachers!.</h2>
            <TextField
              onChange={e=>setUSN(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {Object.keys(empErr).map((key)=>{
                    return <div className='usncheck' style={{color:"red"}}>{empErr[key]}</div>
                  })}
            <TextField
              onChange={e=>setPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {Object.keys(passwordErr).map((key)=>{
                    return <div className='usncheck' style={{color:"red"}}>{passwordErr[key]}</div>
                  })}
        
            <Button
              type="submit"
              className='LoginBtn'
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                  {"Don't have an account? Sign Up"}
              </Grid>
            </Grid>
          </Box>
        </Grid>
            </>  
      );
}
export default LoginForm;