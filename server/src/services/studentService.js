const express = require("express");
const router = express.Router();
const Student = require("../models/student")
const { getStudent, getStudents} = require ('../db/read')
const {updateUsername, updateUserMajor, updateUserPhone, updateUserEmail, updateUserBio,
        updateUserPassword, updateUserProfilePic} = require ('../db/update')
const {addTutor} = require ('../db/add')
// GET ALL
class StudentService {
    static async getAll() {
        // IF DB CAN FIND ID RETURN student OBJECT
        try {
            const student = await getStudents()
            console.log("StudentService.getStudents() = " + JSON.stringify(student, null))

            return JSON.stringify(student, null)    
        }catch (e) {
            return e
        }
    }
    // GET ONE
    static async getOne(id) {
        const student = new Student()
        try {
            student = await getStudent(id)
            console.log(student)
            return student
        }catch (e) {
            return e
        }
    }
    // POST
    static async create(student) {
        try {
            const newStudent = await addTutor(student.firstName, student.middleName,
                student.lastName, student.password, student.username, student.major,
                student.courses, student.phone, student.email, student.longBio, 
                student.rating, student.pfp)
            return newStudent
        }catch (e) {
            return e
        }
    }
    // PATCH
    static async update(student){ 
        try {
            if (student.userId != null)
                await updateUsername(student.id, student.userId)
            if (student.major != null)
                await updateUserMajor(student.id, student.major)
            if (student.password != null)
                await updateUserPassword(student.id, student.password)
            if (student.email != null)
                await updateUserEmail(student.id, student.email)
            if (student.longBio != null)
                await updateUserBio(student.id, student.longBio)
            if (student.phone != null)
                await updateUserPhone(student.id, student.phone)
            if (student.pfp != null)
                await updateUserProfilePic(student.id, student.pfp)
            return await getTutor(student.userId)
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

