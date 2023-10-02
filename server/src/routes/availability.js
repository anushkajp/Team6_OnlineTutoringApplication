const express = require("express");
const router = express.Router();
const Availability = require('../models/availability')
const Service = require('../service/service')
// GET ALL
router.get('/', (req, res) => {
    try {
        const availability = Availability.findAll()
        res.status(200).json(availability)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// GET ONE
router.get('/:id', async(req, res) => {
    try {
        const availability = new Availability(["none",""], [])
        // const availability = await availability.find(req.params.id)
        res.status(200).json(availability)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// CREATE ONE
router.post('/', async(req, res) => {
    const availability = new availability({
        week: req.params.week,
        exceptions: req.params.exceptions
    })
    try {
        const newavailability = await availability.create(req.params.id);
        res.status(201).json(availability)
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
        const newavailability = await availability.create(req.params.id);
        res.status(201).json(newavailability)
    }catch (err) {
        res.status(400).json({ message: err.message});
    }
});
// DELETE ONE
router.delete('/:id', (req, res) => {
    try {
        const availability = availability.delete(req.params.id)
        res.status(200).json(availability)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
})
module.exports = router