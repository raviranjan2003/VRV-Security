const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/isAuth');
const checkRoles  = require('../middleware/roleCheck');
const User = require('../model/users');

router.get("/admin",isAuth,checkRoles('admin'), (req,res) => {
    res.status(200).json({ message: "Welcome Admin !"});
});
router.get("/manager",isAuth, checkRoles('admin', 'manager'), (req,res) => {
    res.status(200).json({ message: "Welcome Manager !"});
});
router.get("/user",isAuth,checkRoles('admin', 'manager', 'user'),(req,res) => {
    res.status(200).json({ message: "Welcome User !"});
});

//endpoint to update the role of user (only admin can update the role)
router.patch('/update-role/:id',isAuth, checkRoles('admin'), async (req, res) => {
    const { id } = req.params;
    const { role } = req.body; 
    try {
        //Search for user against id and update it
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user' });
    }
});

module.exports = router;