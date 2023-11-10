const express = require("express");
const router = express.Router();
const Review = require("../models/review")
const {getReview, getReviews} = require ('../db/read')
const {searchItem} = require ('../db/db')
const read = require("../db/read")
const {deleteReview} = require("../db/delete")
const CustomError = require ('../utils/customError')
const USER = 'User'
const USERNAME = 'username'
const { updateAppReview, updateRating, updateAppUserId} = require ('../db/update');
const { addReview } = require("../db/add");

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
           
            const studentIdResult = await searchItem(USER, USERNAME, data.studentId)
            const tutorIdResult = await searchItem(USER, USERNAME, data.tutorId)
            let newReview = new Review()
            const propertyMap = Review.toObj();
            // Loop through the data object and set the corresponding properties
            for (const key in propertyMap) {
                if (data.hasOwnProperty(key)) {
                    newReview[key] = data[key];
                }
            }
            newReview.studentId = studentIdResult
            newReview.tutorId = tutorIdResult
            // LOOP THROUGH OBJ, ANY UNDEFINED REPLACCE WITH NULL
            for (const key in newReview) {
                if (newReview[key] === undefined)
                newReview[key] = null
            }              

            // ADD NEW REVIEW TO DB
            console.log(newReview)
            const reviewInfo = await addReview(newReview)
            console.log("ReviewInfo " + reviewInfo)
            return reviewInfo
        }catch (e) {
            throw new CustomError("Error creating review", 400)
        }
    }
    
    static async update(reviewID, newReviewData) {
        try {
            console.log("\nReviewService.update\n")
            const data = JSON.parse(newReviewData)
            console.log("\nData has been parsed\n")
    
            const username = data.studentId
            const result = await searchItem(USER, USERNAME, username) 
    
            // USER IS FOUND, NOT NECESSARILY A STUDENT
            if (Object.keys(result).length > 0) {
                // GET STUDENT BASED ON USERID
                const student = await read.getStudent(Object.keys(result)[0])
                console.log(student.userId)
                console.log(typeof student.userId)
                // USER IS A TUTOR
                if (student.userId === undefined) {
                    throw new CustomError("User is not a student", 400)
                }
            }
            else{
                throw new CustomError("User not found", 400)
            }


            const patchStudentId = Object.keys(result)[0]
            console.log("Updated Student id: " + patchStudentId + "\n")

            if (data.rating != null)
                await updateRating(reviewID, data.rating);
            if (data.description != null)
                await updateAppReview(reviewID, data.description);      
            if (data.studentId != null)
            await updateAppUserId(reviewID, patchStudentId)        
            
            return await getReview(reviewID);
    
        }catch{
            throw new CustomError("Error updating review", 400)
        }

    }
    //DELETE A REVIEW
    static async delete(reviewId) {
        try {
            const reviewDelete = await deleteReview(reviewId);
            console.log("ReviewService.delReview() = " + JSON.stringify(reviewDelete) + "\n")
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