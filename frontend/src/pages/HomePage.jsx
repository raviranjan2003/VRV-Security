import React from 'react'
import Body from '../components/Body';
import HomeNavbar from '../components/HomeNavbar';

const HomePage = () => {
    const newUser = localStorage.getItem('user-vrv');
  return (
    <>
        <HomeNavbar />
        {newUser && <Body />}
    </>
  )
}

export default HomePage;