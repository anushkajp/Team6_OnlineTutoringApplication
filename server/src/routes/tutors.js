const express = require("express");
const router = express.Router();
const TutorService = require('../services/tutorService')
bodyParser = require('body-parser').json();
// GET ALL
router.get('/', async (req, res) => {
    try {
        const tutor = await TutorService.getAll()
        if (tutor == null)
            res.status(400).json({message: req.params.id + ' is not a valid id'})
        else 
            res.status(200).json(tutor)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// GET ONE
router.get('/:id', async(req, res) => {
    try {
        const tutor = await TutorService.getOne(req.params.id)
        if (tutor == null)
            res.status(400).json({message: req.params.id + ' is not a valid id'})
        else 
            res.status(200).json(tutor)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});

// router.get('/:id/availability', async(req,res) => {
//     try {
//         const availability = TutorService.getAvailability(req.params.id)
//         if (availability == null)
//             res.status(400).json({message: req.params.id + ' is not a valid id'})
//         else 
//             res.status(200).json(availability)
//     }catch (err) {
//         res.status(500).json({ message: err.message});
//     }
// });
// CREATE ONE
router.post('/', bodyParser, async(req, res) => {

    try {
        const newTutor = await TutorService.create(tutor);
        if (newTutor == null)
            res.status(400).json({message: 'Unable to create tutor object'})
        else 
            res.status(201).json(newTutor)
    }catch (err) {
        res.status(500).json({ message: err.message});
    }
});
// TUTOR CREATE NEW APPOINTMENT
router.post('/:id/appointments', bodyParser, async(req, res) => {

    try {
        console.log("\n[ Tutor routes get all appointments ]")
        const appointment = await TutorService.createAppointment(req.params.id, JSON.stringify(req.body))
        if (appointment === null)
            res.status(400).json({message: req.params.id + ' is not a valid id'})
        else 
            res.status(200).json(appointment)
    }catch (err) {
        res.status(500).json({ message: err.message});
    }
});
// UPDATE ONE
router.patch('/:id', bodyParser, async (req, res) => {
    try {
        const newTutor = await TutorService.update(tutor);
        if (newTutor == null)
            res.status(400).json({message: req.params.id + ' is not a valid id'})
        res.status(201).json(newTutor)
    }catch (err) {
        res.status(400).json({ message: err.message});
    }
});
// DELETE ONE
router.delete('/:id', (req, res) => {
    try {
        const tutor = TutorService.delete(req.params.id)
        if (tutor == null)
            res.status(400).json({message: req.params.id + ' is not a valid id'})
        res.status(200).json(tutor)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
})
module.exports = router