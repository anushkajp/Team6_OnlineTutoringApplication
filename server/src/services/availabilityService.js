const read = require("../db/read")
const update = require ('../db/update')
const add = require ('../db/obAdd')
const deletes=require("../db/delete")
const {searchItem} = require ('../db/db')
const USER = 'User'
const USERNAME = 'username'
const CustomError = require ('../utils/customError')
const Availability = require ('../models/availability')

class AvailabilityService{
    static async allAvail(username) {
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
            return tutor.availability
            // return tutor.weeklyAvailability --> currently in db, will change tho
        }
        else
            throw new CustomError("User not found", 400)
       
    }
    static async oneAvail(id) {

    }
    static async createAvail() {

    }
    static async updateAvail() {

    }
    static async deleteAvail() {

    }

}
module.exports = AvailabilityService