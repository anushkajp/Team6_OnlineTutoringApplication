const express = require("express");
const router = express.Router();
const Session = require('../models/session')
const SessionService = require('../services/sessionService')
bodyParser = require('body-parser').json();

// GET ALL
router.get('/', async (req, res) => {
    try {
        const session = await SessionService.getAll()
        res.status(200).json(session)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});

// GET ONE
router.get('/:id', async(req, res) => {
    (async () =>{
        try {
            const session = await SessionService.getOne(req.params.id)
            console.log("\nSession routes.get(/:id): Session: " + session)
            if (session === false)
                res.status(400).json({message: "Session does not exist"})
            else 
                res.status(200).json(session)
        }catch (err){
            res.status(500).json({ message: err.message});
        }
    })()
});

/*
// GET ALL APPOINTMENTS BY USER ID
router.get('/:user/:id', async(req, res) => {
    try {
        console.log("\n[ Session routes get all appointments ]")
        let appointments = new Session()
        if (req.params.user === 'tutor')
            appointments = await SessionService.getAllAppointmentsByUser(req.params.id, 'tutorId')
        else if (req.params.user === 'student')
            appointments = await SessionService.getAllAppointmentsByUser(req.params.id, 'studentId')
        if (appointments === null)
            res.status(400).json({message: req.params.id + ' is not a valid id'})
        else 
            res.status(200).json(appointments)
    }catch (err) {
        res.status(500).json({ message: err.message});
    }
});
*/

// CREATE ONE
router.post('/', bodyParser, async(req, res) => {
    try {
        const newsession = await SessionService.createAppointment(JSON.stringify(req.body));
        if (newsession === false) {
            res.status(401).json({ message: "Failed to create new appointment"})
        }
        else
            res.status(201).json(newsession)
    }catch (err) {
        res.status(400).json({ message: err.message});
    }
});

/*
// UPDATE ONE
router.patch('/:id', async (req, res) => {

    try {
        console.log("Session controller patch req.body: " + JSON.stringify(req.body))
        const updatedAppointment = await SessionService.updateAppointment(req.params.id,JSON.stringify(req.body));
        if (updatedAppointment == false)
            res.status(404).json({message: "Appointment not found"})
        else
            res.status(201).json(updatedAppointment)
    }catch (err) {
        res.status(500).json({ message: err.message});
    }
});
*/

// DELETE ONE
router.delete('/:id', (req, res) => {
    try {
        const deletedAppt = SessionService.delAppointment(req.params.id)
        if (deletedAppt === null) {
            res.status(404).json({ message: "Appointment not found" });
        } else {
            res.status(200).json(deletedAppt);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router