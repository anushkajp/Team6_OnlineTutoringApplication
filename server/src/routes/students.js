const express = require("express");
const router = express.Router();
const StudentService = require('../services/studentService')
const bodyParser = require('body-parser').json();
const CustomError = require('../utils/customError')
// GET ALL
router.get('/', async (req, res) => {
    try {
        const student = await StudentService.getAll()
        res.status(200).json(student)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// GET ONE
router.get('/:id', async(req, res) => {
    (async () => {
        try {
            const student = await StudentService.getOne(req.params.id)
            console.log("\nStudent routes.get(/:id): Student: " + student)
            if (student === false)
                res.status(400).json({message: "User does not exist"})
            else 
                res.status(200).json(student)
        }catch (err){
            if (err instanceof CustomError)
            res.status(500).json({ message: err.message});
        }
    })()
});
// GET ALL APPOINTMENTS
router.get('/:id/appointments', async(req,res) => {
    try {
        console.log("\n[ Student routes get all appointments ]")
        const appointments = StudentService.getAppointments(req.params.id)
        if (appointments === null)
            res.status(400).json({message: req.params.id + ' is not a valid id'})
        else 
            res.status(200).json(appointments)
    }catch (err) {
        res.status(500).json({ message: err.message});
    }
});
// CREATE ONE
router.post('/', bodyParser, async(req, res) => {
    try {
        console.log("Student controller post req.body: " + JSON.stringify(req.body))
        const newStudent = await StudentService.create(JSON.stringify(req.body));
        res.status(201).json(newStudent)
    }catch (err) {
        console.log("err instance of CustomError?")
        console.log(err instanceof CustomError)
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
});
// UPDATE ONE
router.patch('/:id', bodyParser, async (req, res) => {
    try {
        console.log("Student controller patch req.body: " + JSON.stringify(req.body))
        const newStudent = await StudentService.update(req.params.id,JSON.stringify(req.body));
        if (newStudent == false)
            res.status(404).json({message: "User not found"})
        else
            res.status(201).json(newStudent)
    }catch (err) {
        res.status(500).json({ message: err.message});
    }
});
// DELETE ONE
router.delete('/:id', async(req, res) => {
    (async () => {
        try {
            const student = await StudentService.delete(req.params.id)
            console.log("\nStudent routes.get(/:id): Student: " + student)
            if (student === false)
                res.status(404).json({message: "User not found"})
            else 
                res.status(200).json(student)
        }catch (err){
            res.status(500).json({ message: err.message});
        }
    })()
});
module.exports = router