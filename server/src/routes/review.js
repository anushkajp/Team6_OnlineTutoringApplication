const express = require("express");
const router = express.Router();
// GET ALL REVIEWS FOR TUTOR
router.get('/:tutorId', (req,res) => {
    return res.send(
        'GET HTTP method on session/review/${req.params.tutorId} resource',
    );
});
// GET ONE
router.get('/:apointmentId', (req, res) => {
    return res.send(
        'GET HTTP method on session/review/${req.params.apointmentId} resource',
    );
});
// CREATE ONE
router.post('/:appointmentId', (req, res) => {
    return res.send('POST HTTP method on session/review/${req.params.apointmentId} review')
});
// UPDATE ONE
router.patch('/:appointmentId', (req, res) => {
    return res.send(
        'PATCH HTTP method on session/review/${req.params.appointmentId} resource',
    );
});
// DELETE ONE
router.delete('/:appointmentId', (req, res) => {
    return res.send(
        'DELETE HTTP method on session/review/${req.params.appointmentId} resource',
    );
})
module.exports = router