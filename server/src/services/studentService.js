const express = require("express");
const router = express.Router();
const Student = require("../models/student")
const { getUsers, getUser } = require ('../db/read')
const {updateUsername, updateUserMajor, updateUserPhone, updateUserEmail, updateUserBio,
        updateUserPassword, updateUserProfilePic} = require ('../db/update')
const {addStudent, addUser} = require ('../db/add')
const {searchItem} = require ('../db/db')
const deletes=require("../db/delete")

class StudentService {
    // GET ALL
    static async getAll() {
        try {
            // GET ALL USERS BACK IN DB AS LIST
            const students = await getUsers()
            console.log("StudentService.getAll() = " + JSON.stringify(students) + "\n")
            return students
        }catch (e) {
            return e
        }
    }
    // GET ONE
    static async getOne(id) {
        try {
            console.log("\nStudentService.getone\n")
            const PATH = 'User'
            const ATTRIBUTE = 'username'
            // SEARCH FOR USER W USERNAME
            const search = await searchItem(PATH, ATTRIBUTE, id)
            console.log(await search)
            if (Object.keys(search).length > 0)         // USER FOUND
                return search
            else
                return false                            // USER CANNOT BE FOUND
        }catch (e) {
            return e
        }
    }
    // post: create student
    static async create(studentData){ 
        try {
            console.log("\nStudentService.create\n")
            const PATH = 'User'
            const ATTRIBUTE = 'username'
            // console.log("StudentService.create studentData: " + studentData + "\n")
            const data = JSON.parse(studentData)
            const result = await searchItem(PATH, ATTRIBUTE, data.userName)     // FIND IF ANOTHER USER HAS SAME USERNAME
            console.log("\nStudentService.create result: " + result)
            console.log("\nStudentService.create result.length: " + Object.keys(result).length)
            if ( Object.keys(result).length > 0)
                return false
            
            // ADD NEW STUDENT TO DB
            console.log("StudentService student:" + JSON.stringify(data) + "\n")
            const studentInfo = await addStudent(
                data.firstName, data.middleName,
                data.lastName, data.password, data.userName, 
                data.major, data.courses, data.phone, 
                data.email, data.longBio, data.rating, 
                data.pfp
            )
            console.log(studentInfo)
            const newStudent = await searchItem("User", "username", "deedee")
            console.log("newStudent: " + newStudent + "\n")
            console.log("StudentService studentInfo: " + JSON.stringify(studentInfo) + "\n")
            // FIND THE NEW STUDENT FROM DB WITH USERID
            return studentInfo
        }catch (e) {
            return e
        }
    }
    // patch: UPDATE STUDENT
    static async update(username, studentData) {
        try {
            console.log("\nStudentService.update\n")
            const PATH = 'User'
            const ATTRIBUTE = 'username'
            const data = JSON.parse(studentData)
            const result = await searchItem(PATH, ATTRIBUTE, data.userName)     
            if ( Object.keys(result).length === 0)                          // STUDENT DOESNT EXIST
                return false
            console.log("StudentService.update studentData: " + studentData + "\n")
            const id = Object.keys(result)[0]

            // IF NOT NULL, REPLACE OLD VALUES WTIH NEW FROM USERID
            if (data.password != null)
                await updatePassword(id, data.password)
            if (data.userId != null)
                await updateuserId(id, data.userId)
            if (data.userName != null)
                await updateUsername( data.userId)
            if (data.courses != null)
                await updatecourses(id, data.courses)
            if (data.phone != null)
                await updatephone(id, data.phone)
            if (data.email != null)
                await updateemail(id, data.email)
            if (data.major != null)
                await updatemajor(id, data.major)
            if (data.longBio != null)
                await updatelongBio(id, data.longBio)
            if (data.shortBio != null)
                await updateshortBio(id, data.shortBio)
            console.log("StudentService.update student: ", JSON.stringify(student) + "\n")
            
            return await getUser(id)
        } catch (e) {
            return e;
        }
    } 
    // DELETE
    static async delete(id) {
        try {
            // FIND USERID FROM USERNAME
            const PATH = 'User'
            const ATTRIBUTE = 'username'
            console.log("\nStudentService.delete")
            // const search = JSON.parse(await searchItem(PATH, ATTRIBUTE, id))
            const search = await searchItem(PATH, ATTRIBUTE, id)
            console.log("Username: " + Object.keys(search)[0])
            if (Object.keys(search).length > 0) {
                deletes.deleteUser(Object.keys(search)[0])
                return search
            }
            else
                return false
        }catch (e) {
            return e
        }
    }
}
module.exports = StudentService

