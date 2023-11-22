const read = require("../db/read")
const update = require ('../db/update')
const {searchItem} = require ('../db/db')
const USER = 'User'
const USERNAME = 'username'
const CustomError = require ('../utils/customError')
const Availability = require ('../models/availability')
const TutorService = require ('./tutorService')
// const moment = require ("moment")

class AvailabilityService{
    static async allAvail(username) {
        try {
            console.log("[ AvailabilityService.allAvail ]")
            const tutorObj = await TutorService.getOne(username)
            const tutor = Object.values(tutorObj)[0]
            return tutor.availability
        } catch (err) {
            throw err
        }
        
    }
    static async oneAvail(username, dayOfTheWeek) {
        try {
            console.log("\n[ AvailabilityService.oneAvail ]\n")
            const tutorObj = await TutorService.getOne(username)
            const tutor = Object.values(tutorObj)[0]
            // IS A DAY OF THE WEEK
            if (Availability.toObj().hasOwnProperty(dayOfTheWeek)) {
                // TUTOR HAS AVAILABILITY THIS DAY
                if (tutor.availability[dayOfTheWeek] === false)
                    throw new CustomError("No Content",204)
                
                return tutor.availability[dayOfTheWeek]
            }
            // NOT A DAY OF THE WEEK
            else {
                const string = `${dayOfTheWeek} is not a day of the week`
                throw new CustomError(string, 400)
            }
        }catch (err) {
            throw err
        }
        
    }
    static async updateAvail(username, dayOfTheWeek, availability) {
        try {
            console.log("[ AvailabilityService.updateAvail ]")
            // PARSE AVAILABILITY
            const data = JSON.parse(availability)
            const tutorObj = await TutorService.getOne(username)
            const tutorId = Object.keys(tutorObj)[0]
            const tutor = Object.values(tutorObj)[0]
            const oldAvailability = tutor.availability
            if (Availability.toObj().hasOwnProperty(dayOfTheWeek)) {
                // REPLACE OLD DAY OF THE WEEK WITH NEW
                oldAvailability[dayOfTheWeek] = [data]
                console.log(oldAvailability)
                await update.updateTutorWeeklyAvail(tutorId, oldAvailability)
                // RETURN OBJECT
                return await this.oneAvail(username, dayOfTheWeek)
            } else {
                const string = `${dayOfTheWeek} is not a day of the week`
                throw new CustomError(string, 400)
            }
            
        }catch (err) {
            throw err
        }
        
    }
    static async deleteAvail(username, dayOfTheWeek) {
        try {
            console.log("\n[ AvailabilityService.deleteAvail ]")
            const tutorObj = await TutorService.getOne(username)
            const tutorId = Object.keys(tutorObj)[0]
            const tutor = Object.values(tutorObj)[0]
            const oldAvailability = tutor.availability
            // IF dayOfTheWeek IS A DAY, CONTINUE
            if (Availability.toObj().hasOwnProperty(dayOfTheWeek)) {
                // REPLACE OLD DAY OF THE WEEK WITH NEW
                oldAvailability[dayOfTheWeek] = false
                await update.updateTutorWeeklyAvail(tutorId, oldAvailability)
            } else {
                const string = `${dayOfTheWeek} is not a day of the week`
                throw new CustomError(string, 400)
            }
            
        }catch (err) {
            throw err
        }
        
    }
////////////////////////////////////////////////////////////////////////////////
// EXCEPTIONS TO AVAILABILITY
///////////////////////////////////////////////////////////////////////////////

    static async allExcept(username) {
        try {
            console.log("[ AvailabilityService.allExcept ]")
            const tutorObj = await TutorService.getOne(username)
            const tutor = Object.values(tutorObj)[0]
            if (tutor.availability.exceptions === false)
                throw new CustomError("No Content", 204)
            return tutor.availability.exceptions //--> currently in db, will change tho
        }catch (err) {
            throw err
        }
         
    }
    static async addException(username, date) {
        try {
            console.log("[ AvailabilityService.addException ]")
            // FIND USER
            const tutorObj = await TutorService.getOne(username)
            const tutorId = Object.keys(tutorObj)[0]
            const tutor = Object.values(tutorObj)[0]
            // DATE IS NOT FORMATTED CORRECTLY
            // console.log(moment(date.replaceAll("-", "/"),"DD/MM/YYYY", true).isValid)
            // if (moment(date.replaceAll("-", "/"),"DD/MM/YYYY", true).isValid === false) {
            //     const string = `${date} is not a day of the week`
            //     throw new CustomError(string, 400)
            // }

            // if (moment().isSameOrAfter(date) === true) {
            //     throw new CustomError("Cannot add date that has passed", 400)
            // }
            // EXCEPTIONS IS EMPTY
            if (tutor.availability.exceptions === false) {
                tutor.availability.exceptions = [date]
            // EXCEPTIONS NOT EMPTY
            } else {
                // CHECK FOR DUPLICATE DATES
                for (const key in tutor.availability.exceptions) {
                    if (tutor.availability.exceptions[key] === date)
                        return this.allExcept(username)
                }
                tutor.availability.exceptions.push(date)
            }
            // UPDATE EXCEPTIONS
            await update.updateTutorWeeklyAvail(tutorId, tutor.availability)
        }catch (err) {
            throw err
        }
    }
    static async deleteExcept(username, delDate) {
        console.log("\n[ AvailabilityService.deleteExcept ]\n")
        // FIND USER
        const tutorObj = await TutorService.getOne(username)
        const tutorId = Object.keys(tutorObj)[0]
        const tutor = Object.values(tutorObj)[0]
        tutor.availability.exceptions = tutor.availability.exceptions.filter(date => date !== delDate);
        console.log(tutor.availability.exceptions)
        await update.updateTutorWeeklyAvail(tutorId, tutor.availability)
    }
}
module.exports = AvailabilityService