const express = require("express");
const router = express.Router();
// const Major = require("../models/major")
const {searchItem} = require ('../db/db')
class CourseService {
    static async getAll(majorId) {
        try {
            
            const courses = await searchItem("Course","department",majorId)
            return courses
        } catch (err) {
            return err
        }
    }
    static getOne(id) {
        try {
        }catch (err){
            return err
        }
    }
    static create() {

    }
    static update() {

    }
    static delete() {

    }
}
module.exports = CourseService