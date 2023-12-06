const express = require("express");
const router = express.Router();
const Session = require("../models/session")
const read = require('../db/read')
const add = require('../db/add')
const {searchItem} = require ('../db/db')
const deletes=require("../db/delete")
class SessionService {
    // RETURNS ALL SESSIONS FROM ALL USERS
    static async getAll() {
        try {
            console.log("\n[ SessionService.getAll ]\n")
            const sessions = await read.getAppointments()
            return sessions
        } catch (err) {
            throw err
        }
    }
    // RETURNS SPECIFIC SESSION BY SESSION ID
    static async getOne(id) {
        try {
            console.log("\n[ SessionService.getOne ]\n")
            const session = await read.getAppointment(id)

            // SESSION FOUND
            if (Object.keys(session).length > 0)
                return session

            // SESSION NOT FOUND
            else 
                return false

        }catch (err){
            throw err
        }
    }
    static async getByUser(id, path) {
        try {
            console.log("\n[ SessionService.getAppointments ]")
            const user = await searchItem('User', 'username', id)
            console.log("\nuser: " + JSON.stringify(user))
            const userid = Object.keys(user)[0]
            if (Object.keys(user).length === 0) {
                return false
            }
            console.log("\nuserid: " + userid)
            const appointments = await searchItem('Appointment', path, userid)
            console.log("\nappointments: " + JSON.stringify(appointments))
            return appointments
            
        }catch (e) {
            throw e
        }
    }
    // CREATE NEW APPOINTMENT
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
    }
    // UPDATE EXISTING APPOINTMENT
    static async update(id) {
        try {
            const userid = Object.keys(await db.searchItem('Tutor', 'username', usernamem))[0]
            if (userid == null) {
                return false
            }
            const appointment = add.addAppointment(userid, null, appointmentInfo.date,
                appointmentInfo.length, appointmentInfo.online, appointmentInfo.location,
                appointmentInfo.tutorNotes, appointmentInfo.studentNotes, appointmentInfo.rating,
                appointmentInfo.review)
            return appointment
        }catch (e) {
            throw e
        }
    }
    static delete(id) {
        return null;
    }
}
module.exports = SessionService