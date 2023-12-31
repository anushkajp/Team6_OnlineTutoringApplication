const express = require("express");
const Review = require("../models/review")
const {getReview, getReviews, getStudent, getUser, getTutor} = require ('../db/read')
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
            const transformedReviews = await Promise.all(Object.entries(reviews).map(async ([id, review]) => {
                const { description, rating, studentId, tutorId } = review;
    
                const studentUsername = (await getUser(studentId))["username"];
                const tutorUsername = (await getUser(tutorId))["username"];
    
                return {
                    id,
                    studentUsername,
                    tutorUsername,
                    rating,
                    description
                };
            }));
    
            console.log("ReviewService.getAll() = " + JSON.stringify(transformedReviews) + "\n");
            return transformedReviews;
        } catch (err) {
            throw err;
        }
    }
    
      //GET ALL REVIEWS BY USER
      static async getAllReviewsByUser(id) {
        try {
            // we are sent the username
            // we need to check if the username sent is a student or tutor
            const user = await searchItem('User', 'username', id)
            console.log("\nuser: " + JSON.stringify(user))
            const userid = Object.keys(user)[0]
            if (Object.keys(user).length === 0) { // check if the user exists
                return false
            }

            //console.log("student or tutor")
            let reviews = await searchItem('Review', 'studentId',userid )
            //console.log("is student" + reviews)
            if (reviews == false){
                //console.log("is student" + reviews)
                reviews = await searchItem('Review', 'tutorId', userid )
                //console.log(reviews)
            }

            const transformedReviews = await Promise.all(Object.entries(reviews).map(async ([id, review]) => {
                const { description, rating, studentId, tutorId } = review;
    
                const studentUsername = (await getUser(studentId))["username"];
                const tutorUsername = (await getUser(tutorId))["username"];
    
                return {
                    id,
                    studentUsername,
                    tutorUsername,
                    rating,
                    description
                };
            }));

            return transformedReviews

            //return reviews
            
        }catch (e) {
            throw e
        }
    }

       //GET ONE BY STUDENT/TUTOR
       static async getOne(studentUsername, tutorUsername) {
        try {
            // Retrieve user data for student and tutor
            const studentUser = await searchItem('User', 'username', studentUsername);
            const tutorUser = await searchItem('User', 'username', tutorUsername);

            console.log("\nstudentUser: " + JSON.stringify(studentUser));
            console.log("\ntutorUser: " + JSON.stringify(tutorUser));

            // Check if the users exist
            if (Object.keys(studentUser).length === 0 || Object.keys(tutorUser).length === 0) {
                return false;
            }



            const studentUserId = Object.keys(studentUser)[0];
            const tutorUserId = Object.keys(tutorUser)[0];

            // Retrieve review for the given student and tutor
            //const review = await searchItem('Review', 'studentId', studentUserId, 'tutorId', tutorUserId);

            const studentMatch = await searchItem('Review', 'studentId', studentUserId)
            const tutorMatch = await searchItem('Review', 'tutorId', tutorUserId)
        
        
            //console.log(tutorMatch)
            let review = {}

            Object.keys(studentMatch).forEach(element => {
                if(Object.keys(tutorMatch).indexOf(element) != -1){
                    review[element] = studentMatch[element]
                }
            });

            console.log(review)
            console.log(Object.keys(review)[0])


            // Check if the review exists
        if (Object.keys(review).length === 0) {
            throw new CustomError("Review not found", 400);
        }
        
        const reviewId = Object.keys(review)[0];
        console.log(reviewId)

        let res = await getReview(reviewId)
        
        return {
            id: reviewId,
            studentUsername,
            tutorUsername,
            rating: res.rating,
            description: res.description
        }; 

        } catch (e) {
            throw e;
        }
    }
    
    // GET ONE REVIEW BY ID 
    // static async getOne(id) {
    //     try {
    //         console.log("\n[ ReviewService.getOne ]\n")
    //         const review = await getReview(id)
    //         // REVIEW FOUND
    //         if (Object.keys(review).length > 0){
                
    //            const {
    //             tutorId,
    //             studentId,
    //             rating,
    //             description
    //         } = review;
            
            
    //         const result = {
    //             tutorId,
    //             studentId,
    //             rating,
    //             description
    //         };
    //         console.log(result)
    //         return result
    //     }
    //         // REVIEW NOT FOUND
    //         else {
    //             throw new CustomError("Review not found", 400)
    //         }  
    //     }catch (err){
    //         throw err
    //     }
    // }


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
            if ( Object.keys(userStudent).length === 0 || Object.keys(userTutor).length === 0 ){
                throw new CustomError("User does not exist", 400)
            }
            
            //getting student and tutor userIds
            const tutoruserid = Object.keys(userTutor)[0]
            const studentuserid = Object.keys(userStudent)[0]
            // only users that are student can create reviews
            // CHECK TO SEE IF USER IS A STUDENT
            const student = await getStudent(studentuserid)
            const tutor = await getTutor(tutoruserid)
            

            if (student.userId === undefined){
                throw new CustomError("ERROR: Only student users can create reviews", 400) 
            }

            // Check for duplicate reviews
            const checkReviewStudent = await searchItem('Review', 'studentId', studentuserid)
            const checkReviewTutor = await searchItem('Review', 'tutorId', tutoruserid)

            //TO DO:
            // get all the review of the user and average

            console.log(checkReviewTutor)

            if (checkReviewStudent && checkReviewTutor){
                //console.log("dups!")
                throw new CustomError("ERROR: Review between this student and tutor exists", 400)
            }
            // create a new review 
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
    
