const express = require("express");
const router = express.Router();

// GET ALL
router.get('/', (req, res) => {
    return res.send('GET HTTP method on all studentss')
});
// GET ONE
router.get('/:id', (req, res) => {
    return res.send(
        'GET HTTP method on students/${req.params.id} resource',
    );
});
// CREATE ONE
router.post('/', (req, res) => {
    return res.send('POST HTTP method on new students')
});
// UPDATE ONE
router.patch('/:id', (req, res) => {
    return res.send(
        'PATCH HTTP method on students/${req.params.id} resource',
    );
});
// DELETE ONE
router.delete('/:id', (req, res) => {
    return res.send(
        'DELETE HTTP method on students/${req.params.id} resource',
    );
})
module.exports = router