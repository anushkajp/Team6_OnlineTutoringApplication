const {searchItem} = require ('../db/db')
const USER = 'User'
const USERNAME = 'username'
const EMAIL = 'email'
const CustomError = require ('../utils/customError')
const bcrypt = require ("bcryptjs")
const read = require ('../db/read')

class LoginService {
    static async login (info) {
        const data = JSON.parse(info)
        const username = data.username
        const plainPassword = data.password
        const email = data.email
        const obj = await searchItem(USER, USERNAME, username)
        const obj2 = await searchItem(USER, EMAIL, email)
        const user = Object.values(obj)[0]
        const userId = Object.keys(obj)[0]
        const hashedPassword = user.password
        
        console.log(username)
        console.log(plainPassword)
        console.log(userId)
        console.log(hashedPassword)
        // CHECK IF PASSWORD COMPARES WITH HASHED PASSWORD
        if (bcrypt.compare(plainPassword, hashedPassword)) {
            // GET STUDENT BASED ON USERID
            const student = await read.getStudent(userId)
            const tutor = await read.getTutor(userId)
            console.log(Object.keys(tutor)[0])
            // USER IS A STUDENT
            if (student.userId === userId) {
                return "student"
            } else if (Object.keys(tutor).length > 0) {
                return "tutor"
            } else
                throw new CustomError("User is not a tutor or student", 500)

        }
        throw new CustomError("Username or password is incorrect", 400)
    }
}
module.exports = LoginService