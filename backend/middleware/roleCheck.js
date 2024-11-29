//here we are using a higher order function which takes rest parameter
//to check the requested route is permitted to user who is requesting for

const checkRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Denied !"});
        }
        next();
    }
}

module.exports = checkRoles;