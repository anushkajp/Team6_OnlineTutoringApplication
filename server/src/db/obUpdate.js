const { modifyItem } = require("./db")
const User = require("../models/user")
const Student = require("../models/student")
const Tutor = require("../models/tutor")
const Session= require("../models/session")
const Course = require("../models/course")
const Review = require("../models/review")

const updateFunctions = {};

for (i in new User()){
    const className ="User"
    const fieldName = i
    const functionName = "update"+className+i
    updateFunctions[functionName] = function(dbId, newValue){
        return modifyItem(className,dbId, fieldName, newValue)
    }

}
for (i in new Course()){
    const className= "Course"
    const fieldName = i
    const functionName = "update"+className+i
    updateFunctions[functionName] = function(dbId, newValue){
        return modifyItem(className,dbId, fieldName, newValue)
    }
}
for (i in new Review()){
    const className= "Review"
    const fieldName = i
    const functionName = "update"+className+i
    updateFunctions[functionName] = function(dbId, newValue){
        return modifyItem(className,dbId, fieldName, newValue)
    }
}
for (i in new Student()){
    const className= "Student"
    const fieldName = i
    const functionName = "update"+className+i
    if(!(i in new User())){
        updateFunctions[functionName] = function(dbId, newValue){
            return modifyItem(className,dbId, fieldName, newValue)
        }
    }else{
        updateFunctions[functionName] = function(dbId, newValue){
            return modifyItem("User",dbId, fieldName, newValue)
        }
    }
}
for (i in new Tutor()){
    const className= "Tutor"
    const fieldName = i
    const functionName = "update"+className+i
    if(!(i in new User())){
        updateFunctions[functionName] = function(dbId, newValue){
            return modifyItem(className,dbId, fieldName, newValue)
        }
    }else{
        updateFunctions[functionName] = function(dbId, newValue){
            return modifyItem("User",dbId, fieldName, newValue)
        }
    }
}
for (i in new Session()){
    const className= "Session"
    const fieldName = i
    const functionName = "update"+className+i
    updateFunctions[functionName] = function(dbId, newValue){
        return modifyItem(className,dbId, fieldName, newValue)
    }
}
module.exports= updateFunctions