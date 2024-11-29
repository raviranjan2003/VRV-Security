const express = require('express');
const router = express.Router();

router.use("/auth",require('./authentication'));
router.use("/users",require('./userRoutes'));

module.exports = router;