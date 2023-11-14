const read = require("../db/read")
const update = require ('../db/update')
const add = require ('../db/obAdd')
const {searchItem} = require ('../db/db')
const deletes=require("../db/delete")
const USER = 'User'
const USERNAME = 'username'
const EMAIL = 'email'
const CustomError = require ('../utils/customError')
const Tutor = require ('../models/tutor')
const Availability = require ('../models/availability')
const bcrypt = require ("bcryptjs")

class TutorService {
    // GET ALL
    static async getAll() {
        console.log("\n[ TutorService.getAll ]\n")
        // GET ALL TUTOR USERIDS
        const tutorIds = await read.getTutors()
        const propertyMap = {}
        let addOns
        console.log("TutorIds")
        console.log(tutorIds)
        // POPULATE DICTIONARY WITH TUTOR INFO FROM USERIDS
        for (const key in tutorIds) {
            propertyMap[key] = await read.getUser(key)
            addOns = await read.getTutor(key)
            propertyMap[key] = {...propertyMap[key], ...addOns}
        }
        console.log(propertyMap)
        return propertyMap
    }
    // GET ONE
    static async getOne(id) {
        
        console.log("\n[ TutorService.getone ]\n")

        // SEARCH FOR USER W USERNAME
        console.log(id)
        const search = await searchItem(USER, USERNAME, id)
        console.log(await search)
        
        // USER FOUND
        if (Object.keys(search).length === 1) {

            // DETERMINE IF USER IS A TUTOR
            const tutorAdds = await read.getTutor(Object.keys(search)[0])
            const tutorId = await searchItem()
            console.log(Object.keys(search)[0])
            console.log(tutorAdds)
            console.log(tutorAdds.userId)
            // USER IS A STUDENT
            if (tutorAdds === undefined) {
                throw new CustomError("User is not a tutor", 400)
            }

            // COMBINE TUTOR INFO AND THE TUTOR ADD ONS
            search[Object.keys(search)[0]] = {...search[Object.keys(search)[0]], ...tutorAdds}
            
            // POPULATE TUTOR OBJECT 
            return search
        }    

        // USER NOT FOUND
        else if (Object.keys(search).length === 0)
            throw new CustomError("User not found", 400)
        else 
            throw new CustomError("Multiple users found with this username", 400)
        
    }
    

    // POST
    static async create(tutordata) {
        try {

            console.log("\n[ TutorService.create ]\n")
            const data = JSON.parse(tutordata)
            // SEARCH FOR USER W USERNAME
            const userResult = await searchItem(USER, USERNAME, data.username)
            const emailResult = await searchItem(USER, EMAIL, data.email)
            console.log(userResult)
            console.log(Object.keys(userResult).length)
            console.log(Object.keys(emailResult).length)
            // USER FOUND
            if (Object.keys(userResult).length > 0)         
                throw new CustomError("Username already exists", 400)

            // EMAIL FOUND
            if (Object.keys(emailResult).length > 0)         
                throw new CustomError("Email already in use", 400)
            
            // HASH PASSWORD
            const saltRounds = 10
            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = await bcrypt.hash(data.password, salt)
            data.password = hashedPassword

            // ADD NEW STUDENT TO DB
            console.log(data)
            let tutor = new Tutor();
            const propertyMap = Tutor.toObj();

            // Loop through the data object and set the corresponding properties
            for (const key in propertyMap) {
                if (data.hasOwnProperty(key)) {
                    tutor[key] = data[key];
                }
            }

            // LOOP THROUGH OBJ, ANY UNDEFINED REPLACE WITH NULL
            for (const key in tutor) {
                if (tutor[key] === undefined)
                    tutor[key] = propertyMap[key]
            }
            // LOOP THROUGH AVAILABILITY AND SET TO NULL
            console.log(tutor)
            tutor.availability = new Availability()
            for (const key in tutor.availability) {
                if (tutor.availability[key] === undefined)
                    tutor.availability[key] = false
            }
            console.log(tutor)
            const tutorInfo = await add.addTutor(tutor)
            
            console.log(tutorInfo)
            // FIND THE NEW STUDENT FROM DB WITH USERID
            // return tutorInfo
            return await this.getOne(data.username)
        }catch (e) {
            throw e
        }
    }
    // PATCH
    static async update(username, updateTutor){
        try {
            // FIND TUTORID
            console.log("\n[ TutorService.update ]\n")
            const data = JSON.parse(updateTutor)
            console.log(data.username)            

            let id = Object.keys(await searchItem(USER, USERNAME, username))
            id = id[0]

            console.log(data)
            console.log(id)

            // SEE WHAT CHANGED IN UPDATETUTOR AND CALL CORRESPONDING DB FUNCTION
            if (data.major != null)
                update.updateUserMajor(id, data.major)
            if (data.password != null) {
                // HASH PASSWORD
                const saltRounds = 10
                const salt = bcrypt.genSaltSync(saltRounds)
                const hashedPassword = await bcrypt.hash(data.password, salt)
                update.updateUserPassword(id, hashedPassword)
            }
                
            if (data.longBio != null)
                update.updateUserLongBio(id, data.longBio)
            if (data.shortBio != null)
                update.updateUserShortBio(id, data.shortBio)
            if (data.phone != null)
                update.updateUserPhone(id, data.phone)
            if (data.pfp != null)
                update.updateUserProfilePic(id, data.pfp)
            if (data.availability != null)
                update.updateTutorWeeklyAvail(id, data.availability)
            if (data.exceptions != null)
                update.updateTutorExceptAvail(id, data.availability.exceptions)
            if (data.username != null) {
                const result = await searchItem(USER, USERNAME, data.username)
                // USERNAME ALREADY USED
                if ( Object.keys(result).length > 0)
                    throw new CustomError("Username currently used", 400)
                update.updateUsername(id, data.username)
                username = data.username
            }
            if (data.email != null) {
                // EMAIL ALREADY USED
                const emailResult = await searchItem(USER, EMAIL, data.email)
                if (Object.keys(emailResult).length > 0)         
                    throw new CustomError("Email already in use", 400)
                update.updateUserEmail(id, data.email)
            }
            return this.getOne(username)
        }catch (e) {
            throw e
        }
    }
    // DELETE
    static async delete(id) {
        try {

            // FIND USERID FROM USERNAME
            console.log("\nTutorService.delete")
            const search = await searchItem(USER, USERNAME, id)
            console.log("Username: " + Object.keys(search)[0])
            if (Object.keys(search).length > 0) {
                deletes.deleteUser(Object.keys(search)[0])
                return search
            }
            else
                throw new CustomError("User not found", 400)
        }catch (e) {
            throw e
        }
    }
}
module.exports = TutorService

