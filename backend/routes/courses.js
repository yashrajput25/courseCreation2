const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const { createCourse } = require("../controllers/createCourse");

router.post("/create", createCourse);

router.get('/all', async(req, res) => {
    try{
        const courses = await Course.find();
        res.status(200).json(courses);
    }

    catch(error){
        res.status(500).json({message: "error fetching courses"})
    }
})

module.exports = router;