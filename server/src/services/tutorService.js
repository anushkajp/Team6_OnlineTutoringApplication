const read = require("../db/read")
const update = require ('../db/update')
const add = require ('../db/obAdd')
const {searchItem} = require ('../db/db')
const deletes=require("../db/delete")
const USER = 'User'
const USERNAME = 'username'
const CustomError = require ('../utils/customError')
const Tutor = require ('../models/tutor')
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
            const search = await searchItem(USER, USERNAME, data.username)
            console.log(await search)

            // USER FOUND
            if (Object.keys(search).length > 0)         
                throw new CustomError("Username already exists", 400)
            
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
                    tutor[key] = null
            }
            const tutorInfo = await add.addTutor(tutor)
            
            console.log(tutorInfo)
            console.log("TutorService tutorInfo: " + JSON.stringify(tutorInfo) + "\n")
            // FIND THE NEW STUDENT FROM DB WITH USERID
            return tutorInfo
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
            const result = await searchItem(USER, USERNAME, username)

            // TUTOR DOESNT EXIST
            if ( Object.keys(result).length === 0)
                throw new CustomError("Username currently used", 400)
            console.log("updateTutor: " + updateTutor + "\n")
            console.log("Tutor id: " + id + "\n")

            const id = Object.keys(result)[0]
            // SEE WHAT CHANGED IN UPDATETUTOR AND CALL CORRESPONDING DB FUNCTION
            if (updateTutor.userId != null)
                update.updateUsername(id, updateTutor.userId)
            if (updateTutor.major != null)
                update.updateUserMajor(id, updateTutor.major)
            if (updateTutor.password != null)
                update.updateUserPassword(id, updateTutor.password)
            if (updateTutor.email != null)
                update.updateUserEmail(id, updateTutor.email)
            if (updateTutor.longBio != null)
                update.updateUserBio(id, updateTutor.longBio)
            if (updateTutor.phone != null)
                update.updateUserPhone(id, updateTutor.phone)
            if (updateTutor.pfp != null)
                update.updateUserProfilePic(id, updateTutor.pfp)
            if (updateTutor.shortBio != null)
                update.updateTutorBio(id, update)
            return getTutor(id)
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

