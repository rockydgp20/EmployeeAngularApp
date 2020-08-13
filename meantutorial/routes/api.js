const express = require('express');
const router = express.Router();
const User = require('../app/models/user')


router.get('/', async (req,res) => {
    try {
       const subscriber = await User.find(); 
       res.status(200).json(subscriber)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
});

router.post('/users', (req,res) => {
    var userdetails = new User();
    userdetails.username = req.body.username;
    userdetails.password = req.body.password;
    userdetails.email = req.body.email;
    userdetails.save();
    res.send('User Created Successfully !!!');
})
module.exports = router