const express = require("express");
const router = express.Router();
const Review = require("../models/review")
const {getReview} = require ('../db/read')
const {searchItem} = require ('../db/db')
const read = require("../db/read")
const deletes=require("../db/delete")
class ReviewService {
      // GET ALL
      static async getAll() {
            console.log("\n[ ReviewService.getAll ]\n");
            const reviews = await read.getReviews();
            return reviews;
    }

    // GET ONE REVIEW BY ID 
    static async getOne(reviewId) {
        console.log("\n[ ReviewService.getone ]\n")

        // SEARCH FOR REVIEW 
        const review = await read.getReview(reviewId)
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
    //DELETE A REVIEW
    static async delete(reviewId) {
        try {
            const reviewDelete = await deleteReview(reviewId);
            console.log("ReviewService.delAppointment() = " + JSON.stringify(reviewDelete) + "\n")
                if (reviewDelete === null) {
                    return null;
                }else {
                    return reviewDelete;
                }
            }catch (error) {
                    throw new CustomError("Error deleting the review: ", 400)
            }
    }
}
module.exports = ReviewService