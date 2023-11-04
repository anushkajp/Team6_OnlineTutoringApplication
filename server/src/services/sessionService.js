const express = require("express");
const Session = require("../models/session")
const {getAppointments, getAppointment} = require('../db/read')
const {addAppointment} = require('../db/obAdd')
const {searchItem} = require ('../db/db')
const { deleteAppointment } = require("../db/delete")

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
    /*
    static async createAppointment(appInfo) {
        try {
            const data = JSON.parse(appInfo)
            const appointment = add.addAppointment(data.tutorId, data.studentId, data.dateTime,
                data.length, data.online, data.location, data.courses,
                data.notes, data.rating, data.feedback)
            console.log("\nappointment: " + JSON.stringify(appointment))
            if (Object.keys(appointment).length > 0)
                return appointment
            else 
                return false
        }catch (e) {
            throw e
        }
    }*/

    static async create(appData){ 
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
    }

        // DELETE AN APPOINTMENT
        static async delAppointment(apptId) {
            try {
                const deletedAppt = await deleteAppointment(apptId);
                console.log("SessionService.delAppointment() = " + JSON.stringify(deletedAppt) + "\n")
                if (deletedAppt === null) {
                    return null;
                } else {
                    return deletedAppt;
                }
            } catch (error) {
                throw new Error("Error deleting the review: " + error.message);
            }
        }
      

}
module.exports = SessionService