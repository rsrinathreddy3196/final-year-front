import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
  

function LoginForm(){
      const [usn, setUSN] = useState();
      const [password, setPassword] = useState();
      const [open, setOpen] = React.useState(false);
  
      const handleClickToOpen = () => {
        setOpen(true);
      };
      
      const handleToClose = () => {
        setOpen(false);
      };
      
      const navigate = useNavigate()

      const handleSubmit = event => {
        event.preventDefault();
        console.log(usn,password);
        const user = {
          EmployeeId: usn,
          password:password
        };
    
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "localhost:3000",
            }
          };
        axios.post('http://localhost:3000/teacherLogin',  user , axiosConfig)
          .then(res => {
            if(res.data.data.length===0){
              handleClickToOpen();
            }else{
              localStorage.setItem('token',res.data.token);
              navigate('/signup');
            }
          
            
          }).catch(e=>console.log(e));
      }
      return(
        
            <>
             <Dialog open={open} onClose={handleToClose}>
              <DialogTitle>{"Error"}</DialogTitle>
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
            <Container className='form'>
                <Row>            
                    <form onSubmit={handleSubmit}>
                <h4>Welcome Back..</h4>
                <Col  lg={12} md={12} sm={12}>
                    <input  type="text" className=" mail form-control rounded-pill " id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e=>setUSN(e.target.value)} placeholder='Enter Your Official Mail id'/>
                </Col>
                <Col lg={12} md={12} sm={12}>
                    <input type="password" className=" password form-control rounded-pill" id="exampleInputPassword1" onChange={e=>setPassword(e.target.value)} placeholder='Enter Your Password'/>
                </Col>
                <a className='forgetpass' href='/'>Forget Your Password?</a>
                <button type="submit" className="btn btn-primary ">Login</button>
                    </form> 
                </Row>
    
            </Container>    
            </>  
      );
}


export default LoginForm;