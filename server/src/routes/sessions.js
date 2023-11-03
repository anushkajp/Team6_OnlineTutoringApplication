const express = require("express");
const router = express.Router();
const SessionService = require('../services/sessionService')
const bodyParser = require('body-parser').json();
const CustomError = require('../utils/customError')
// GET ALL
router.get('/', (req, res) => {
    try {
        const session = SessionService.getAll()
        res.status(200).json(session)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// GET ONE
//how do we get the id of the session from firebase?
router.get('/:id', async(req, res) => {
    try {
        const session = await SessionService.getOne(req.params.id)
        res.status(200).json(session)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// GET ALL APPOINTMENTS BY USER ID
router.get('/:user/:username', async(req, res) => {
    try {
        console.log("\n[ Session routes get all appointments ]")
        let appointments = null;
        if (req.params.user === 'tutor')
            appointments = await SessionService.getByUser(req.params.username, 'tutor username')
        else if (req.params.user === 'student')
            appointments = await SessionService.getByUser(req.params.username, 'student username')
        await searchItem('User', 'username', bibi4eva)
        if (appointments === null)
            res.status(400).json({message: req.params.id + ' is not a valid id'})
        else 
            res.status(200).json(appointments)
    }catch (err){
        if (err instanceof CustomError)
        res.status(500).json({ message: err.message});
    }
});
//CREATE ONE SESSION

// UPDATE ONE
router.patch('/:user/:username', async (req, res) => {
    const session = new Session();
    review.rating = req.body.rating;
    review.review = req.body.review;
    session.tutorId = req.body.tutorId;
    session.studentId = req.body.studentId;
    session.date = req.body.date;
    session.time = req.body.time;
    session.length = req.body.length;
    session.online = req.body.online;
    session.location = req.body.location;
    session.notes = req.body.notes;
    session.review = review;
    try {
        const newsession = await SessionService.create(req.params.id);
        res.status(201).json(newsession)
    }catch (err) {
        res.status(400).json({ message: err.message});
    }
});
// DELETE ONE
//how do we get id?

module.exports = router