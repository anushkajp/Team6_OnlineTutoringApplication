const express = require("express");
const router = express.Router();
const Tutor = require("../models/tutor")
const read = require("../db/read")
const update = require ('../db/update')
const add = require ('../db/add')
const db = require ('../db/db')
const deletes=require("../db/delete")
       
class TutorService {
    // GET ALL
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

            console.log("\n[ TutorService.getone ]\n")
            const PATH = 'Tutor'
            const ATTRIBUTE = 'username'

            // SEARCH FOR USER W USERNAME
            const search = await db.searchItem(PATH, ATTRIBUTE, id)
            console.log(await search)
            
            // USER FOUND
            if (Object.keys(search).length > 0)
                return search

            // USER NOT FOUND
            else
                return false 

        }catch (e) {
            throw e
        }
        
    }
    // POST
    static async create(tutordata) {
        try {

            console.log("\n[ TutorService.create ]\n")
            const PATH = 'Tutor'
            const ATTRIBUTE = 'username'

            // SEARCH FOR USER W USERNAME
            const search = await db.searchItem(PATH, ATTRIBUTE, id)
            console.log(await search)

            // USER FOUND
            if (Object.keys(search).length === 0)         
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
                update.updateUsername(updateTutor.id, updateTutor.userId)
            if (updateTutor.major != null)
                update.updateUserMajor(updateTutor.id, updateTutor.major)
            if (updateTutor.password != null)
                update.updateUserPassword(updateTutor.id, updateTutor.password)
            if (updateTutor.email != null)
                update.updateUserEmail(updateTutor.id, updateTutor.email)
            if (updateTutor.longBio != null)
                update.updateUserBio(updateTutor.id, updateTutor.longBio)
            if (updateTutor.phone != null)
                update.updateUserPhone(updateTutor.id, updateTutor.phone)
            if (updateTutor.pfp != null)
                update.updateUserProfilePic(updateTutor.id, updateTutor.pfp)
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
            
            // const search = JSON.parse(await db.searchItem(PATH, ATTRIBUTE, id))
            const search = await db.searchItem(PATH, ATTRIBUTE, id)
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

