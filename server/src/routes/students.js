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
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
});
// GET ONE
router.get('/:id', async(req, res) => {
    try {
        const student = await StudentService.getOne(req.params.id)
        console.log("\nStudent routes.get(/:id): Student: " + student)
            res.status(200).json(student)
    }catch (err){
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
});
// CREATE ONE
router.post('/', bodyParser, async(req, res) => {
    try {
        console.log("Student controller post req.body: " + JSON.stringify(req.body))
        const student = await StudentService.create(JSON.stringify(req.body));
        res.status(201).json(student)
    }catch (err) {
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
        const newStudent = await StudentService.update(req.params.id, JSON.stringify(req.body));
        res.status(201).json(newStudent)
    }catch (err) {
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
});
// DELETE ONE
router.delete('/:id', async(req, res) => {
    (async () => {
        try {
            const student = await StudentService.delete(req.params.id)
            console.log("\nStudent routes.get(/:id): Student: " + student)
            res.status(200).json(student)
        }catch (err){
            if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
        }
    })()
});
module.exports = router