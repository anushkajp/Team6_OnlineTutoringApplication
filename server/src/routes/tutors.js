const express = require("express");
const router = express.Router();
const Tutor = require('../models/tutor')

// GET ALL
router.get('/', async (req, res) => {
    try {
        const tutor = await Tutor.find();
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});
// GET ONE
router.get('/:id', (req, res) => {
    return res.send(
        'GET HTTP method on tutors/${req.params.id} resource',
    );
});
// CREATE ONE
router.post('/', (req, res) => {
    return res.send('POST HTTP method on new tutors')
});
// UPDATE ONE
router.patch('/:id', (req, res) => {
    return res.send(
        'PATCH HTTP method on tutors/${req.params.id} resource',
    );
});
// DELETE ONE
router.delete('/:id', (req, res) => {
    return res.send(
        'DELETE HTTP method on tutors/${req.params.id} resource',
    );
})
module.exports = router