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
            const transformedReviews = Object.entries(reviews).map(([id, review]) => {
                const { description, rating, studentId, tutorId } = review;
                const tutorUsername = data.tutorId
                const studentUsername = data.studentId
                return {
                    id,
                    studentId,
                    tutorId,
                    rating,
                    description
                };
            });
    
            console.log("ReviewService.getAll() = " + JSON.stringify(transformedReviews) + "\n");
            return transformedReviews;
        } catch (err) {
            throw err;
        }
    }
    


    // GET ONE REVIEW BY ID 
    static async getOne(id) {
        try {
            console.log("\n[ ReviewService.getOne ]\n")
            const review = await getReview(id)
            // REVIEW FOUND
            if (Object.keys(review).length > 0){
                //return review
               // Extract only the required fields
               const {
                tutorId,
                studentId,
                rating,
                description
            } = review;
            
            const result = {
                tutorId,
                studentId,
                rating,
                description
            };
            console.log(result)
            return result
        }
            // REVIEW NOT FOUND
            else {
                throw new CustomError("Review not found", 400)
            }  
        }catch (err){
            throw err
        }
    }

    static async create(reviewData){ 
        try {
            console.log("\nReviewService.create\n")
            const data = JSON.parse(reviewData)
          
            //retirieving student and tutor usernames
            const tutorUsername = data.tutorId
            const studentUsername = data.studentId

            console.log(tutorUsername)
            console.log(studentUsername)
           

            let review = new Review()
            review.tutorId = tutorUsername;
            review.studentId = studentUsername ;
 

            console.log(review.tutorId+" :::" + review.studentId)
                        
            const propertyMap = {
                
                tutorId: null,
                studentId: null,
                rating: null,
                description: null
            };
    
            // Loop through the data object and set the corresponding properties
            for (const key in propertyMap) {
                // Skip tutorId and studentId
                if (key !== 'tutorId' && key !== 'studentId' && data.hasOwnProperty(key)) {
                    review[key] = data[key];
                }
            }
            // LOOP THROUGH OBJ, ANY UNDEFINED REPLACCE WITH NULL
            for (const key in review) {
                if (review[key] === undefined)
                review[key] = null
            }              
                
            // ADD NEW SESSION TO DB
            console.log(review)

            const reviewInfo = await addReview(review)
            console.log("ReviewInfo " + reviewInfo)
            return reviewInfo
        }catch (e) {
            throw e
        }
    } 
    
    static async update(reviewID, newReviewData) {
        // try {
        //     console.log("\nReviewService.update\n")
        //     const data = JSON.parse(newReviewData)
        //     console.log("\nData has been parsed\n")
    
        //     const username = data.studentId
        //     const result = await searchItem(USER, USERNAME, username) 
    
        //     // USER IS FOUND, NOT NECESSARILY A STUDENT
        //     if (Object.keys(result).length > 0) {
        //         // GET STUDENT BASED ON USERID
        //         const student = await read.getStudent(Object.keys(result)[0])
        //         console.log(student.userId)
        //         console.log(typeof student.userId)
        //         // USER IS A TUTOR
        //         if (student.userId === undefined) {
        //             throw new CustomError("User is not a student", 400)
        //         }
        //     }
        //     else{
        //         throw new CustomError("User not found", 400)
        //     }


        //     const patchStudentId = Object.keys(result)[0]
        //     console.log("Updated Student id: " + patchStudentId + "\n")

        //     if (data.rating != null)
        //         await updateRating(reviewID, data.rating);
        //     if (data.description != null)
        //         await updateAppReview(reviewID, data.description);      
        //     if (data.studentId != null)
        //     await updateAppUserId(reviewID, patchStudentId)        
            
        //     return await getReview(reviewID);
    
        // }catch{
        //     throw new CustomError("Error updating review", 400)
        // }

    }

    static async deleteReview(reviewId) {
        try {
            const deletedReview = await deleteReview(reviewId);
            console.log("SessionService.deleteReview() = " + JSON.stringify(deletedReview) + "\n")
                if (deletedReview === null) {
                    // console.log("deleted review")
                    return null;
                }else {
                    return deletedReview;
                }
            }catch (error) {
                    throw new Error("Error deleting the review: " + error.message);
            }
        }   
}
module.exports = ReviewService