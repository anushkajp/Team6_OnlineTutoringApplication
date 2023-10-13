const express = require("express");
const router = express.Router();
const Tutor = require("../models/tutor")
const { getTutor, getTutors} = require ('../db/read')
const {updateUsername, updateUserMajor, updateUserPhone, updateUserEmail, updateUserBio,
        updateUserPassword, updateUserProfilePic} = require ('../db/update')
const {addTutor} = require ('../db/add')

       // GET ALL
class TutorService {
    static getAll() {
        // IF DB CAN FIND ID RETURN TUTOR OBJECT
        const tutors = []
        try {
            tutors = getTutors()
            return tutors
        }catch (err) {
            return err
        }
    }
    // GET ONE
    static getOne(id) {
        const tutor = new Tutor()
        try {
            tutor = getTutor(id)
            return tutor
        }catch (err) {
            return err
        }
    }
    // POST
    static create(tutor) {
        try {
            const newTutor = addTutor(tutor.firstName, tutor.middleName,
                tutor.lastName, tutor.password, tutor.username, tutor.major,
                tutor.courses, tutor.phone, tutor.email, tutor.longBio, 
                tutor.shortBio, tutor.availability.week, tutor.availability.exceptions,
                tutor.pfp, tutor.rating, tutor.bkgdCheck, tutor.hours)
            return newTutor
        }catch (e) {
            return e
        }
    }
    // PATCH
    static update(updateTutor){
        try {
            // SEE WHAT CHANGED IN UPDATETUTOR AND CALL CORRESPONDING DB FUNCTION
            if (updateTutor.userId != null)
                updateUsername(updateTutor.id, updateTutor.userId)
            if (updateTutor.major != null)
                updateUserMajor(updateTutor.id, updateTutor.major)
            if (updateTutor.password != null)
                updateUserPassword(updateTutor.id, updateTutor.password)
            if (updateTutor.email != null)
                updateUserEmail(updateTutor.id, updateTutor.email)
            if (updateTutor.longBio != null)
                updateUserBio(updateTutor.id, updateTutor.longBio)
            if (updateTutor.phone != null)
                updateUserPhone(updateTutor.id, updateTutor.phone)
            if (updateTutor.pfp != null)
                updateUserProfilePic(updateTutor.id, updateTutor.pfp)
            return getTutor(updateTutor.userId)
        }catch (e) {
            return e
        }
    }
    // DELETE
    static delete(id) {
        const tutor = new Tutor()
        try {
            tutor = getTutor(id)
            updateUsername(id, null)
            updateUserBio(id, null)
            updateUserEmail(id, null)
            updateUserPassword(id, null)
            updateUserMajor(id, null)
            updateUserProfilePic(id, null)
            return tutor
        }catch (e) {
            return e
        }
    }
}
module.exports = TutorService

