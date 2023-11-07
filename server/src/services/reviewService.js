const express = require("express");
const router = express.Router();
const Review = require("../models/review")
const {getReview} = require ('../db/read')
const {searchItem} = require ('../db/db')
const read = require("../db/read")

class ReviewService {
      // GET ALL
      static async getAll() {
            console.log("\n[ ReviewService.getAll ]\n");
            const reviews = await read.getReviews();
            return reviews;
    }

    // GET ONE REVIEW BY ID 
    static async getOne(id) {
        console.log("\n[ ReviewService.getone ]\n")

        // SEARCH FOR REVIEW 
        const review = await read.getReview(id)
        console.log(await search)

        // REVIEW FOUND
        if (Object.keys(search).length > 0) {
            return search
        }
        // REVIEW NOT FOUND
        else{
            throw new CustomError("Review not found", 400)
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