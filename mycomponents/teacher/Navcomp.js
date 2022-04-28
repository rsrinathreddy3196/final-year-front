import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect,useState } from "react";
function Nav(){
    const [token, setToken] = useState();
   useEffect(() => {
        var t=localStorage.getItem('token');
        console.log(t);
        setToken(t);
    });
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="/">HKBK College</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item">
                        <Link className="nav-link active text-white " aria-current="page" to={"/teacher"}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active text-white" to={"/about"}>About Us</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active text-white" to={"/teacherSignUp"}>Sign Up</Link>
                    </li>
                   {
                       token!=null?<li className="nav-item">
                       <Link className="nav-link active text-white" to={"/logout"}>Logout</Link>
                   </li>:<></>
                   }
                </ul>
                </div>
            </div>
            </nav>
        </>

    );
}

export default Nav;