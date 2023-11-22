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
router.delete('/:username/:dayOfTheWeek', async (req, res) => {
    try {
        await AvailabilityService.deleteAvail(req.params.username, req.params.dayOfTheWeek)
        res.status(200).json("Deleted Successfully")
    }catch (err){
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
})
////////////////////////////////////////////////////////////////////////////////
// EXCEPTIONS TO AVAILABILITY
////////////////////////////////////////////////////////////////////////////////

// GET ALL EXCEPTIONS TO AVAILABILITY
router.get('/:username/exceptions', async (req, res) => {
    try {
        console.log("[ Availability service get all exceptions ]")
        const exceptions = await AvailabilityService.allExcept(req.params.username)
        res.status(200).json(exceptions)
    }catch (err){
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
});
router.post('/:username/exceptions/:date', async (req, res) => {
    try {
        console.log("[ Availability service get all exceptions ]")
        await AvailabilityService.addException(req.params.username, req.params.date)
        res.status(201).json({message: "Created"})
    }catch (err){
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
});
router.delete('/:username/exceptions/:date', async (req, res) => {
    try {
        console.log("[ Availability service get all exceptions ]")
        await AvailabilityService.deleteExcept(req.params.username, req.params.date)
        res.status(200).json("Deleted Successfully")
    }catch (err){
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
});
module.exports = router