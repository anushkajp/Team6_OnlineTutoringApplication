const Session = require("../models/session")
const {getAppointments, getAppointment} = require('../db/read')
const {addAppointment} = require('../db/obAdd')
const {searchItem} = require ('../db/db')
const { updateAppDateTime, updateAppLength, updateAppMedium, updateAppLocation, updateAppFeedback, updateAppTutorNotes, updateAppStudentNotes} = require ('../db/update')
const {updateUserHours} = require ('../db/update')
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
    //GET ALL APPOINTMENTS BY USER
    static async getAllAppointmentsByUser(id, path) {
        try {
            console.log("\n[ SessionService.getAllAppointmentsByUser ]")
            const user = await searchItem('User', 'username', id)
            console.log("\nuser: " + JSON.stringify(user))
            const userid = Object.keys(user)[0]
            if (Object.keys(user).length === 0) {
                return false
            }
            const appointments = await searchItem('Appointment', path, userid)
            console.log("\nappointments: " + JSON.stringify(appointments))
            return appointments
            
        }catch (e) {
            throw e
        }
    }   
     //CONFLICT FUNCTION
     static async checkConflict(newStart, newEnd, existingAppointment) {
        const existingStart = new Date(existingAppointment.dateTime);
        const existingEnd = new Date(existingStart.getTime() + existingAppointment.length * 60 * 1000);
    
        console.log('New Start:', newStart);
        console.log('New End:', newEnd);
        console.log('Existing Start:', existingStart);
        console.log('Existing End:', existingEnd);
    
        const isSameDate = (
            newStart.getFullYear() === existingStart.getFullYear() &&
            newStart.getMonth() === existingStart.getMonth() &&
            newStart.getDate() === existingStart.getDate()
        );
    
        console.log('Is Same Date:', isSameDate);
    
        // Check if it is on the same date
        if (isSameDate) {
            if ((newStart >= existingStart && newStart < existingEnd) ||
                (newEnd > existingStart && newEnd <= existingEnd) ||
                (newStart <= existingStart && newEnd >= existingEnd)) {
                console.log('Conflict Detected: Appointment conflicts with an existing appointment.');
                return true; // Conflict
            }
        }
    
        console.log('No Conflict Detected: Appointment does not conflict with existing appointments.');
        return false; // No conflict
    }
    
     // CREATE NEW APPOINTMENT
     static async create(appData){ 
        try {
            console.log("\nSessionService.create\n")
            const data = JSON.parse(appData)
           
            //retirieving student and tutor usernames
            const tutorUsername = data.tutorId
            const studentUsername = data.studentId
           
            //searching for the student and tutor via their username on the database
            const userTutor = await searchItem('User', 'username', tutorUsername)
            const userStudent = await searchItem('User', 'username', studentUsername)

            console.log(userTutor)
            console.log(userStudent)
            
            //getting student and tutor userIds
            const tutoruserid = Object.keys(userTutor)[0]
            const studentuserid = Object.keys(userStudent)[0]

            //const tutorAppointments = await searchItem('Appointment', 'tutorId', tutoruserid)
            //console.log('Type of tutorAppointments:', typeof tutorAppointments);
            const studentAppointments = await searchItem('Appointment', 'studentId', studentuserid)
            console.log('Type of studentAppointments:', typeof studentAppointments);
            const studentAppointmentsArray = Object.values(studentAppointments);

            //need to convert appointment length from minutes to hours
            const minutes = data.length
            const hours = minutes/ 60

            console.log(`Equivalent time in hours: ${hours}`)
            console.log(data.dateTime)

            const newAppointmentStartTime = new Date(data.dateTime);
            const newAppointmentEndTime = new Date(newAppointmentStartTime.getTime() + hours * 60 * 60 * 1000)

             /*for (const appointment of tutorAppointments) {
                if (SessionService.checkConflict(newAppointmentStartTime, newAppointmentEndTime, appointment)) {
                    throw new CustomError("Tutor has conflict for either the time or the day, appointmnet cannot be created", 400)
                }
            } */
            
            for (const appointment of studentAppointmentsArray) {
                if (SessionService.checkConflict(newAppointmentStartTime, newAppointmentEndTime, appointment)) {
                    console.log('Calling checkConflict with - newStart:', newAppointmentStartTime, 'newEnd:', newAppointmentEndTime, 'existingAppointment:', appointment);
                    throw new CustomError("Student has conflict for either the time or the day, appointmnet cannot be created", 400)
                }
            }           
            
            //update tutor hours
            if (userTutor.hours != null) {
                console.log(`Tutor hours: ${userTutor.hours}`)
                const tutorHours = userTutor.hours + hours;
                await updateUserHours(tutoruserid, tutorHours);
            } else {
                await updateUserHours(tutoruserid, hours);
            }

            //update student hours
            if (userTutor.hours != null) {
                console.log(`Tutor hours: ${userStudent.hours}`)
                const studentHours = userStudent.hours + hours
                await updateUserHours(studentuserid, studentHours)
            } else {
                await updateUserHours(studentuserid, hours)
            }
            
            let session = new Session()

            session.tutorId = tutoruserid;
            session.studentId = studentuserid;
                        
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
                // Skip tutorId and studentId
                if (key !== 'tutorId' && key !== 'studentId' && data.hasOwnProperty(key)) {
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
   //UPDATE SPECIFIC APPOINTMENT
   static async update(id, apptData) {
    try {
        console.log("\nSessionService.update\n")
        const data = JSON.parse(apptData)
        console.log("\nData has been parsed\n")

        const username = data.studentId
        const result = await searchItem(USER, USERNAME, username) 

        if ( Object.keys(result).length === 0)
        throw new CustomError("The userid does not exist", 400)

        const patchStudentId = Object.keys(result)[0]
        console.log("Updated Student id: " + patchStudentId + "\n")
        
        // IF NOT NULL, REPLACE OLD VALUES WTIH NEW FROM APPOINTMENTID
        //need to check if this should be done
        if (data.datetime != null)
            await updateAppDateTime(id, data.datetime)
        /*
        if (data.length != null)
            await updateAppLength(id, data.length)
        */
        // for the below 4 need to check if null should even be used, since 
        //when the appt is created these can be null
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
        //not sure if this works properly
        //not required and cannot change anymore
        /*
        if (data.studentId != null)
            await updateAppUserId(id, patchStudentId)*/            
        
        // Fetch the updated appointment and return
        return await getAppointment(id)

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