const express = require("express");
const router = express.Router();
const AvailabilityService = require('../services/availabilityService')
const bodyParser = require('body-parser').json();
const CustomError = require('../utils/customError')

// GET ALL AVAILABILITY FOR A TUTOR BY USERNAME
router.get('/:username', async (req, res) => {
    try {
        console.log("[ Availability service get all availability ]")
        const availability = await AvailabilityService.allAvail(req.params.username)
        // console.log(availability)
        res.status(200).json(availability)
    }catch (err){
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
});
// GET ONE AVAILABILITY BY DAY OF WEEK
router.get('/:username/:dayOfTheWeek', async(req, res) => {
    try {
        const availability = await AvailabilityService.oneAvail(req.params.username, req.params.dayOfTheWeek)
        res.status(200).json(availability)
    }catch (err){
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
});
// CREATE NEW AVAILABILITY BY DAY OF THE WEEK
router.post('/:username/:dayOfTheWeek', bodyParser, async(req, res) => {
    try {
        const newavailability = await AvailabilityService.updateAvail(req.params.username, req.params.dayOfTheWeek, JSON.stringify(req.body));
        res.status(201).json(newavailability)
    }catch (err) {
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
});
// DELETE ALL TIME BLOCKS FOR DAY OF THE WEEK
router.delete('/:username/:dayOfTheWeek', (req, res) => {
    try {
        AvailabilityService.deleteAvail(req.params.username, req.params.dayOfTheWeek)
        res.status(200).json("Deleted successfully")
    }catch (err){
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
})
////////////////////////////////////////////////////////////////////////////////
// EXCEPTIONS TO AVAILABILITY
///////////////////////////////////////////////////////////////////////////////


module.exports = router