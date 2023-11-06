const express = require("express");
const router = express.Router();
const Review = require("../models/review")
const {getReview} = require ('../db/read')

const read = require("../db/read")

class ReviewService {
      // GET ALL
      static async getAll() {
            console.log("\n[ ReviewService.getAll ]\n");
            const reviews = await read.getReviews();
            return reviews;
    }

    // GET ONE REVIEW BY ID 
    static getOne(id) {
        

    }
    static create() {

    }
    static update() {

    }
    static delete() {

    }
}
module.exports = ReviewService