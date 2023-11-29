const express = require("express");
const Review = require("../models/review")
const {getReview, getReviews, getStudent, getUser} = require ('../db/read')
const {searchItem} = require ('../db/db')
const {deleteReview} = require("../db/delete")
const CustomError = require ('../utils/customError')
const {addReview} = require('../db/obAdd')
const {updateTutorRating, updateReviewDescription} = require ('../db/update')


class ReviewService {
      // GET ALL
    static async getAll() {
        try {          
            const reviews = await getReviews();
            // Transform the data structure and filter unnecessary information
            const transformedReviews = Object.entries(reviews).map(([id, review]) => {
                const { description, rating, studentId, tutorId } = review;
                console.log(review.studentId)
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


     //GET ALL APPOINTMENTS BY USER
     static async getAllReviewsByTutor(id, path) {
        try {
            console.log("\n[ ReviewService.getAllReviewsByTutor ]")
            const user = await searchItem('User', 'username', id)
            console.log("\nuser: " + JSON.stringify(user))
            const userid = Object.keys(user)[0]
            if (Object.keys(user).length === 0) {
                return false
            }
            const reviews = await searchItem('Review', path, userid)
            console.log("\nreviews: " + JSON.stringify(reviews))
            return reviews
            
        }catch (e) {
            throw e
        }
    }  

    static async create(reviewData){ 
        try {
            console.log("\nReviewService.create\n")
            const data = JSON.parse(reviewData)
          
            //retirieving student and tutor usernames
            const tutorUsername = data.tutorId
            const studentUsername = data.studentId
           
            //searching for the student and tutor via their username on the database
            const userTutor = await searchItem('User', 'username', tutorUsername)
            const userStudent = await searchItem('User', 'username', studentUsername)

            // check if the studentId indeed corresponds to a student     
            // USER DOESNT EXIST
            if ( Object.keys(userStudent).length === 0){
                throw new CustomError("User does not exist", 400)
            }
            //getting student and tutor userIds
            const tutoruserid = Object.keys(userTutor)[0]
            const studentuserid = Object.keys(userStudent)[0]
            // only users that are student can create reviews
            // CHECK TO SEE IF USER IS A STUDENT
            const student = await getStudent(studentuserid)
            //console.log(student)
            if (student.userId === undefined){
                throw new CustomError("ERROR: Only student users can create reviews", 400) 
            }
            // Check for duplicate reviews
            const checkReviewStudent = await searchItem('Review', 'studentId', studentuserid)
            const checkReviewTutor = await searchItem('Review', 'tutorId', tutoruserid)

            if (checkReviewStudent && checkReviewTutor){
                //console.log("dups!")
                throw new CustomError("ERROR: Review between this student and tutor exists", 400)
            }

            let review = new Review()
            review.tutorId = tutoruserid;
            review.studentId = studentuserid ;
           
            const propertyMap = {
                
                tutorId: null,
                studentId: null,
                rating: null,
                description: null
            };
            
            if (data.rating !== undefined && data.rating >= 1 && data.rating <= 5) {
                // need to calculate avg to tuto rating
                review.rating = data.rating;

            } else {
                throw new CustomError("ERROR: Rating must be between 1 - 5", 400)
            }

            //TO DO:
            // get all the review of the user and average

            // Loop through the data object and set the corresponding properties
            for (const key in propertyMap) {
                // Skip tutorId and studentId
                if (key !== 'tutorId' && key !== 'studentId' && key!== 'rating' && data.hasOwnProperty(key)) {
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

            const reviewInfo = await addReview(review)
            console.log("ReviewInfo " + reviewInfo)
             // Now, modify the reviewInfo object to show usernames in Postman
            reviewInfo.tutorId = tutorUsername;
            reviewInfo.studentId = studentUsername;

            return reviewInfo
        }catch (e) {
            throw e
        }
    } 
    
    static async update(id, reviewData) {
        try {
            console.log("\nRviewService.update\n")
            const data = JSON.parse(reviewData)
            console.log("\nData has been parsed\n")
            
            if (data.rating != null){
                await updateTutorRating(id, data.rating) 
            } 

            if (data.description != null){
                await updateReviewDescription(id, data.description) 
            }
            return await getReview(id)
            }catch (e) {
                throw e
            }
}
    

    static async deleteReview(reviewId) {
        try {
            const deletedReview = await deleteReview(reviewId);
            console.log("SessionService.deleteReview() = " + JSON.stringify(deletedReview) + "\n")
                if (deletedReview === null) {
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