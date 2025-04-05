const express = require('express')
const User = require('../models/User.js')
const jwt = require("jsonwebtoken");


// #################################### LOGIN PAGE BACKEND LOGIC ##################################

const Login = async(req, res) => {

    try{
        const { email , password } = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error: "User not found"});
        }
        const isMatch = (password === user.password);
        if(!isMatch){
            return res.status(400).json({error: "invalid Credentials"});
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { email: user.email } });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = Login;