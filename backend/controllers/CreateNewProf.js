const express = require('express')
const User = require('../models/User.js')

CreateNewProfessor = async(req, res) => {

    try{
        const {email, password} = req.body;
        const existingProfessor = await User.findOne({email})

        const newProfessor = await User({email, password})
        await newProfessor.save()
        res.status(201).json({ message: "User registered successfully" });
    }
    catch(error){
        res.status(500).json({ error: "User already Exists" });
    }
}

module.exports = CreateNewProfessor;