const Session = require("../models/session")
const {getAppointments, getAppointment} = require('../db/read')
const {getUser, getStudent, getTutor} = require ('../db/read')
const {addAppointment} = require('../db/obAdd')
const {searchItem} = require ('../db/db')
const {updateAppFeedback, updateAppTutorNotes, updateAppStudentNotes} = require ('../db/update')
const {updateUserHours} = require ('../db/update')
const { deleteAppointment } = require("../db/delete")
const USER = 'User'
const USERNAME = 'username'
const CustomError = require ('../utils/customError')

class SessionService {

    // RETURNS ALL SESSIONS FROM ALL USERS
    static async getAll() {
        try {
            const sessions = await getAppointments();
            const id = null

            //to make sure only usernames are returned
            const modifiedSessions = await Promise.all(Object.entries(sessions).map(async ([id, session]) => {

                const {tutorId, studentId, datetime, length, course, online, location, feedback, tutorNotes, studentNotes
                } = session
            
                const studentUsername = (await getUser(studentId))["username"];
                const tutorUsername = (await getUser(tutorId))["username"];

                // Create a new object with replaced properties
                const modifiedSession = {

                    id,
                    tutorUsername, 
                    studentUsername, 
                    datetime, 
                    length, 
                    course, 
                    online, 
                    location, 
                    feedback, 
                    tutorNotes, 
                    studentNotes
                };

                return modifiedSession;
            }));

            console.log("Modified Sessions: " + JSON.stringify(modifiedSessions) + "\n");
            return modifiedSessions;
        } catch (err) {
            throw err;
        }
    }

