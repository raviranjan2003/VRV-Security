import React, { useState } from 'react';
import './body.css';
import axios from 'axios';
import UserTable from './Table';
import { useAuth } from '../context/authContext';

const Body = () => {
    const [isAuthorize, setIsAuthorize] = useState(false);
    const [isNotAuthorize, setIsNotAuthorize] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    // const userContext = useAuth();
    // console.log(userContext.user)

    const handleAdmin = async (endpoint) => {
        try {
            const response = await axios.get(`http://localhost:8000/users/${endpoint}`,{ withCredentials: true });
            if(response.status === 200) {
                setIsAuthorize(true);
                setIsNotAuthorize(false);
            } else {
                setIsAuthorize(false);
                setIsNotAuthorize(true);
            }
        } catch (error) {
            setIsAuthorize(false);
            setIsNotAuthorize(true);
            if(error.response.status === 401) {
                setErrorMessage(error.response.data.message);
            }else if(error.response.status === 403) {
                setErrorMessage("Sorry! You are not authorized...");
            }
        }
        
    }

  return (
    <div className="main-container">
        <div className='parent-container'>
            <div className="child-container1">
                <div className="options" onClick={()=>handleAdmin("admin")}>Admin</div>
                <div className="options" onClick={()=>handleAdmin("manager")}>Manager</div>
                <div className="options" onClick={()=>handleAdmin("user")}>Users</div>
            </div>
            <div className="child-container2">
                <div className="content">
                    <h3>{`Welcome! ${localStorage.getItem('user-vrv')} (${localStorage.getItem('role-vrv')})`}</h3>
                    {isAuthorize ? <h4>Yess! You are authorized :)</h4> : null}
                    {isNotAuthorize ? <h4>Sorry! You are not authorized :(</h4> : null}
                </div>
            </div>

        </div>
        { localStorage.getItem("role-vrv") === "admin" && 
        <div className="userlist">
            <UserTable />
        </div>}
    </div>
  )
}

export default Body;