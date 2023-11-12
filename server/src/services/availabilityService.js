const read = require("../db/read")
const update = require ('../db/update')
const add = require ('../db/obAdd')
const deletes=require("../db/delete")
const {searchItem} = require ('../db/db')
const USER = 'User'
const USERNAME = 'username'
const CustomError = require ('../utils/customError')
const Availability = require ('../models/availability')
const TutorService = require ('./tutorService')
const Tutor = require("../models/tutor")

class AvailabilityService{
    static async allAvail(username) {
        console.log("[ AvailabilityService.allAvail ]")
        // CHECK IF THEY ARE A USER
        const search = await searchItem(USER, USERNAME, username)
        // CHECK IF USER IS A TUTOR
        if (Object.keys(search).length > 0) {
            // GET TUTOR BASED ON USERID
            const tutor = await read.getTutor(Object.keys(search)[0])
            // USER IS A TUTOR
            if (tutor.userId === undefined) {
                throw new CustomError("User is not a student", 400)
            }
            // RETURN AVAILABILITY OF STUDENT
            // return tutor.availability
            return tutor.weeklyAvailability //--> currently in db, will change tho
        }
        else
            throw new CustomError("User not found", 400)
       
    }
    static async oneAvail(username, dayOfTheWeek) {
        console.log("[ AvailabilityService.oneAvail ]")
        const availability = await this.allAvail(username)
        if (availability.hasOwnProperty(dayOfTheWeek))
            return availability[dayOfTheWeek]
        if (Availability.toObj().hasOwnProperty(dayOfTheWeek))
            throw new CustomError("No Content",204)
        throw new CustomError(string, 400)
    }
    static async updateAvail(username, dayOfTheWeek, availability) {
        console.log("[ AvailabilityService.createAvail ]")
        // PARSE AVAILABILITY
        const data = JSON.parse(availability)
        // GET OLD AVAILABILITY
        const oldAvailability = await this.allAvail(username)
        // GET TUTOR USERNAME
        const tutorId = await Object.keys(TutorService.getOne(username))[0]
        // IF dayOfTheWeek IS A DAY, CONTINUE
        if (Availability.toObj().hasOwnProperty(dayOfTheWeek)) {
            // CHECK IF TIME SLOT IS VALID
            
            // REPLACE OLD DAY OF THE WEEK WITH NEW
            oldAvailability[dayOfTheWeek] = [data]
            await update.updateTutorWeeklyAvail(tutorId, oldAvailability)
            // RETURN OBJECT
            return await this.oneAvail(username, dayOfTheWeek)
        }
        // dayOfTheWeek NOT A DAY
        const string = dayOfTheWeek + " is not a day of the week"
        throw new CustomError(string, 400)
    }
    static async deleteAvail(username, dayOfTheWeek) {
        console.log("[ AvailabilityService.deleteAvail ]")
        // GET OLD AVAILABILITY
        const oldAvailability = await this.allAvail(username)
        // GET TUTOR USERNAME
        const tutorId = await Object.keys(TutorService.getOne(username))[0]
        // IF dayOfTheWeek IS A DAY, CONTINUE
        if (oldAvailability.hasOwnProperty(dayOfTheWeek)) {
            // REPLACE OLD DAY OF THE WEEK WITH NEW
            delete oldAvailability[dayOfTheWeek]
            console.log(oldAvailability)
            await update.updateTutorWeeklyAvail(tutorId, oldAvailability)
        }
        if (Availability.toObj().hasOwnProperty(dayOfTheWeek))
            throw new CustomError("No Content", 204)
        // dayOfTheWeek NOT A DAY
        const string = dayOfTheWeek + " is not a day of the week"
        throw new CustomError(string, 400)
    }
}
module.exports = AvailabilityService