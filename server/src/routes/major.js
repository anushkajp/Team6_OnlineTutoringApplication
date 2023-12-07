const express = require("express");
const router = express.Router();
// const Major = require('../models/major')
const MajorService = require('../services/majorService')
bodyParser = require('body-parser').json();

// GET ALL REVIEWS FOR TUTOR
router.get('/', async (req,res) => {
    try {
        const major = await MajorService.getAll()
        console.log(major)
        res.status(200).json(major)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
module.exports = router