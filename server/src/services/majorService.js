const express = require("express");
const router = express.Router();
// const Major = require("../models/major")
const reads = require ('../db/read')
class MajorService {
    static async getAll() {
        try {
            
            const majors = await reads.getMajors()
            return majors
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
module.exports = MajorService