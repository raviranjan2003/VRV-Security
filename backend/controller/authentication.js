const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../model/users');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "Thisismysecretkey";

module.exports.SignUp = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        //check email which is already registered or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "Email already registered !" });
        }
        //check for unique username, if already exist ask for different 
        const uniqueUserName = await User.findOne({ username });
        if(uniqueUserName){
            return res.status(200).json({ message: "Username taken, try different !" });
        }

        //hash the password and save to db
        bcrypt.hash(password, saltRounds, async (err, result) => {
            if (!err) {
                const newUser = new User({
                    username,
                    email,
                    password: result
                })
                const newUserDetails = await newUser.save();
                if (newUserDetails) {
                    //while sending userDetails in response data, first set password to null
                    newUserDetails.password = null;
                    res.status(201).json(newUserDetails);
                } else {
                    res.status(501).json({ message: "Error while signUp" })
                }
            } else {
                res.status(501).json(err);
            }
        })
    } catch (error) {
        res.status(501).json({ error });
    }
}


module.exports.SignIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDetails = await User.findOne({ email });

        if (!userDetails) {
            return res.status(200).json({ message: "User not found !" });
        }
        //compare the user's password with stored hashed password
        bcrypt.compare(password, userDetails.password, function (err, result) {
            if (!err) {
                userDetails.password = null;
                //generate the jwt token
                const token = jwt.sign({ user: userDetails }, SECRET_KEY, { expiresIn: '1h' });

                console.log("env-> devlopment mode = ", process.env.NODE_ENV);
                
                // send the token in cookies which is more secure than sending it as response data
                res.cookie('token', token, {
                    httpOnly: true, // Prevents JavaScript access to the cookie
                    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict', 
                    secure: process.env.NODE_ENV === 'production',
                    domain: "vrv-security-frontend.onrender.com"
                });
          
                res.status(200).json({ message: "Login Successfully !", data: { username: userDetails.username, role: userDetails.role } });
            } else {
                res.status(501).json(err);
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something Went Wrong !"});
    }
}

module.exports.SignOut = (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true, 
            sameSite: 'Strict' 
        });

        res.status(200).json({ message: "Logged out successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};
module.exports.GetUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong !"});
    }
}