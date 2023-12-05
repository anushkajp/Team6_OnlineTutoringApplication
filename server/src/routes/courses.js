const express = require("express");
const router = express.Router();
// const Major = require('../models/major')
const CourseService = require('../services/courseService')
bodyParser = require('body-parser').json();

// GET ALL REVIEWS FOR TUTOR
router.get('/:majorid', async (req,res) => {
    try {
        const courses = await CourseService.getAll(req.params.majorid)
        console.log(courses)
        res.status(200).json(courses)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
module.exports = router