const express = require("express");
const router = express.Router();
const SessionService = require('../services/sessionService')
const bodyParser = require('body-parser').json();
const CustomError = require('../utils/customError')
// GET ALL
router.get('/', async (req, res) => {
    try {
        const student = await SessionService.getAll()
        res.status(200).json(student)
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

//CREATE ONE SESSION
router.post('/', bodyParser, async(req, res) => {
    try {
        console.log("Session controller post req.body: " + JSON.stringify(req.body))
        const newSession = await SessionService.create(JSON.stringify(req.body));
        if (newSession === false) {
            res.status(401).json({ message: "Failed to create new appointment"})
        }
        else
            res.status(201).json(newsession)
    }catch (err) {
        res.status(400).json({ message: err.message});
    }
});

router.post('/', bodyParser, async(req, res) => {
    try {
        console.log("Session controller post req.body: " + JSON.stringify(req.body))
        const newSession = await SessionService.create(JSON.stringify(req.body));
        res.status(201).json(newSession)
    }catch (err) {
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
});
module.exports = router