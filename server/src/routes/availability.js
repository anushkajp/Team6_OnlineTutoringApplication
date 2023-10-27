const express = require("express");
const router = express.Router();
const Availability = require('../models/availability')
const AvailabilityService = require('../services/availabilityService')
bodyParser = require('body-parser').json();

// GET ALL
router.get('/', (req, res) => {
    try {
        const availability = AvailabilityService.getAll(req.body.id)
        if (availability == nulll)
            res.status(400).json({message: 'not a valid id'})
        else
            res.status(200).json(availability)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// GET ONE
router.get('/:id', async(req, res) => {
    try {
        //const availability = new Availability(["none",""], [])
        const availability = await AvailabilityService.getOne(req.params.id)
        if (availability == null)
            res.status(401).json({message: 'Unable to create availability for tutor'})
        else 
            res.status(200).json(availability)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// CREATE ONE
router.post('/', bodyParser, async(req, res) => {
    const availability = new availability({
        week: req.params.week,
        exceptions: req.params.exceptions
    })
    try {
        const newavailability = await AvailabilityService.create(req.params.id);
        if (tutor == null)
            res.status(401).json({message: 'Unable to create tutor object'})
        else 
            res.status(201).json(newavailability)
    }catch (err) {
        res.status(400).json({ message: err.message});
    }
});
// UPDATE ONE
router.patch('/:id', async (req, res) => {
    const availability = new availability({
        week: req.params.week,
        exceptions: req.params.exceptions
    })
    try {
        const newavailability = await AvailabilityService.update(req.params.id);
        res.status(201).json(newavailability)
    }catch (err) {
        res.status(400).json({ message: err.message});
    }
});
// DELETE ONE
router.delete('/:id', (req, res) => {
    try {
        const availability = AvailabilityService.delete(req.params.id)
        res.status(200).json(availability)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
})
module.exports = router