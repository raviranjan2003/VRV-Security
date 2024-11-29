import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Body from './Body';
import axios from 'axios';

export default function HomeNavbar() {
  const user = useAuth();
  const navigate = useNavigate();
  const newUser = localStorage.getItem('user-vrv');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () =>{
    setAnchorEl(null);
    const logoutRes = await axios.get("http://localhost:8000/auth/sign-out", {withCredentials: true});
    if(logoutRes.status === 200) {
      console.log("logged out successfully")
      localStorage.removeItem("user-vrv");
      localStorage.removeItem("role-vrv");
      navigate('/sign-in');
    }
  }
  React.useEffect(()=>{
    const userInfo = localStorage.getItem('user-vrv');
    if(userInfo){
      user.setUser({
        username : userInfo,
      })
    }
  },[])
  return (<>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            VRV SECURITIES
          </Typography>
          {newUser &&
          <Box sx={{ display: 'flex', justifyContent: '', flexGrow: 2 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Home</Button>
            </Link>
            <Link to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Admin</Button>
            </Link>
            <Link to="/manager" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Manager</Button>
            </Link>
            <Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">User</Button>
            </Link>
          </Box>}
          {newUser ? 
            <> 
              <p onClick={handleMenu} style={{ cursor : 'pointer'}}>{newUser}</p> 
              <Paper elevation={1} />
            </>:
            <>
              <Link to="/sign-up" style={{ textDecoration: 'none', color: 'inherit' }}><Button color="inherit">SignUp</Button></Link>
              <Link to="/sign-in" style={{ textDecoration: 'none', color: 'inherit' }}><Button color="inherit">Login</Button></Link>
            </>
          }
          <Menu
                sx={{ mt: '40px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </Menu>
        </Toolbar>
      </AppBar>
    </Box>
    {/* {newUser ? <Box>
      <Body />
    </Box>:null} */}
    </>
  );
}