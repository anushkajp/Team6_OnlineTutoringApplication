const express = require("express");
const router = express.Router();
const Session = require("../models/session")
const read = require('../db/read')
const db = require ('../db/db')
const add = require('../db/add')

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
    static create(username, appointmetnInfo) {
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
    static update(id) {
        return null
    }
    static delete(id) {
        return null;
    }
}
module.exports = SessionService