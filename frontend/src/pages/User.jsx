import React from 'react';
import { useNavigate } from 'react-router';
import HomeNavbar from '../components/HomeNavbar';

const User = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role-vrv');
    if(!role) {
        navigate('/sign-in');
    }
    return (
        <>
            <HomeNavbar />
            <div>
                <h1>Yes, you are authorized !</h1>
            </div>
        </>
    )
}

export default User;