//     static async update(id, reviewData) {
//         try {
//             console.log("\nReviewService.update\n")
//             const data = JSON.parse(reviewData)
//             console.log("\nData has been parsed\n")
            
//             if (data.rating != null){
//                 await updateTutorRating(id, data.rating) 
//             } 

//             if (data.description != null){
//                 await updateReviewDescription(id, data.description) 
//             }
//             return await getReview(id)
//             }catch (e) {
//                 throw e
//             }
// }

static async update(studentUsername, tutorUsername, reviewData) {

        console.log("studentUsername:", studentUsername);
        console.log("tutorUsername:", tutorUsername);

        console.log("\nReviewService.update\n")
        const data = JSON.parse(reviewData)
        console.log("\nData has been parsed\n")
        
        const studentUser = await searchItem('User', 'username', studentUsername);
        const tutorUser = await searchItem('User', 'username', tutorUsername);

        console.log("\nstudentUser: " + JSON.stringify(studentUser));
        console.log("\ntutorUser: " + JSON.stringify(tutorUser));

        // Check if the users exist
        if (Object.keys(studentUser).length === 0 || Object.keys(tutorUser).length === 0) {
            return false;
        }

        const studentUserId = Object.keys(studentUser)[0];
        console.log(studentUserId)
        const tutorUserId = Object.keys(tutorUser)[0];
        console.log(tutorUserId)
       
        const studentMatch = await searchItem('Review', 'studentId', studentUserId)
        const tutorMatch = await searchItem('Review', 'tutorId', tutorUserId)
        
        
        console.log(tutorMatch)
        let review = {}

        Object.keys(studentMatch).forEach(element => {
            if(Object.keys(tutorMatch).indexOf(element) != -1){
                review[element] = studentMatch[element]
            }
        });

        console.log(review)
        console.log(Object.keys(review)[0])


            // Check if the review exists
        if (Object.keys(review).length === 0) {
            throw new CustomError("Review not found", 400);
        }
        
        const reviewId = Object.keys(review)[0];
        console.log(reviewId)

        if (data.rating != null){
            //console.log(typeof(data.rating))
            await updateTutorRating(reviewId, data.rating) 
        } 

        if (data.description != null){
            await updateReviewDescription(reviewId, data.description) 
        }
        //return await getReview(reviewId)
         // Fetch the updated review
         const updatedReview = await getReview(reviewId);

         // Return the review with student and tutor usernames
         return {
             id: reviewId,
             studentUsername,
             tutorUsername,
             rating: updatedReview.rating,
             description: updatedReview.description
         }; 
}
   
    // DELETE BY ID

    // static async deleteReview(reviewId) {
    //     try {
    //         const deletedReview = await deleteReview(reviewId);
    //         console.log("SessionService.deleteReview() = " + JSON.stringify(deletedReview) + "\n")
    //             if (deletedReview === null) {
    //                 return null;
    //             }else {
    //                 return deletedReview;
    //             }
    //         }catch (error) {
    //                 throw new Error("Error deleting the review: " + error.message);
    //         }
    //     }  

        //DELETE BY STUDENT/TUTOR
        static async deleteReview(studentUsername, tutorUsername) {
            try {
                // Retrieve user data for student and tutor
                const studentUser = await searchItem('User', 'username', studentUsername);
                const tutorUser = await searchItem('User', 'username', tutorUsername);
        
                console.log("\nstudentUser: " + JSON.stringify(studentUser));
                console.log("\ntutorUser: " + JSON.stringify(tutorUser));
        
                // Check if the users exist
                if (Object.keys(studentUser).length === 0 || Object.keys(tutorUser).length === 0) {
                    return false;
                }
        
                const studentUserId = Object.keys(studentUser)[0];
                const tutorUserId = Object.keys(tutorUser)[0];
        
                // Retrieve review for the given student and tutor
                //const review = await searchItem('Review', 'studentId', studentUserId, 'tutorId', tutorUserId);
        

                const studentMatch = await searchItem('Review', 'studentId', studentUserId)
                const tutorMatch = await searchItem('Review', 'tutorId', tutorUserId)
                // Delete the review
                let review = {}

                Object.keys(studentMatch).forEach(element => {
                    if(Object.keys(tutorMatch).indexOf(element) != -1){
                        review[element] = studentMatch[element]
                    }
                });
                //CHeck if the review exists
                if (Object.keys(review).length === 0) {
                    throw new CustomError("Review not found", 400);
                }
        
                const reviewId = Object.keys(review)[0];
                console.log(reviewId)
                const deletedReview = await deleteReview(reviewId);
        
                console.log("SessionService.deleteReview() = " + JSON.stringify(deletedReview) + "\n");
        
                if (deletedReview === null) {
                    return null;
                } else {
                    return deletedReview;
                }
            } catch (error) {
                throw new Error("Error deleting the review: " + error.message);
            }
        }
        
}
module.exports = ReviewService