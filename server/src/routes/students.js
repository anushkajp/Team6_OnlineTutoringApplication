const express = require("express");
const router = express.Router();
const Student = require('../models/student')
const StudentService = require('../services/studentService')
// GET ALL
router.get('/', async (req, res) => {
    try {
        const student = await StudentService.getAll()
        console.log("Student router getAll = " + student)
        res.status(200).json(student)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// GET ONE
router.get('/:id', async(req, res) => {
    try {
        const student = await StudentService.getOne(req.params.id)
        res.status(200).json(student)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// CREATE ONE
bodyParser = require('body-parser').json();
router.post('/', bodyParser, async(req, res) => {
    try {
        console.log("Student controller post req.body: " + JSON.stringify(req.body))
        const newStudent = await StudentService.create(JSON.stringify(req.body));
        res.status(201).json(newStudent)
    }catch (err) {
        res.status(400).json({ message: err.message});
    }
});
// UPDATE ONE
router.patch('/:id', bodyParser, async (req, res) => {
    const student = new Student();
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.middleName = req.body.middleName;
    student.password = req.body.passwordl;
    student.userId = req.body.userId;
    student.courses = req.body.courses;
    student.phone = req.body.phone;
    student.email = req.body.email;
    student.major = req.body.major;
    student.longBio = req.body.longBio;
    student.shortBio = req.body.shortBio;
    try {
        const newStudent = await StudentService.update(req.params.id);
        res.status(201).json(newStudent)
    }catch (err) {
        res.status(400).json({ message: err.message});
    }
});
// DELETE ONE
router.delete('/:id', (req, res) => {
    try {
        const student = StudentService.delete(req.params.id)
        res.status(200).json(student)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
})
module.exports = router