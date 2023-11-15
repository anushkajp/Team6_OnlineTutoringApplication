const express = require("express");
const router = express.Router();
const Review = require('../models/review')
const ReviewService = require('../services/reviewService')
const bodyParser = require('body-parser').json();
const CustomError = require ('../utils/customError')

// GET ALL REVIEWS FOR TUTOR
router.get('/', async (req,res) => {
    try {
        const review = await ReviewService.getAll()
        res.status(200).json(review)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// GET ONE
router.get('/:id', async(req, res) => {
    (async () =>{
        try {
            const review = await ReviewService.getOne(req.params.id)
            console.log("\nReview routes.get(/:id): Session: " + review)
            if (review === false)
                res.status(400).json({message: "Review does not exist"})
            else 
                res.status(200).json(review)
        }catch (err){
            res.status(500).json({ message: err.message});
        }
    })()
});

// CREATE ONE
router.post('/', bodyParser, async(req, res) => {
    try {
        console.log("test1")
        const review = await ReviewService.create(JSON.stringify(req.body));
        console.log("test2")
        res.status(201).json(review)
    }catch (err) {
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
});


// UPDATE ONE
router.patch('/:reviewId', async(req, res) => {
    const review = new Review();
    review.rating = req.body.rating;
    review.review = req.body.review;
    try {
        const newReview = await ReviewService.update(req.params.appointmentId);
        res.status(201).json(newReview)
    }catch (err) {
        res.status(400).json({ message: err.message});
    }
});

// DELETE ONE
router.delete('/:id', (req, res) => {
    try {
        const deletedReview = ReviewService.deleteReview(req.params.id)
        if (deletedReview === null) {
            res.status(404).json({ message: "Review not found" });
        } else {
            res.status(200).json(deletedReview);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router