    // RETURNS SPECIFIC SESSION BY SESSION ID
    static async getOne(id) {
        try {
            console.log("\n[ SessionService.getOne ]\n")
            const session = await getAppointment(id)
            // SESSION FOUND
            if (Object.keys(session).length > 0){
 
                const studentUsername = (await getUser(session.studentId))["username"];
                const tutorUsername = (await getUser(session.tutorId))["username"];

                //to make sure only usernames are returned
                const returnSession = session;
                returnSession.studentId = studentUsername;
                returnSession.tutorId = tutorUsername;
                return returnSession
            }
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
            const userid = Object.keys(user)[0];

            if (Object.keys(user).length === 0) {
                throw new CustomError("User not found", 400);
            }

            const student = await getStudent(userid)
            const tutor = await getTutor(userid)

            console.log(student.userId)
            console.log(student.userId !== undefined)
            console.log("heheh")
            console.log(tutor)
            console.log(tutor.userId)
            console.log(tutor !== undefined)
            
            if (path === "studentId" && !(student.userId !== undefined)) {
                throw new CustomError("User is not a student", 400)
            }

            console.log(student.userId)
            console.log(student.userId !== undefined)

            if (path === "tutorId" && (student.userId !== undefined)) {
                throw new CustomError("User is not a tutor", 400)
            }

            const appointments = await searchItem('Appointment', path, userid)
            console.log("\nappointments: " + JSON.stringify(appointments))

            //to make sure only usernames are returned
            const modifiedAppointments = await Promise.all(Object.entries(appointments).map(async ([id, session]) => {

                const {tutorId, studentId, datetime, length, course, online, location, feedback, tutorNotes, studentNotes
                } = session
            
                const studentUsername = (await getUser(studentId))["username"];
                const tutorUsername = (await getUser(tutorId))["username"];

                // Create a new object with replaced properties
                const modifiedAppointment = {

                    id,
                    tutorUsername, 
                    studentUsername, 
                    datetime, 
                    length, 
                    course, 
                    online, 
                    location, 
                    feedback, 
                    tutorNotes, 
                    studentNotes
                };

                return modifiedAppointment;
            }));

            console.log("Modified Sessions: " + JSON.stringify(modifiedAppointments) + "\n");
            return modifiedAppointments;                       
        }catch (e) {
            throw e
        }
    }   
    // CONFLICT FUNCTION - only used for POST
    static async checkConflict(newStart, newEnd, existingAppointment) {

        const existingStart = new Date(existingAppointment.datetime);
        const existingEnd = new Date(existingStart.getTime() + existingAppointment.length * 60 * 1000);

        const isSameDate = (
            newStart.getFullYear() === existingStart.getFullYear() &&
            newStart.getMonth() === existingStart.getMonth() &&
            newStart.getDate() === existingStart.getDate()
        );

        // Check if it is only on the same date
        if (isSameDate) {
            // Rule 1: The start and end time of the new appointment cannot be equal to the start and end time of the existing appointment
            if (newStart.getTime() === existingStart.getTime() && newEnd.getTime() === existingEnd.getTime()) {
                console.log('Conflict Detected: Rule 1');
                return true; // Conflict
            }

            // Rule 2: Even if the start time of the new appt is less than the start time of the existing appointment,
            // the end time of the new appt cannot be in between the start and end time of the existing appt
            if (newStart.getTime() < existingStart.getTime() && newEnd.getTime() > existingStart.getTime() && newEnd.getTime() <= existingEnd.getTime()) {
                console.log('Conflict Detected: Rule 2');
                return true; // Conflict
            }

            // Rule 3: Even if the end time of the new appt is more than the end time of the existing appointment,
            // the start time of the new appt cannot be in between the start and end time of the existing appt
            if (newEnd.getTime() > existingEnd.getTime() && newStart.getTime() >= existingStart.getTime() && newStart.getTime() < existingEnd.getTime()) {
                console.log('Conflict Detected: Rule 3');
                return true; // Conflict
            }

            // Rule 4: The start time and end time of the new appointment cannot be in between the start and end time of the existing appointment.
            if (newStart.getTime() >= existingStart.getTime() && newEnd.getTime() <= existingEnd.getTime()) {
                console.log('Conflict Detected: Rule 4');
                return true; // Conflict
            }
        }
        else{
            console.log('No Conflict Detected: Appointment does not conflict with existing appointments.');
            return false;
        }

        /*
        console.log('Rule 1:', newStart.getTime() === existingStart.getTime() && newEnd.getTime() === existingEnd.getTime());
        console.log('Rule 2:', newStart.getTime() < existingStart.getTime() && newEnd.getTime() > existingStart.getTime() && newEnd.getTime() <= existingEnd.getTime());
        console.log('Rule 3:', newEnd.getTime() > existingEnd.getTime() && newStart.getTime() >= existingStart.getTime() && newStart.getTime() < existingEnd.getTime());
        console.log('Rule 4:', newStart.getTime() >= existingStart.getTime() && newEnd.getTime() <= existingEnd.getTime());
        */
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

            //getting student and tutor userIds
            const tutoruserid = Object.keys(userTutor)[0]
            const studentuserid = Object.keys(userStudent)[0]

            const tutorAppointments = await searchItem('Appointment', 'tutorId', tutoruserid)
            // Extract the inner values (appointments) from the returned object
            const tutorAppointmentsArray = Object.values(tutorAppointments).map(innerObj => innerObj);
            
            const studentAppointments = await searchItem('Appointment', 'studentId', studentuserid)
            // Extract the inner values (appointments) from the returned object
            const studentAppointmentsArray = Object.values(studentAppointments).map(innerObj => innerObj);
            
            // Convert appointment length from minutes to hours
            const minutes = data.length;
            const hours = minutes / 60;
                       
            const dateTimeString = data.datetime;
            const newAppointmentStartTime = new Date(dateTimeString);
            const newAppointmentEndTime = new Date(newAppointmentStartTime.getTime() + hours * 60 * 60 * 1000);
            
            let hasConflictTutor = false;
            let hasConflictStudent = false;

            //check if tutor has conflicts
            for (const existingAppointment of tutorAppointmentsArray) {
             
                const conflictResult = await SessionService.checkConflict(newAppointmentStartTime, newAppointmentEndTime, existingAppointment);
              
                console.log('Conflict Result:', conflictResult);
              
                if (conflictResult) {
                  hasConflictTutor = true;
                  console.log('Conflict Detected!');
                }
              }

            //check if student has conflicts
            for (const existingAppointment of studentAppointmentsArray) {
            
              const conflictResult = await SessionService.checkConflict(newAppointmentStartTime, newAppointmentEndTime, existingAppointment);
            
              console.log('Conflict Result:', conflictResult);
            
              if (conflictResult) {
                hasConflictStudent = true;
                console.log('Conflict Detected!');
              }
            }

            
            if (hasConflictStudent && !hasConflictTutor) {
                throw new CustomError("Student has a conflict for either the time or the day, appointment cannot be created", 400);
              } else if (!hasConflictStudent && hasConflictTutor) {
                throw new CustomError("Tutor has a conflict for either the time or the day, appointment cannot be created", 400);
              } else if (hasConflictStudent && hasConflictTutor) {
                throw new CustomError("Both student and tutor are unavailable, appointment cannot be created!!", 400);
              }

            //update tutor hours
            if (userTutor[tutoruserid].hours != null) {
                console.log(`Tutor hours: ${userTutor.hours}`)
                const tutorHours = userTutor[tutoruserid].hours + hours;
                await updateUserHours(tutoruserid, tutorHours);
            } else {
                await updateUserHours(tutoruserid, hours);
            }

            //update student hours
            if (userStudent[studentuserid].hours != null) {
                console.log(`Student hours: ${userStudent.hours}`)
                const studentHours = userStudent[studentuserid].hours + hours
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

            
            const returnSession = session;
            //const returnSession = Object.assign({}, session);
            returnSession.studentId = studentUsername;
            returnSession.tutorId = tutorUsername;
            console.log(session)
            console.log("heheh")
            console.log(returnSession)
            
            return returnSession
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

        //only these three can be updated!!
        if (data.feedback != null)
            await updateAppFeedback(id, data.feedback)
        if (data.tutorNotes != null)
            await updateAppTutorNotes(id, data.tutorNotes)
        if (data.studentNotes != null)
            await updateAppStudentNotes(id, data.studentNotes)          
        
        // Fetch the updated appointment and return
        return await getAppointment(id)

        }catch (e) {
            throw e
        }
    }
    // DELETE AN APPOINTMENT
    static async delAppointment(apptId) {
        try{
            console.log("\n[ SessionService.delete ]\n")
            let deletedAppt = new Session;
            deletedAppt = await getAppointment(apptId)
            console.log(deletedAppt)

            //only if appt exists it can be deleted
            if(deletedAppt.length > 0){

                //converting length to hours
                const minutes = deletedAppt.length;
                const hours = minutes / 60;

                //extracting student and tutor IDs
                const tutoruserid = deletedAppt.tutorId
                const studentuserid = deletedAppt.studentId

                //using get to get info about student and tutor
                const userTutor = await getUser(tutoruserid)
                const userStudent = await getUser(studentuserid)

                console.log(userTutor)
                console.log(userStudent)

                //update tutor hours
                if (userTutor.hours != null) {
                    const tutorHours = userTutor.hours - hours;
                    await updateUserHours(tutoruserid, tutorHours);
                } else {
                    throw new CustomError("Tutor has no hours to begin with", 400)
                }

                //update student hours
                if (userStudent.hours != null) {
                    const studentHours = userStudent.hours - hours
                    await updateUserHours(studentuserid, studentHours)
                } else {
                    throw new CustomError("Student has no hours to begin with", 400)
                }

                deleteAppointment(apptId)
                console.log("Appointment was deleted, returning the appt for display")                
                return deletedAppt
            }        
            throw new CustomError("Appointment was not found", 400)
        }catch (error) {
            throw new Error("Error deleting the review: " + error.message);
        }
    }
}
module.exports = SessionService