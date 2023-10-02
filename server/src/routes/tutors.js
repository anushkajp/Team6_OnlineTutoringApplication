const express = require("express");
const router = express.Router();
const Tutor = require('../models/tutor')

// GET ALL
router.get('/', async (req, res) => {
    try {
        const tutor = await Tutor.findAll()
        res.status(200).json(tutor)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// GET ONE
router.get('/:id', async(req, res) => {
    try {
        const tutor = await Tutor.find(req.params.id)
        res.status(200).json(tutor)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// CREATE ONE
router.post('/', async(req, res) => {
    // const tutor = new Tutor(req.body.firstName, req.body.lastName, req.body.middleName,
    // req.body.password, req.body.userId, req.body.courses, req.body.phone,
    // req.body.email, req.body.major, req.body.longBio, req.body.shortBio)
    const tutor = new Tutor("diana","le",null,null,31202,["hello","goodbye"],"9728061133","diana.@gmail.com",
    "cs","longbio","shortbio",4.15,null,null)
    try {
        //const newTutor = await Tutor.create(req.params.appointmentId);
        res.status(201).json(tutor)
    }catch (err) {
        res.status(400).json({ message: err.message});
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
        const newTutor = await tutor.create(req.params.id);
        res.status(201).json(newTutor)
    }catch (err) {
        res.status(400).json({ message: err.message});
    }
});
// DELETE ONE
router.delete('/:id', (req, res) => {
    try {
        const tutor = Tutor.delete(req.params.id)
        res.status(200).json(tutor)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
})
module.exports = router