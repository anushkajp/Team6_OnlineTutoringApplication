const express = require("express");
const router = express.Router();
const Student = require("../models/student")
const { getStudent, getStudents} = require ('../db/read')
const {updateUsername, updateUserMajor, updateUserPhone, updateUserEmail, updateUserBio,
        updateUserPassword, updateUserProfilePic} = require ('../db/update')
const {addTutor} = require ('../db/add')
// GET ALL
class StudentService {
    static getAll() {
        // IF DB CAN FIND ID RETURN student OBJECT
        try {
            const student = getStudents()
            return student
        }catch (e) {
            return e
        }
    }
    // GET ONE
    static getOne(id) {
        const student = new Student()
        try {
            student = getStudent(id)
            return student
        }catch (e) {
            return e
        }
    }
    // POST
    static create(student) {
        try {
            const newStudent = addTutor(student.firstName, student.middleName,
                student.lastName, student.password, student.username, student.major,
                student.courses, student.phone, student.email, student.longBio, 
                student.rating, student.pfp)
            return newStudent
        }catch (e) {
            return e
        }
    }
    // PATCH
    static update(student){ 
        try {
            if (student.userId != null)
                updateUsername(student.id, student.userId)
            if (student.major != null)
                updateUserMajor(student.id, student.major)
            if (student.password != null)
                updateUserPassword(student.id, student.password)
            if (student.email != null)
                updateUserEmail(student.id, student.email)
            if (student.longBio != null)
                updateUserBio(student.id, student.longBio)
            if (student.phone != null)
                updateUserPhone(student.id, student.phone)
            if (student.pfp != null)
                updateUserProfilePic(student.id, student.pfp)
            return getTutor(student.userId)
        }catch (e) {
            return e
        }
    }
    // DELETE
    static delete(id) {
        const student = new Student()
        try {
            updateUsername(id, null)
            updateUserBio(id, null)
            updateUserEmail(id, null)
            updateUserPassword(id, null)
            updateUserMajor(id, null)
            updateUserProfilePic(id, null)
            return student
        }catch (e) {
            return e
        }
    }
}
module.exports = StudentService

