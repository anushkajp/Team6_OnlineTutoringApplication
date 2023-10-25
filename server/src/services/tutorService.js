const express = require("express");
const router = express.Router();
const Tutor = require("../models/tutor")
const { getTutor, getTutors, getTutorIds} = require ('../db/read')
const {updateUsername, updateUserMajor, updateUserPhone, updateUserEmail, updateUserBio,
        updateUserPassword, updateUserProfilePic} = require ('../db/update')
const {addTutor} = require ('../db/add')
const {searchItem} = require ('../db/db')
const deletes=require("../db/delete")
       // GET ALL
class TutorService {
    static async login() {
        try {
                // MAHI'S CODE
        }catch (err) {
            throw err
        }
    }
    static async getAll() {
        // IF DB CAN FIND ID RETURN TUTOR OBJECT
        try {
            const tutors = await getTutors()
            console.log("TutorService.getTutors() = " + tutors)
            return tutors
        }catch (err) {
            throw err
        }
    }
    // GET ONE
    static async getOne(id) {
        try {
            console.log("\nTutorService.getone\n")
            const PATH = 'Tutor'
            const ATTRIBUTE = 'username'
            // SEARCH FOR USER W USERNAME
            const search = await searchItem(PATH, ATTRIBUTE, id)
            console.log(await search)
            if (Object.keys(search).length > 0)         // USER FOUND
                return search
            else
                return false                            // USER CANNOT BE FOUND
        }catch (e) {
            throw e
        }
        
    }
    // POST
    static async create(tutordata) {
        try {
            console.log("\nTutorService.create\n")
            const PATH = 'Tutor'
            const ATTRIBUTE = 'username'
            // SEARCH FOR USER W USERNAME
            const search = await searchItem(PATH, ATTRIBUTE, id)
            console.log(await search)
            if (Object.keys(search).length === 0)         // USER FOUND
                return false
            // ADD NEW STUDENT TO DB
            const data = JSON.parse(tutordata)
            console.log("nTutorService student:" + JSON.stringify(data) + "\n")
            const tutorInfo = await addTutor(
                data.firstName, data.middleName,
                data.lastName, data.password, data.userName, 
                data.major, data.courses, data.phone, 
                data.email, data.longBio, data.shortBio, data.availability.week,
                data.availability.exceptions, data.pfp, data.rating, 
                data.bkgdCheck, data.hours
            )
            console.log(tutorInfo)
            console.log("TutorService tutorInfo: " + JSON.stringify(tutorInfo) + "\n")
            // FIND THE NEW STUDENT FROM DB WITH USERID
            return tutorInfo
        }catch (e) {
            throw e
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
            throw e
        }
    }
    // DELETE
    static async delete(id) {
        try {
            // FIND USERID FROM USERNAME
            const PATH = 'Tutor'
            const ATTRIBUTE = 'username'
            console.log("\nTutorService.delete")
            // const search = JSON.parse(await searchItem(PATH, ATTRIBUTE, id))
            const search = await searchItem(PATH, ATTRIBUTE, id)
            console.log("Username: " + Object.keys(search)[0])
            if (Object.keys(search).length > 0) {
                deletes.deleteUser(Object.keys(search)[0])
                return search
            }
            else
                return false
        }catch (e) {
            throw e
        }
    }
}
module.exports = TutorService

