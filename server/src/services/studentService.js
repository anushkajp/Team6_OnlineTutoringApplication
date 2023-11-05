const read = require ('../db/read')
const {updateUsername, updateUserMajor, updateUserPhone, updateUserEmail, updateUserBio,
        updateUserPassword, updateUserProfilePic} = require ('../db/update')
const adds = require ('../db/obAdd')
const {searchItem} = require ('../db/db')
const deletes = require("../db/delete")
const Student = require ('../models/student')
const CustomError = require ('../utils/customError')
const USER = 'User'
const USERNAME = 'username'
class StudentService {
    // GET ALL
    static async getAll() {
        // GET ALL USERS BACK IN DB AS LIST
        const studentIds = await read.getStudents()
        const propertyMap = {}
        for (const key in studentIds) {
            propertyMap[studentIds[key].userId] = await read.getUser(studentIds[key].userId)
        }
        console.log("StudentService.getAll() = " + JSON.stringify(propertyMap) + "\n")
        return propertyMap
    }
    // GET ONE
    static async getOne(id) {
        console.log("\nStudentService.getone\n")
        // SEARCH FOR USER W USERNAME
        const search = await searchItem(USER, USERNAME, id)
        console.log(await search)
        if (Object.keys(search).length > 0)
            return search
        else
            throw new CustomError("User not found", 400)
    }
    // post: create student
    static async create(studentData){ 
        console.log("\nStudentService.create\n")
        // console.log("StudentService.create studentData: " + studentData + "\n")
        const data = JSON.parse(studentData)
        const result = await searchItem(USER, USERNAME, data.username)     // FIND IF ANOTHER USER HAS SAME USERNAME
        console.log("\nStudentService.create result: " + result)
        
        // STUDENT WITH USERNAME ALREADY EXISTS
        if ( Object.keys(result).length > 0)
            throw new CustomError("The userid already exists", 400)
        
        let student = new Student()
        console.log(typeof student)
        
        // if (data.hasOwnProperty("firstName"))
        //     student.firstName = data.firstName
        // if (data.hasOwnProperty("lastName"))
        //     student.lastName = data.lastName
        // if (data.hasOwnProperty("middleName"))
        //     student.middleName = data.middleName
        // else
        //     student.middleName = null
        // if (data.hasOwnProperty("password"))
        //     student.password = data.password
        // if (data.hasOwnProperty("username"))
        //     student.username = data.username
        // if (data.hasOwnProperty("courses"))
        //     student.courses = data.courses;
        // else student.courses = []
        // if (data.hasOwnProperty("phone"))
        //     student.phone = data.phone
        // else student.phone = null
        // if (data.hasOwnProperty("email"))
        //     student.email = data.email
        // if (data.hasOwnProperty("major"))
        //     student.major = data.major
        // else student.major = null
        // if (data.hasOwnProperty("hours"))
        //     student.hours = data.hours
        // else student.hours = null
        // if (data.hasOwnProperty("longBio"))
        //     student.longBio = data.longBio
        // else student.longBio = null
        // if (data.hasOwnProperty("shortBio"))
        //     student.longBio = data.longBio
        // else student.shortBio = null
        // if (data.hasOwnProperty("pfp"))
        //     student.pfp = data.pfp
        // else student.pfp = null
        // student.userId = null
        const propertyMap = Student.toObj();

        // Loop through the data object and set the corresponding properties
        for (const key in propertyMap) {
            if (data.hasOwnProperty(key)) {
                student[key] = data[key];
            }
        }
        // LOOP THROUGH OBJ, ANY UNDEFINED REPLACE WITH NULL
        for (const key in student) {
            if (student[key] === undefined)
                student[key] = null
        }
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
    }
    // patch: UPDATE STUDENT
    static async update(username, studentData) {
        try {
            console.log("\nStudentService.update\n")
            const data = JSON.parse(studentData)
            const result = await searchItem(USER, USERNAME, username)     
            
            // STUDENT DOESNT EXIST
            if ( Object.keys(result).length === 0)
                throw new CustomError("The userid already exists", 400)
            console.log("StudentService.update studentData: " + studentData + "\n")
            const id = Object.keys(result)[0]
            console.log("Student id: " + id + "\n")
            
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
            
            return await read.getUser(id)
        } catch (e) {
            throw e;
        }
    } 
    // DELETE
    static async delete(id) {
        // FIND USERID FROM USERNAME
        console.log("\nStudentService.delete")
        const studentIds = await read.getStudents()
        let student = new Student;
        // GO THROUGH ALL USERIDS OF STUDENTS
        for (const key in studentIds) {
            student = await read.getUser(studentIds[key].userId)
            // IF USERNAME MATCHES ONE OF THE STUDENTS, DELETE
            if (student.username === id) {
                deletes.deleteStudent(studentIds[key].userId)
                return student
            }
        }
        // USERNAME DID NOT MATCH ANY STUDENT
        throw new CustomError("User not found", 400)
    }
}
module.exports = StudentService

