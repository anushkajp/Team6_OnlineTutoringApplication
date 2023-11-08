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

    static async create(reviewData) {
        try {
            console.log("\nReviewService.create\n")
            const data = JSON.parse(reviewData)
           
            let review = new Review()
                        
            const propertyMap = {
                tutorId :  null, 
                studentId: null,
                rating: null,
                description: null
            };
    
            // Loop through the data object and set the corresponding properties
            for (const key in propertyMap) {
                if (data.hasOwnProperty(key)) {
                    review[key] = data[key];
                }
            }
            // LOOP THROUGH OBJ, ANY UNDEFINED REPLACCE WITH NULL
            for (const key in review) {
                if (review[key] === undefined)
                review[key] = null
            }              
                
            // ADD NEW REVIEW TO DB
            console.log(review)
            const reviewInfo = await addAppointment(review)
            console.log("ReviewInfo " + reviewInfo)
            return reviewInfo
        }catch (e) {
            throw new CustomError("Error creating review", 400)
        }
        
    }
    
    static async update(reviewID, newReviewData) {

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