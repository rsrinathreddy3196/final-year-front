import { useState } from 'react';
import { Dialog,DialogContentText,DialogTitle,DialogActions,DialogContent, Button,Grid,Box,TextField,FormControlLabel} from '@mui/material';

function LoginForm(){
      const [usn, setUSN] = useState();
      const [password, setPassword] = useState();
      const [open, setOpen] = useState(false);
  
      const handleClickToOpen = () => {
        setOpen(true);
      };
      
      const handleToClose = () => {
        setOpen(false);
      };
      
    
      const handleSubmit = event => {
        event.preventDefault();
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
        axios.post('http://localhost:3000/studentLogin',  user , axiosConfig)
          .then(res => {
            if(res.data.data.length===0){
              handleClickToOpen();
            }else{
              localStorage.setItem('token',res.data.token);
              navigate('/about');
            }
          
            
          }).catch(e=>console.log(e))
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
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
        
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

