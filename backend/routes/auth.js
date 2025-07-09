const express = require('express');
const User = require('../models/User');
const router = express.Router();


//Create a user using POST : Doesn' t need Auth
router.post("/",(req,res)=>{
    console.log(req.body);
    const user = new User(req.body);
    user.save();
    res.send("User created");
})

module.exports = router;