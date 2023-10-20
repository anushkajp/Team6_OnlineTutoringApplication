const express = require("express");
const router = express.Router();
const Student = require("../models/student")
const { getStudent, getStudents, getUserIds, getUsers, getStudentIds} = require ('../db/read')
const {updateUsername, updateUserMajor, updateUserPhone, updateUserEmail, updateUserBio,
        updateUserPassword, updateUserProfilePic} = require ('../db/update')
const {addStudent, addUser} = require ('../db/add')
const searchItem = require ('../db/db')
const deleteUser = require ('../db/delete')
// GET ALL
class StudentService {
    static async getAll() {
        // IF DB CAN FIND ID RETURN student OBJECT
        try {
            const students = JSON.stringify(await getUsers())
            console.log("StudentService.getAll() = " + students)
            return JSON.parse(students)
        }catch (e) {
            return e
        }
    }
    // GET ONE
    static async getOne(id) {
        const student = new Student()
        try {
            console.log("inside getOne student service \n")
            const PATH = 'User'
            const ATTRIBUTE = 'username'
            const find = await JSON.stringify(searchItem("User", "username", "deedee"))
            for (i in find){
                console.log(find[i] + "\n")
            }
            console.log("StudentService.getOne(id) find: " + find)
            console.log(typeof(find))
            
            return find
        }catch (e) {
            return e
        }
    }
    // POST
    static async update(studentData) {
        try {
            console.log("StudentService.update studentData: " + studentData + "\n")
            const data = JSON.parse(studentData)
            // FIND USERNAME
            const id = getUserIds(studentData.userId)
            if (data.firstName != null)
                student.firstName = data.firstname
            if (data.lastName != null)
                student.lastName = data.lastName;
            if (data.middleName != null)
                student.middleName = data.middleName;
            if (data.password != null)
                student.password = data.password;
            if (data.userId != null)
                student.userId = data.userId;
            if (data.userName != null)
                student.userName = data.userId;
            if (data.courses != null)
                student.courses = data.courses;
            if (data.phone != null)
                student.phone = data.phone;
            if (data.email != null)
                student.email = data.email;
            if (data.major != null)
                student.major = data.major;
            if (data.longBio != null)
                student.longBio = data.longBio;
            if (data.shortBio != null)
                student.shortBio = data.shortBio;
            console.log("StudentService.update student: ", JSON.stringify(student) + "\n")
            
            return await getUser(studentInfo.userId)
        } catch (e) {
            return e;
        }
    }    
    // PATCH
    static async create(studentData){ 
        try {
            console.log("StudentService.create studentData: " + studentData + "\n")
            const data = JSON.parse(studentData)
            const student = new Student();
            student.firstName = data.firstName;
            student.lastName = data.lastName;
            student.middleName = data.middleName;
            student.password = data.password;
            student.userId = data.userId;
            student.userName = data.userName;
            student.courses = data.courses;
            student.phone = data.phone;
            student.email = data.email;
            student.major = data.major;
            student.longBio = data.longBio;
            student.shortBio = data.shortBio;
            // ADD NEW STUDENT TO DB
            console.log("StudentService student:" + student+ "\n")
            const studentInfo = JSON.stringify(await addStudent(
                student.firstName, student.middleName,
                student.lastName, student.password, student.userName, 
                student.major, student.courses, student.phone, 
                student.email, student.longBio, student.rating, 
                student.pfp
            ))
            console.log("StudentService studentInfo: " + studentInfo + "\n")
            
            // FIND THE NEW STUDENT FROM DB WITH USERID
            
            const PATH = 'User'
            const ATTRIBUTE = 'username'
            const newStudent = await searchItem(PATH, ATTRIBUTE, JSON.stringify(student).userName)
            console.log("StudentService.create newStudent: " + newStudent+ "\n")
            return newStudent
        }catch (e) {
            return e
        }
    }
    // DELETE
    static async delete(id) {
        try {
            const deletedUser = JSON.stringify(await deleteUser(id))
            console.log("StudentService.delete(" + id + ") = " + deletedUser)
            return deletedUser
        }catch (e) {
            return e
        }
    }
}
module.exports = StudentService

