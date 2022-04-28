// import React from 'react'
import {Container} from 'react-bootstrap'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registercomp() {
    const [employeeid, setEmployeeId] = useState();
    const [name, setName] = useState();
    const [department, setDepartment] = useState();
    const [dob, setDob] = useState();
    const [gender, setGender] = useState();
    const [address, setAddress] = useState();
    const [mobile, setMobile] = useState();
    const [subteacher, setSubjectTeacher] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate()

    const handleSubmit = event => {
        event.preventDefault();
        // console.log(usn,password,sem,branch,dob,mobile,parentsmobile,password);
        const user = {
            EmployeeId:employeeid,
            name:name,
            sem:6,
            Dep:department,
            gender:gender,
            subject:[],
            dob:dob,
            contactInfo:{
                address:address,
                mobileNo:mobile,
                parentMobileNo:7418529630
            },
            role:subteacher,
            password:password
        }

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
              navigate('/');
            }
          
            
          })  

}
  return (
                <div className='main'>
                <Container className='registerconatiner'> 
                <div className='sub-main'>
                    
                    <h5>Teacher Registration</h5>
                    <div className='registerform'>
                    <div className=" usn mb-3 row">
                        <label htmlFor="usn" class="col-sm-2 col-form-label">EmployeeId</label>
                        <div className="col-sm-10">
                            <input type="text" class=" text1 form-control rounded-pill" onChange={e=>setEmployeeId(e.target.value)} id="usn"/>
                        </div>
                    </div>
                    <div className=" name mb-3 row">
                        <label htmlFor="name" class="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" class=" text1 form-control rounded-pill" onChange={e=>setName(e.target.value)} id="name"/>
                        </div>
                    </div>
                    <div className="branch mb-3 row">
                        <label htmlFor="branch" class="col-sm-2 col-form-label">Dep</label>  
                        <select name='branch' className='branchname' onChange={e=>setDepartment(e.target.value)} >
                            <option value='cse'>CSE</option>
                            <option value='ise'>ISE</option>
                            <option value='ece'>ECE</option>
                            <option value='mec'>MEC</option>
                            <option value='EEE'>EEE</option>
                            <option value='civil'>CIVIL</option>
                        </select>
                    </div>
                    <div className=" dob mb-3 row">
                        <label htmlFor="dob" class="col-sm-2 col-form-label">DOB</label>
                        <div className="col-sm-10">
                            <input type="date" class=" text1 form-control rounded-pill" onChange={e=>setDob(e.target.value)} id="name"/>
                        </div>
                    </div>
                    <div className=" dob mb-3 row" >
                    <label htmlFor="dob" class="col-sm-2 col-form-label">Gender</label>
                        <div className="col-2">
                        <input type="radio" value="Male" name="gender" onChange={e=>setGender(e.target.value)} /> Male
                        </div>
                        <div className="col-2">
                        <input type="radio" value="Female" name="gender" onChange={e=>setGender(e.target.value)} /> Female
                        </div>
                    </div>
                    <div className=" name mb-3 row">
                        <label htmlFor="name" class="col-sm-2 col-form-label">Address</label>
                        <div className="col-sm-10">
                            <textarea rows = "2" cols = "60" class=" text1 form-control " onChange={e=>setAddress(e.target.value)} id="name"/>
                        </div>
                    </div>
                    <div className=" mobile mb-3 row">
                        <label htmlFor="mobile" class="col-sm-2 col-form-label">Mobile</label>
                        <div className="col-sm-10">
                            <input type="tel" class=" text1 form-control rounded-pill" onChange={e=>setMobile(e.target.value)} id="name"/>
                        </div>
                    </div>
                    <div className=" name mb-3 row">
                        <label htmlFor="name" class="col-sm-2 col-form-label">Subject Teach</label>
                        <div className="col-sm-10">
                            <textarea rows = "2" cols = "60" class=" text1 form-control " onChange={e=>setSubjectTeacher(e.target.value)} id="name"/>
                        </div>
                    </div>
                    <div className=" parents mb-3 row">
                        <label htmlFor="password" class="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" class=" text1 form-control rounded-pill" onChange={e=>setPassword(e.target.value)} id="name"/>
                        </div>
                    </div>
                    <button type="button" class=" submitbtn btn btn-primary" onClick={handleSubmit}>Submit</button>

                    </div>
                </div>
                </Container>
            </div>
  )
}

export default Registercomp
