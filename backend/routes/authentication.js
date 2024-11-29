const express = require('express');
const authentication = require('../controller/authentication');
const router = express.Router();
const { isAuth } = require('../middleware/isAuth');
const checkRoles = require('../middleware/roleCheck');

router.post("/sign-up",authentication.SignUp);
router.post("/sign-in",authentication.SignIn);
router.get("/sign-out",authentication.SignOut);
router.get("/get-user",isAuth, checkRoles('admin'), authentication.GetUser);

module.exports = router;