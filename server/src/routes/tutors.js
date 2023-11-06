const express = require("express");
const router = express.Router();
const TutorService = require('../services/tutorService')
const bodyParser = require('body-parser').json();
const CustomError = require ('../utils/customError')
// GET ALL
router.get('/', async (req, res) => {
    try {
        const tutor = await TutorService.getAll()
        res.status(200).json(tutor)
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
        const tutor = await TutorService.getOne(req.params.id)
        res.status(200).json(tutor)
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
        const newTutor = await TutorService.create(JSON.stringify(req.body));
        res.status(201).json(newTutor)
    }catch (err) {
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
});
// TUTOR CREATE NEW APPOINTMENT
// router.post('/:id/appointments', bodyParser, async(req, res) => {

//     try {
//         console.log("\n[ Tutor routes get all appointments ]")
//         const appointment = await TutorService.createAppointment(req.params.id, JSON.stringify(req.body))
//         res.status(200).json(appointment)
//     }catch (err) {
//         if (err instanceof CustomError)
//             res.status(err.code).json({message: err.message})
//         else
//             res.status(500).json({ message: err.message});
//     }
// });
// UPDATE ONE
router.patch('/:id', bodyParser, async (req, res) => {
    try {
        const newTutor = await TutorService.update(tutor);
        res.status(201).json(newTutor)
    }catch (err) {
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
});
// DELETE ONE
router.delete('/:id', (req, res) => {
    try {
        const tutor = TutorService.delete(req.params.id)
        res.status(200).json(tutor)
    }catch (err){
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
})
module.exports = router