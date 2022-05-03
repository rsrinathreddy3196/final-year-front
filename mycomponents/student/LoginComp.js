import { useState } from 'react';
import { Dialog,DialogContentText,DialogTitle,DialogActions,DialogContent, Button,Grid,Box,TextField,FormControlLabel} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router'
function LoginForm(){
      const router = useRouter()
      const [usn, setUSN] = useState();
      const [password, setPassword] = useState();
      const [usnErr,setUsnErr] = useState({});
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
        axios.post('http://localhost:3000/studentLogin',  user , axiosConfig)
          .then(res => {
            console.log(res);
            if(res.data.data.length===0){
              handleClickToOpen();
            }else{
              router.push('./pages/about')
              localStorage.setItem('token',res.data.token);
            }
          
            
          }).catch(e=>console.log(e))
        }
      }
      const formValidation = () =>{
        const usnErr = {};
        const passwordErr = {};
        let isValid = true;

        if(usn==null){
          usnErr.error = "Field cannot be empty";
          isValid = false;
        }
        if(password==null||password.length==0){
          passwordErr.error = "Field cannot be empty";
          isValid = false;
        }
        else if(usn.trim().length!=10){
              usnErr.usnerror = "Invalid Usn";
              isValid = false;
        }
        setUsnErr(usnErr);
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
                <h2>Welcome Back!.</h2>
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
             {Object.keys(usnErr).map((key)=>{
                    return <div className='usncheck' style={{color:"red"}}>{usnErr[key]}</div>
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

