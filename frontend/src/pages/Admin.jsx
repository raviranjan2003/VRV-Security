import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import HomeNavbar from '../components/HomeNavbar';

const Admin = () => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);
    
    useEffect(() => {
        const role = localStorage.getItem('role-vrv');
        if(!role) {
            navigate('/sign-in');
        }

        if(role === "admin") {
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

export default Admin;