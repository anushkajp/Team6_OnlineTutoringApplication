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
const {addReview} = require('../db/obAdd')
const adds = require ('../db/obAdd')

const { updateAppReview, updateRating, updateAppUserId} = require ('../db/update')

class ReviewService {
      // GET ALL

    static async getAll() {
        try {          
            const reviews = await getReviews();
            
            // Transform the data structure and filter unnecessary information
            const  transformedReviews = Object.entries(reviews).map(([id, review]) => {
                const { tutorId, studentId, rating,description } = review;

                const tutorUsername = review.tutorId
                const studentUsername = review.studentId
    
                const userTutor = searchItem('User', 'username', tutorUsername)
                const userStudent = searchItem('User', 'username', studentUsername)
    
                return {
                    id,
                    studentId: userStudent,
                    tutorId: userTutor,
                    description,
                    rating,
                    
                };
            });
    
            console.log("ReviewService.getAll() = " + JSON.stringify(transformedReviews) + "\n");
            return transformedReviews;
        } catch (err) {
            throw err;
        }
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

        console.log("\n[ ReviewService.create ]\n")
        const data = JSON.parse(reviewData)

        const tutorUsername = data.tutorId
        const studentUsername = data.studentId

        const userTutor = await searchItem('User', 'username', tutorUsername)
        const userStudent = await searchItem('User', 'username', studentUsername)

        const tutoruserid = Object.keys(userTutor)[0]
        const studentuserid = Object.keys(userStudent)[0]
        
        
        let review = new Review()
        review.tutorId = tutoruserid;
        review.studentId = studentuserid;

        const propertyMap = Review.toObj();

        // Loop through the data object and set the corresponding properties
        for (const key in propertyMap) {
            console.log(key)
            if (data.hasOwnProperty(key)) {
               review[key] = data[key];
            }
        }
        // // LOOP THROUGH OBJ, ANY UNDEFINED REPLACE WITH NULL
        for (const key in review) {
            if (review[key] === undefined)
                review[key] = null
        }
            
        // ADD NEW STUDENT TO DB
        console.log(review)
        const reviewInfo = await adds.addReview(review)
        console.log("ReviewInfo " + reviewInfo)
        return reviewInfo
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