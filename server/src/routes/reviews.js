const express = require("express");
const router = express.Router();
const Review = require('../models/review')
const ReviewService = require('../services/reviewService')
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
router.get('/:reviewId', (req, res) => {
    try {
        const review = ReviewService.getOne(req.body.appointmentId)
        res.status(200).json(review)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// CREATE ONE
router.post('/:reviewId', async (req, res) => {
    const review = new Review(req.body.rating,req.body.review);
    try {
        const newReview = await ReviewService.create(req.params.appointmentId);
        res.status(201).json(newReview)
    }catch (err) {
        res.status(400).json({ message: err.message});
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
router.delete('/:reviewId', (req, res) => {
    try {
        const review = ReviewService.delete(req.params.appointmentId)
        res.status(200).json(review)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
})
module.exports = router