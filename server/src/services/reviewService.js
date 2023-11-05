const express = require("express");
const router = express.Router();
const Review = require("../models/review")
const {getReview} = require ('../db/read')
class ReviewService {
    static getAll(id) {
        try {
            const tutor = new Tutor();
            tutor = getTutor(id)
            const review = new Review()
            review = tutor.review
            return review
        } catch (err) {
            return err
        }
    }
    static getOne(id) {
        try {
            const review = getReview(id)
        }catch (err){
            return err
        }
    }
    static create() {

    }
    static update() {

    }
    static delete() {

    }
}
module.exports = ReviewService

