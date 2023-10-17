const express = require("express");
const router = express.Router();
const Student = require("../models/student")
const { getStudent, getStudents, getUserIds, getUsers, getStudentIds} = require ('../db/read')
const {updateUsername, updateUserMajor, updateUserPhone, updateUserEmail, updateUserBio,
        updateUserPassword, updateUserProfilePic} = require ('../db/update')
const {addStudent} = require ('../db/add')
// GET ALL
class StudentService {
    static async getAll() {
        // IF DB CAN FIND ID RETURN student OBJECT
        try {
            const students = await getStudents()
            console.log("StudentService.getStudents() = " + students)
            return JSON.parse(students)
        }catch (e) {
            return e
        }
    }
    // GET ONE
    static async getOne(id) {
        const student = new Student()
        try {
            const studentInfo = await getStudents()
            console.log("StudentService getOne studentIds: " + studentInfo)
            let i = 0
            while (id.localCompare(studentInfo.indexOf(i).userId) != 0) {
                i++
            }
            const student = await getStudent()
            // for (i in studentIds.length) {
            //     if studentIds.
            // }
            // GET USERIDS
            // FIND USERID BASED ON USERNMAE
            // USE GET STUDENT WITH ID
            student = await getStudent(id)
            const students = await getUserIds()
            // students = JSON.stringify(students)
            constole.log("Students: " + students)
            // console.log(student)
            return student
        }catch (e) {
            return e
        }
    }
    // POST
    static async create(studentData) {
        try {
            console.log("StudentService.create studentData: " + studentData)
            const data = JSON.parse(studentData)
            const student = new Student();
            console.log("StudentData.firstname: ", studentData.firstname)
            student.firstName = data.firstName;
            student.lastName = data.lastName;
            student.middleName = data.middleName;
            student.password = data.password;
            student.userId = data.userId;
            student.userName = data.userId;
            student.courses = data.courses;
            student.phone = data.phone;
            student.email = data.email;
            student.major = data.major;
            student.longBio = data.longBio;
            student.shortBio = data.shortBio;
            console.log("StudentService.create student: ", JSON.stringify(student))
            const newStudent = await addStudent(
                student.firstName, student.middleName,
                student.lastName, student.password, student.userId, 
                student.major, student.courses, student.phone, 
                student.email, student.longBio, student.rating, 
                student.pfp
            );
    
            return newStudent;
        } catch (e) {
            return e;
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

