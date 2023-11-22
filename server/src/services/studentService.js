const read = require ('../db/read')
const {updateUsername, updateUserMajor, updateUserPhone, updateUserEmail, updateUserBio,
        updateUserPassword, updateUserProfilePic} = require ('../db/update')
const adds = require ('../db/obAdd')
const {searchItem} = require ('../db/db')
const deletes = require("../db/delete")
const Student = require ('../models/student')
const CustomError = require ('../utils/customError')
const bcrypt = require ("bcryptjs")
const USER = 'User'
const USERNAME = 'username'
const EMAIL = 'email'

class StudentService {
    // GET ALL
    static async getAll() {
        console.log("[ StudentService.getAll ]\n")
        // GET ALL STUDENT USERIDS FROM FIREBASE AS LIST
        const studentIds = await read.getStudents()
        console.log(studentIds)
        const propertyMap = {}
        let addOns = {}
        // POPULATE STUDENTS BY GETTING EVERY STUDENT USER BY USERID
        for (const key in studentIds) {
            console.log(key)
            propertyMap[key] = await read.getUser(key)
            // ATTACH THE FAVORITE TUTORS ARRAY TO STUDENT OBJECT
            addOns = await read.getStudent(key)
            propertyMap[key] = {...propertyMap[key], ...addOns}
        }
        console.log(propertyMap)
        return propertyMap
    }
    // GET ONE
    static async getOne(id) {
        console.log("\n[ StudentService.getOne ]\n")
        // SEARCH FOR USER W USERNAME
        const search = await searchItem(USER, USERNAME, id)
        const userId = Object.keys(search)[0]

        // USER IS FOUND, NOT NECESSARILY A STUDENT
        if (Object.keys(search).length > 0) {

            // GET STUDENT BASED ON USERID
            const studentAdds = await read.getStudent(userId)
            // USER IS A TUTOR
            if (student.userId === undefined) {
                throw new CustomError("User is not a student", 400)
            }
            // APPEND ADD ONS TO STUDENT OBJECT
            search[userId] = {...search[userId], ...studentAdds}
            return search
        }
        else
            throw new CustomError("User not found", 400)
    }
    // post: create student
    static async create(studentData){ 
        console.log("\n[ StudentService.create ]\n")
        // console.log("StudentService.create studentData: " + studentData + "\n")
        const data = JSON.parse(studentData)
        const userResult = await searchItem(USER, USERNAME, data.username)     // FIND IF ANOTHER USER HAS SAME USERNAME
        const emailResult = await searchItem(USER, EMAIL, data.email)
        
        // STUDENT WITH USERNAME ALREADY EXISTS
        if ( Object.keys(userResult).length > 0)
            throw new CustomError("Username already exists", 400)

        // STUDENT WITH EMAIL ALREADY EXISTS
        if ( Object.keys(emailResult).length > 0)
            throw new CustomError("Email already in use", 400)

        // HASH PASSWORD
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashedPassword = await bcrypt.hash(data.password, salt)
        data.password = hashedPassword

        console.log(salt)
        console.log(hashedPassword)
        
        let student = new Student()
        
        const propertyMap = Student.toObj();

        // Loop through the data object and set the corresponding properties
        for (const key in propertyMap) {
            if (data.hasOwnProperty(key)) {
                student[key] = data[key];
            } else  {
                // DEFAULT VALUE
                student[key] = propertyMap[key]
            }
        }
        // // LOOP THROUGH OBJ, ANY UNDEFINED REPLACE WITH NULL
        // for (const key in student) {
        //     if (student[key] === undefined)
        //         student[key] = propertyMap[key]
        // }
            
        // ADD NEW STUDENT TO DB
        console.log(student)
        const studentInfo = await adds.addStudent(student)
        console.log(studentInfo)
        return await this.getOne(data.username)
    }
    // patch: UPDATE STUDENT
    static async update(username, studentData) {
        try {
            console.log("\n[ StudentService.update ]\n")
            const data = JSON.parse(studentData)
            const result = await searchItem(USER, USERNAME, username)     
            
            // USER DOESNT EXIST
            if ( Object.keys(result).length === 0)
                throw new CustomError("User does not exist", 400)

            console.log("StudentService.update studentData: " + studentData + "\n")
            // GET USER ID
            const id = Object.keys(result)[0]

            // CHECK TO SEE IF USER IS A STUDENT
            const student = await read.getStudent(id)
            console.log(student)
            if (student.userId === undefined)
                throw new CustomError("User is not a student", 400) 
            console.log("Student id: " + id + "\n")
            
            // REPLACE OLD VALUES WTIH NEW FROM USERID
            if (data.password != null) {
                const saltRounds = 10
                const salt = bcrypt.genSaltSync(saltRounds)
                const hashedPassword = await bcrypt.hash(data.password, salt)
                updateUserPassword(id, hashedPassword)
            }
            if (data.userName != null)
                await updateUsername(id, data.userName)
            // if (data.courses != null)
            //     await updatecourses(id, data.courses)
            if (data.phone != null)
                await updateUserPhone(id, data.phone)
            if (data.email != null) {
                const emailResult = await searchItem(USER, emailResult, data.email)
                if (Object.keys(emailResult).length > 0)
                    throw new CustomError("Email already in use", 400)
                await updateUserEmail(id, data.email)
            }
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
        console.log("\n[ StudentService.delete ]\n")
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

