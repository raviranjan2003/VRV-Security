import axios from "axios";
import React, { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { Menu, MenuItem } from '@mui/material';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openMenuUserId, setOpenMenuUserId] = useState(null); // Track the user whose menu is open
    const [anchorEl, setAnchorEl] = useState(null); // Track the anchor element for each user's menu

    const handleMenu = (event, userId) => {
        setAnchorEl(event.currentTarget); // Set the anchor element for the menu
        setOpenMenuUserId(userId); // Set the user id whose menu is open
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenMenuUserId(null); 
    };

    const handleClick = async (role, id) => {
        setAnchorEl(null);
        setOpenMenuUserId(null);
        try {
            const response = await axios.patch(`http://localhost:8000/users/update-role/${id}`, { role }, { withCredentials: true});
            if (response.status === 200) {
                fetchUsers();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Function to fetch data
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/auth/get-user", { withCredentials: true});
            if (response.status !== 200) {
                throw new Error("Failed to fetch data");
            }
            setUsers(response.data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Username</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>User Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user._id}>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.username}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px", display: "flex" }}>
                                    {user.role}
                                    <span
                                        onClick={(e) => handleMenu(e, user._id)} // Pass the event and user ID when clicking
                                        style={{ marginLeft: "auto", cursor: "pointer" }}
                                    >
                                        <EditIcon />
                                    </span>

                                    <Menu
                                        sx={{ mt: '40px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorEl} // Use the stored anchorEl here
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={openMenuUserId === user._id} // Open the menu only for the selected user
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={() => { handleClick("admin", user._id) }}>Admin</MenuItem>
                                        <MenuItem onClick={() => { handleClick("manager", user._id) }}>Manager</MenuItem>
                                        <MenuItem onClick={() => { handleClick("user", user._id) }}>User</MenuItem>
                                    </Menu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserTable;
