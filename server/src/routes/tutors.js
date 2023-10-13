const express = require("express");
const router = express.Router();
const Tutor = require('../models/tutor')
const TutorService = require('../services/tutorService')

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
// CREATE ONE
router.post('/', async(req, res) => {

    const tutor = new Tutor()
    tutor.firstName = req.body.firstName;
    tutor.lastName = req.body.lastName;
    tutor.middleName = req.body.middleName;
    tutor.password = req.body.password;
    tutor.userId = req.body.userId;
    tutor.courses = req.body.courses;
    tutor.phone = req.body.phone;
    tutor.email = req.body.email;
    tutor.major = req.body.major;
    tutor.longBio = req.body.longBio;
    tutor.shortBio = req.body.shortBio;
    tutor.pfp = req.body.pfp;

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
// UPDATE ONE
router.patch('/:id', async (req, res) => {
    const tutor = new Tutor();
    tutor.firstName = req.body.firstName;
    tutor.lastName = req.body.lastName;
    tutor.middleName = req.body.middleName;
    tutor.password = req.body.password;
    tutor.userId = req.body.userId;
    tutor.courses = req.body.courses;
    tutor.phone = req.body.phone;
    tutor.email = req.body.email;
    tutor.major = req.body.major;
    tutor.longBio = req.body.longBio;
    tutor.shortBio = req.body.shortBio;
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