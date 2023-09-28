const express = require("express");
const router = express.Router();
const Review = require('../models/review')
// GET ALL REVIEWS FOR TUTOR
router.get('/', async (req,res) => {
    try {
        const review = await Review.findAll()
        res.status(200).json(review)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// GET ONE
router.get('/:apointmentId', (req, res) => {
    try {
        const review = Review.find()
        res.status(200).json(review)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});
// CREATE ONE
router.post('/:appointmentId', async (req, res) => {
    const review = new Review(req.body.rating,req.body.review);
    try {
        const newReview = await review.create(req.params.appointmentId);
        res.status(201).json(newReview)
    }catch (err) {
        res.status(400).json({ message: err.message});
    }
});
// UPDATE ONE
router.patch('/:appointmentId', async(req, res) => {
    const review = new Review();
    review.rating = req.body.rating;
    review.review = req.body.review;
    try {
        const newReview = await review.update(req.params.appointmentId);
        res.status(201).json(newReview)
    }catch (err) {
        res.status(400).json({ message: err.message});
    }
});
// DELETE ONE
router.delete('/:appointmentId', (req, res) => {
    try {
        const review = Review.delete(req.params.appointmentId)
        res.status(200).json(review)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
})
module.exports = router