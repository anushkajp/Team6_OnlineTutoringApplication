const express = require("express");
const router = express.Router();
const Student = require('../models/student')
const StudentService = require('../services/studentService')
// GET ALL
router.get('/', async (req, res) => {
    try {
        const student = await StudentService.getAll()
        console.log("Student router getAll = " + JSON.stringify(student, null))
        res.status(200).json(student)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// GET ONE
router.get('/:id', async(req, res) => {
    try {
        const student = new Student('Diana', 'Le', null, '12345', 'deedee',
        [],'1234566789','gmai.com','cs','hello there', null,null)
        // const student = await Student.find(req.params.id)
        res.status(200).json(student)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// CREATE ONE
router.post('/', async(req, res) => {
    const student = new Student();
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.middleName = req.body.middleName;
    student.password = req.body.password;
    student.userId = req.body.userId;
    student.courses = req.body.courses;
    student.phone = req.body.phone;
    student.email = req.body.email;
    student.major = req.body.major;
    student.longBio = req.body.longBio;
    student.shortBio = req.body.shortBio;
    try {
        const newStudent = await StudentService.create(req.params.appointmentId);
        res.status(201).json(newStudent)
    }catch (err) {
        res.status(400).json({ message: err.message});
    }
});
// UPDATE ONE
router.patch('/:id', async (req, res) => {
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