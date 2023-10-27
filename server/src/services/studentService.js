const { getUsers, getUser } = require ('../db/read')
const {updateUsername, updateUserMajor, updateUserPhone, updateUserEmail, updateUserBio,
        updateUserPassword, updateUserProfilePic} = require ('../db/update')
const {addStudent} = require ('../db/add')
const {searchItem} = require ('../db/db')
const deletes = require("../db/delete")

class StudentService {
    // LOGIN
    static async login (studentInfo) {
        // USE MAHIS INFO
    }
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
            if (Object.keys(search).length > 0)         // USER FOUND
                return search
            else
                return false                            // USER CANNOT BE FOUND
        }catch (e) {
            throw e
        }
    }
    static async getAppointments(id) {
        try {
            console.log("\n[ StudentService.getAppointments ]")
            const user = await searchItem('User', 'username', id)
            if (Object.keys(user).length === 0) {
                return null
            }
            const userid = Object.keys(user)[0]
            const appointments = await searchItem('Appointment', 'studentId', userid)
            console.log("\nuserid: " + userid)
            console.log("\appointments: " + appointments)
            return appointments
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

