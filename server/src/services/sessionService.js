const Session = require("../models/session")
const {getAppointments, getAppointment} = require('../db/read')
const {addAppointment} = require('../db/obAdd')
const {searchItem} = require ('../db/db')
const { updateAppDateTime, updateAppLength, updateAppMedium, updateAppLocation, updateAppFeedback, updateAppUserId, updateAppTutorNotes, updateAppStudentNotes} = require ('../db/update')
const { deleteAppointment } = require("../db/delete")
const USER = 'User'
const USERNAME = 'username'
const CustomError = require ('../utils/customError')

class SessionService {
    // RETURNS ALL SESSIONS FROM ALL USERS
    static async getAll() {
        try {          
            const sessions = await getAppointments()
            console.log("SessionService.getAll() = " + JSON.stringify(sessions) + "\n")
            return sessions
        } catch (err) {
            throw err
        }
    }
    // RETURNS SPECIFIC SESSION BY SESSION ID
    static async getOne(id) {
        try {
            console.log("\n[ SessionService.getOne ]\n")
            const session = await getAppointment(id)
            // SESSION FOUND
            if (Object.keys(session).length > 0)
                return session
            // SESSION NOT FOUND
            else 
            throw new CustomError("Session not found", 400)
        }catch (err){
            throw err
        }
    }
    // CREATE NEW APPOINTMENT
    /*static async create(appData){ 
        try {
            console.log("\nSessionService.create\n")
            const data = JSON.parse(appData)
           
            let session = new Session()
                        
            const propertyMap = {
                
                tutorId : null,
                studentId : null,
                datetime : null,
                length : null,
                course : null,
                online : null,
                location : null,
                feedback : null,
                tutorNotes : null,
                studentNotes : null,
            };
    
            // Loop through the data object and set the corresponding properties
            for (const key in propertyMap) {
                if (data.hasOwnProperty(key)) {
                    session[key] = data[key];
                }
            }
            // LOOP THROUGH OBJ, ANY UNDEFINED REPLACCE WITH NULL
            for (const key in session) {
                if (session[key] === undefined)
                session[key] = null
            }              
                
            // ADD NEW SESSION TO DB
            console.log(session)
            const sessionInfo = await addAppointment(session)
            console.log("SessionInfo " + sessionInfo)
            return sessionInfo
        }catch (e) {
            throw e
        }
    }*/
    static async create(appData) {
        try {
            console.log("\nSessionService.create\n");
            const data = JSON.parse(appData);
    
            // Check if an appointment with the same student and datetime already exists
            const existingAppointments = await getAppointments(); 

            const existingAppointmentsArray = Array.from(existingAppointments);
    
            const duplicateAppointment = existingAppointmentsArray.find((appointment) => {
                return (
                    appointment.studentId === data.studentId &&
                    appointment.datetime === data.datetime
                );
            });
    
            if (duplicateAppointment) {
                // Appointment with the same student and datetime already exists
                throw new Error("Appointment with the same student and datetime already exists.");
            }
    
            let session = new Session();
    
            const propertyMap = {
                tutorId: null,
                studentId: null,
                datetime: null, // Set the datetime to null initially
                length: null,
                course: null,
                online: null,
                location: null,
                feedback: null,
                tutorNotes: null,
                studentNotes: null,
            };
    
            // Loop through the data object and set the corresponding properties
            for (const key in propertyMap) {
                if (data.hasOwnProperty(key)) {
                    session[key] = data[key];
                }
            }
    
            // If datetime is still null, set it to the current time
            if (session.datetime === null) {
                session.datetime = new Date().toTimeString();
            }
    
            // ADD NEW SESSION TO DB
            console.log(session);
            const sessionInfo = await addAppointment(session);
            console.log("SessionInfo " + sessionInfo);
            return sessionInfo;
        } catch (e) {
            throw e;
        }
    }
    
   //UPDATE SPECIFIC APPOINTMENT
   static async update(id, apptData) {
    try {
        console.log("\nSessionService.update\n")
        const data = JSON.parse(apptData)
        console.log("\nData has been parsed\n")

              
        // IF NOT NULL, REPLACE OLD VALUES WTIH NEW FROM APPOINTMENTID
        if (data.datetime != null)
            await updateAppDateTime(id, data.datetime)
        if (data.length != null)
            await updateAppLength(id, data.length)
        if (data.online != null)
            await updateAppMedium(id, data.online)
        if (data.location != null)
            await updateAppLocation(id, data.location)
        if (data.feedback != null)
            await updateAppFeedback(id, data.feedback)
        if (data.tutorNotes != null)
            await updateAppTutorNotes(id, data.tutorNotes)           
        if (data.studentNotes != null)
            await updateAppStudentNotes(id, data.studentNotes)
       
        /*if (data.studentId != null) {
            // Continue with the actions 
            const result = await searchItem(USER, USERNAME, data.studentId);
                
            if (Object.keys(result).length === 0) {
                throw new CustomError("The userid does not exist", 400);
            }
            else
              
            const patchStudentId = Object.keys(result)[0];
            console.log("Updated Student id: " + patchStudentId + "\n");

            if (data.studentId != null)   
                await updateAppUserId(id, patchStudentId) 
        }*/

        if (data.studentId != null) {
            // Continue with the actions 
            const result = await searchItem(USER, USERNAME, data.studentId);
        
            if (Object.keys(result).length === 0) {
                throw new CustomError("The userid does not exist", 400);
            } else {
                const patchStudentId = Object.keys(result)[0];
                console.log("Updated Student id: " + patchStudentId + "\n");
                await updateAppUserId(id, patchStudentId);
            }
        } 
        
        return await getAppointment(id);

    }catch (e) {
        throw e
    }
}
    // DELETE AN APPOINTMENT
    static async delAppointment(apptId) {
    try {
        const deletedAppt = await deleteAppointment(apptId);
        console.log("SessionService.delAppointment() = " + JSON.stringify(deletedAppt) + "\n")
            if (deletedAppt === null) {
                return null;
            }else {
                return deletedAppt;
            }
        }catch (error) {
                throw new Error("Error deleting the review: " + error.message);
        }
    }    
}
module.exports = SessionService