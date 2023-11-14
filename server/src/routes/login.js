const express = require("express");
const router = express.Router();
const LoginService = require('../services/loginService')
const bodyParser = require('body-parser').json();
const CustomError = require('../utils/customError')

router.post('/', bodyParser, async(req, res) => {
    try {
        const user = await LoginService.login(JSON.stringify(req.body))
        res.status(200).json({message: user})
    }catch (err) {
        if (err instanceof CustomError)
            res.status(err.code).json({user: err.message})
        else
            res.status(500).json({ message: err.message});
    }
});
module.exports = router