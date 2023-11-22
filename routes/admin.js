const express = require('express');
const router =express.Router();

const {signin}  = require('../controllers/adminauth');

//CREATE A USER

// router.post("/signup", signup )

//SIGN IN
router.post("/signin", signin)

module.exports = router