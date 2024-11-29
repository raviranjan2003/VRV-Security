import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import HomeNavbar from '../components/HomeNavbar';

const Manager = () => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const role = localStorage.getItem('role-vrv');
        if(!role) {
            navigate('/sign-in');
        }

        if(role === "admin" || role === "manager") {
            setIsAuthorized(true);
        }
    })
  return (
    <>
        <HomeNavbar />
        {isAuthorized ? 
        <div>
            <h1>Yes, you are authorized !</h1>
        </div> : 
        <div>
            <h1>Sorry, you are not authorized !</h1>
        </div>}
    </>
  )
}

export default Manager;