const express = require("express");
const router = express.Router();
const Student = require("../models/student")
const { getUsers, getUser } = require ('../db/read')
const {updateUsername, updateUserMajor, updateUserPhone, updateUserEmail, updateUserBio,
        updateUserPassword, updateUserProfilePic} = require ('../db/update')
const {addStudent, addUser} = require ('../db/add')
const {searchItem} = require ('../db/db')
const {deleteUser} = require ('../db/delete')
// GET ALL
class StudentService {
    static async getAll() {
        // IF DB CAN FIND ID RETURN student OBJECT
        try {
            const students = await getUsers()
            console.log("StudentService.getAll() = " + JSON.stringify(students) + "\n")
            return students
        }catch (e) {
            return e
        }
    }
    // GET ONE
    // static getOne(id) {
        static async getOne(id) {
            
            try {
                // FIND USERID FROM USERNAME
                    console.log("\nInside getone \n")
                    console.log(typeof id)
                    const search = await searchItem("User","username",'deedee')
                    console.log(await search)
                
                
                // console.log("inside getOne student service \n")
                // const PATH = 'User'
                // const ATTRIBUTE = 'username'
                // const find = JSON.stringify(await searchItem("User", "username", "deedee"))
                // for (i in find){
                //     console.log(find[i] + "\n")
                // }
                // console.log("StudentService.getOne(id) find: " + find)
                // console.log(typeof(find))
    
                // RETURN USER OBJECT FROM DB
                // const user = await getUser(userid)
                return search
            }catch (e) {
                return e
            }
        }
    // }
    // POST
    static async update(username, studentData) {
        try {
            console.log("StudentService.update studentData: " + studentData + "\n")
            const data = JSON.parse(studentData)

            // FIND USERIDS
            const search = await searchItem("User","username",username)
            

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
            console.log("StudentService student:" + JSON.stringify(student) + "\n")
            const studentInfo = await addStudent(
                student.firstName, student.middleName,
                student.lastName, student.password, student.userName, 
                student.major, student.courses, student.phone, 
                student.email, student.longBio, student.rating, 
                student.pfp
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

