const { getUsers, getUser } = require ('../db/read')
const {updateUsername, updateUserMajor, updateUserPhone, updateUserEmail, updateUserBio,
        updateUserPassword, updateUserProfilePic} = require ('../db/update')
// const {addStudent} = require ('../db/add')
const adds = require ('../db/obAdd')
const {searchItem} = require ('../db/db')
const deletes = require("../db/delete")
const { sameObject } = require ('../utils/utils')
const Student = require ('../models/student')
const CustomError = require ('../utils/customError')
class StudentService {
    // GET ALL
    static async getAll() {
        try {
            // GET ALL USERS BACK IN DB AS LIST
            const students = await getUsers()
            console.log("StudentService.getAll() = " + JSON.stringify(students) + "\n")
            return students
        }catch (e) {
            throw e
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
            if (Object.keys(search).length > 0)
                return search
            else
                throw new CustomError("User not found", 400)
        }catch (e) {
            throw e
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
            
            // STUDENT WITH USERNAME ALREADY EXISTS
            if ( Object.keys(result).length > 0)
                throw new CustomError("The userid already exists", 400)
            
            let student = new Student()
            console.log(typeof student)
            
            if (data.hasOwnProperty("firstName"))
                student.firstName = data.firstName
            if (data.hasOwnProperty("lastName"))
                student.lastName = data.lastName
            if (data.hasOwnProperty("middleName"))
                student.middleName = data.middleName
            else
                student.middleName = null
            if (data.hasOwnProperty("password"))
                student.password = data.password
            if (data.hasOwnProperty("username"))
                student.username = data.username
            if (data.hasOwnProperty("courses"))
                student.courses = data.courses;
            else student.courses = []
            if (data.hasOwnProperty("phone"))
                student.phone = data.phone
            else student.phone = null
            if (data.hasOwnProperty("email"))
                student.email = data.email
            if (data.hasOwnProperty("major"))
                student.major = data.major
            else student.major = null
            if (data.hasOwnProperty("hours"))
                student.hours = data.hours
            else student.hours = null
            if (data.hasOwnProperty("longBio"))
                student.longBio = data.longBio
            else student.longBio = null
            if (data.hasOwnProperty("shortBio"))
                student.longBio = data.longBio
            else student.shortBio = null
            if (data.hasOwnProperty("pfp"))
                student.pfp = data.pfp
            else student.pfp = null
            student.userId = null

            // TODO: get utils to work for same object

            // JSON OBJECT DOESNT MATCH STUDENT MODEL
            // const s = new Student()
            // if (!sameObject(studentData, JSON.stringify(s.toObj()))) {
            //     console.log("same obj false")
            //     throw new CustomError("The JSON object provided does not match Student model", 400)
            // }
                
                
            // ADD NEW STUDENT TO DB
            console.log(student)
            const studentInfo = await adds.addStudent(student)
            console.log("StudentInfo " + studentInfo)
            return studentInfo
        }catch (e) {
            throw e
        }
    }
    // patch: UPDATE STUDENT
    static async update(username, studentData) {
        try {
            console.log("\nStudentService.update\n")
            const PATH = 'User'
            const ATTRIBUTE = 'username'
            const data = JSON.parse(studentData)
            const result = await searchItem(PATH, ATTRIBUTE, username)     
            
            // STUDENT DOESNT EXIST
            if ( Object.keys(result).length === 0)
                return false
            console.log("StudentService.update studentData: " + studentData + "\n")
            const id = Object.keys(result)[0]
            console.log("Student id: " + id + "\n")
            console.log(typeof data.userName)
            console.log("\nNew Username: "+ data.userName + "\n") 
            // IF NOT NULL, REPLACE OLD VALUES WTIH NEW FROM USERID
            if (data.password != null)
                await updateUserPassword(id, data.password)
            if (data.userName != null)
                await updateUsername(id, data.userName)
            // if (data.courses != null)
            //     await updatecourses(id, data.courses)
            if (data.phone != null)
                await updateUserPhone(id, data.phone)
            if (data.email != null)
                await updateUserEmail(id, data.email)
            if (data.major != null)
                await updateUserMajor(id, data.major)
            if (data.longBio != null)
                await updateUserBio(id, data.longBio)
            if (data.shortBio != null)
                await updateshortBio(id, data.shortBio)
            if (data.pfp != null)
                await updateUserProfilePic(id, data.pfp)
            
            return await getUser(id)
        } catch (e) {
            throw e;
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
            throw e
        }
    }
}
module.exports = StudentService

