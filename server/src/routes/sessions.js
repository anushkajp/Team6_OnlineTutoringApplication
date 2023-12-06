const express = require("express");
const router = express.Router();
const Session = require('../models/session')
const SessionService = require('../services/sessionService')
bodyParser = require('body-parser').json();
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
router.get('/:id', async(req, res) => {
    try {
        const session = await SessionService.getOne(req.params.id)
        res.status(200).json(session)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// GET ALL APPOINTMENTS BY USER ID
router.get('/:user/:id', async(req, res) => {
    try {
        console.log("\n[ Session routes get all appointments ]")
        let appointments = new Session()
        if (req.params.user === 'tutor')
            appointments = await SessionService.getByUser(req.params.id, 'tutorId')
        else if (req.params.user === 'student')
            appointments = await SessionService.getByUser(req.params.id, 'tutorId')
        if (appointments === null)
            res.status(400).json({message: req.params.id + ' is not a valid id'})
        else 
            res.status(200).json(appointments)
    }catch (err) {
        res.status(500).json({ message: err.message});
    }
});
// // CREATE ALL APPOINTMENTS ASSOCIATED WITH STUDENT
// router.get('/student/:id', async(req, res) => {
//     try {
//         console.log("\n[ Session routes get all appointments ]")
//         const appointments = await SessionService.getByUser(req.params.id, 'studentId')
//         if (appointments === null)
//             res.status(400).json({message: req.params.id + ' is not a valid id'})
//         else 
//             res.status(200).json(appointments)
//     }catch (err) {
//         res.status(500).json({ message: err.message});
//     }
// });
// CREATE ONE
router.post('/', bodyParser, async(req, res) => {
    try {
        const newsession = await SessionService.create(JSON.stringify(req.body));
        if (newsession === false) {
            res.status(401).json({ message: "Failed to create new appointment"})
        }
        else
            res.status(201).json(newsession)
    }catch (err) {
        res.status(400).json({ message: err.message});
    }
});
// UPDATE ONE
router.patch('/:id', async (req, res) => {
    const session = new Session();
    const review = new Review();
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
router.delete('/:id', (req, res) => {
    try {
        const session = SessionService.delete(req.params.id)
        res.status(200).json(session)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
})
module.exports = router