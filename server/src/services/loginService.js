const {searchItem} = require ('../db/db')
const USER = 'User'
const USERNAME = 'username'
const CustomError = require ('../utils/customError')
const bcrypt = require ("bcryptjs")

class LoginService {
    static async login (info) {
        const data = JSON.parse(info)
        const username = data.username
        const plainPassword = data.password
        const obj = await searchItem(USER, USERNAME, username)
        const user = Object.values(obj)[0]
        const userId = Object.keys(obj)[0]
        console.log(username)
        console.log(plainPassword)
        console.log(userId)
        if (user.username === username) {

            // Generate a salt
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);

            // Hash the password using the generated salt
            const hashedPassword = bcrypt.hashSync(plainPassword, salt);
            console.log(salt)
            console.log(hashedPassword)
            // PASSWORD MATCHES
            if (hashedPassword === user.password) {
                let type = await getTutor(userId)
                if (Object.keys(type).length>0)
                    return "tutor"
                type = await getStudent(userId)
                if (Object.keys(type).length>0)
                    return "student"
                throw new CustomError("User is not defined as tutor or student", 500)
            }

        }
        throw new CustomError("Username or password is incorrect", 400)
    }
}
module.exports = LoginService