const express = require("express");
const router = express.Router();
const Review = require('../models/review')
const ReviewService = require('../services/reviewService')
const bodyParser = require('body-parser').json();
const CustomError = require ('../utils/customError')
//router.use(express.json())

// GET ALL REVIEWS 
router.get('/', async (req,res) => {
    try {
        const review = await ReviewService.getAll()
        res.status(200).json(review)
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});


// GET ALL REVIEWS BY USERNAME
router.get('/:id', async(req, res) => {
    try {
        const reviews = await ReviewService.getAllReviewsByUser(req.params.id)
        if (reviews === null)
            res.status(400).json({message: req.params.id + ' is not a valid id'})
        else 
            res.status(200).json(reviews)
    }catch (err) {
        res.status(500).json({ message: err.message});
    }
});


// GET ONE
// router.get('/:id', async(req, res) => {
//     (async () =>{
//         try {
//             const review = await ReviewService.getOne(req.params.id)
//             console.log("\nReview routes.get(/:id): Session: " + review)
//             if (review === false)
//                 res.status(400).json({message: "Review does not exist"})
//             else 
//                 res.status(200).json(review)
//         }catch (err){
//             res.status(500).json({ message: err.message});
//         }
//     })()
// });

// GET ONE BY STUDENT & TUTOR USERNAME 
router.get('/:studentUsername/:tutorUsername', async(req, res) => {
    (async () =>{
        try {
            const review = await ReviewService.getOne(req.params.studentUsername, req.params.tutorUsername)
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
        const review = await ReviewService.create(JSON.stringify(req.body));
        res.status(201).json(review)
    }catch (err) {
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
});

// UPDATE ONE
router.patch('/:studentUsername/:tutorUsername', bodyParser, async (req, res) => {
    try {
        console.log("Review controller patch req.body: " + JSON.stringify(req.body))
        const updatedReview = await ReviewService.update(req.params.studentUsername, req.params.studentUsername,JSON.stringify(req.body));
        res.status(201).json(updatedReview)
    }catch (err) {
        if (err instanceof CustomError)
            res.status(err.code).json({message: err.message})
        else
            res.status(500).json({ message: err.message});
    }
});

// DELETE ONE
// router.delete('/:id', (req, res) => {
//     try {
//         const deletedReview = ReviewService.deleteReview(req.params.id)
//         if (deletedReview === null) {
//             res.status(404).json({ message: "Review not found" });
//         } else {
//             res.status(200).json(deletedReview);
//         }
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

router.get('/:studentUsername/:tutorUsername', async(req, res) => {
    (async () =>{
        try {
            const review = await ReviewService.getOne(req.params.studentUsername, req.params.tutorUsername)
            if (review === false)
                res.status(400).json({message: "Review does not exist"})
            else 
                res.status(200).json(review)
        }catch (err){
            res.status(500).json({ message: err.message});
        }
    })()
});


router.delete('/:studentUsername/:tutorUsername', async(req, res) => {
    (async () =>{
        try {
            const deletedReview = await ReviewService.deleteReview(req.params.studentUsername, req.params.tutorUsername)
            if (deletedReview == null)
                res.status(400).json({message: "Review does not exist"})
            else 
                res.status(200).json(deletedReview)
        }catch (err){
            res.status(500).json({ message: err.message});
        }
    })()
});

module.exports = router