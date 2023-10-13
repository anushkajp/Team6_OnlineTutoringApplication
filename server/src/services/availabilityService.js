const express = require("express");
const router = express.Router();
const Availability = require("../models/availability")
const {getTutorAvailability} = require ('../db/read')

class AvailabilityService{
    static getAll() {
        try {
            const availability = new Availability();
            availability = getTutorAvailability(id)
            return availability
        } catch (err) {
            return err
        }
    }
    static getOne(id) {

    }
    static create() {

    }
    static update() {

    }
    static delete() {

    }

}
module.exports = AvailabilityService