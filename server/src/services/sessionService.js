const express = require("express");
const router = express.Router();
const Session = require("../models/session")
const {getAppointment, getAppointments, getUserIds} = require('../db/read')

class SessionService {
    static getAll() {
        try {
            const session = new Session()
            session = getAppointments()
            return session
        } catch (err) {
            return err
        }
    }
    static getOne(id) {
        try {
            const session = new Session()
            const sessions = getUserIds()
            console.log(sessions)
            sessions = JSON.stringify(sessions)
            session = getAppointment(id)
            return session
        }catch (err){
            return err
        }
    }
    static create(id) {
        return 'hello'
    }
    static update(id) {
        return null
    }
    static delete(id) {
        return null;
    }
}
module.exports = SessionService