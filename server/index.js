// Run the server with npm index.js
//localhost:8000 (basic lol)
const { searchItem } = require("./src/db/db");

const reads = require("./src/db/read")
const updates = require("./src/db/obUpdate")
const obAdds = require("./src/db/obAdd")
const adds= require("./src/db/add")
// const obAdds = require("./src/db/obAdd")
const deletes = require("./src/db/delete")
const User = require("./src/models/user")
const Tutor = require("./src/models/tutor")
const Student = require("./src/models/student")
const Availability = require("./src/models/availability")
const Session = require("./src/models/session")
const Review = require("./src/models/review")
const Course = require("./src/models/course")

// const {db, addItem,readPath,swaggerDocument,swaggerUi,fbApp} = require('./db');
const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors'); 
//app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Include OPTIONS method
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.get("/testInfo", (req, res) => {

    (async () => {
        // majorId = "Major"
        // await adds.loadJSONFile("./2023_CS_Courses.json",majorId)
        const user = await reads.getUsers()
        const tutor = await reads.getTutors()
        const appointment = await reads.getAppointments()
        const student = await reads.getStudents()
        const major = await reads.getMajors()
        const course = await reads.getCourses()
        const review = await reads.getReviews()
        const search = await searchItem("User","username","bibilivesagain")
        // console.log(await search())
        // for (i in searchItem("Tutor","courses", courseId)){
        //     console.log(i)
        // }
        res.send({
            // for testing
            data: {
                user: user,
                tutor: tutor,
                student: student,
                appointment: appointment,
                major: major,
                course: course,
                review:review,
                searchs: search

            }


            // console.log(await readPath("User"))


        });
        // console.log(searchItem())

    })()
});
app.get("/testPost", (req, res) => {

    (async () => {

        // updates.updateUsername("-NgePx3To2rYbOgfYW_g", null)
        const cs = await adds.addMajor("Computer Science")
        const csId = await cs["id"]
        const csCourses = await adds.loadJSONFile("./2023_CS_Courses.json",csId)
        const ee = await adds.addMajor("Electrical Engineering")
        const eeId = await ee["id"]
        const eeCourses = await adds.loadJSONFile("./2023_EE_Courses.json",eeId)
        const ce = await adds.addMajor("Computer Engineering")
        const ceId = ce["id"]
        const ceCourses = await adds.loadJSONFile("./2023_CE_Courses",ceId)
        const ecs= await adds.addMajor("Engineering and Computer Science")
        const ecsId = ecs["id"]
        const ecsCourses = await adds.loadJSONFile("./2023_ECS_Courses.json",ecsId)
        const majorId = "this is major"
        const availability =
        {
            "monday": [
                {
                    "start_time": "10:00",
                    "end_time": "14:00"
                },
                {
                    "start_time": "17:00",
                    "end_time": "18:00"
                }
            ],
            "tuesday": [
                {
                    "start_time": "10:00",
                    "end_time": "14:00"
                },
                {
                    "start_time": "17:00",
                    "end_time": "18:00"
                }
            ]
        }



        const dateAvailable = new Date().toTimeString()
        const tutorOb = new Tutor("firstName",
                                  "lastName",
                                  "middleName",
                                  "password",
                                  "Not yet known",
                                  "userName",
                                  ["course 1","course 2"],
                                  "phoneNumber",
                                  "email",
                                  majorId,
                                  20,
                                  "longBio",
                                  "shortBio",
                                  "profile pic",
                                  3,
                                  ["monday"],
                                  ["tuesday"],
                                  false)
        const tutor = await obAdds.addTutor(tutorOb)
        const tutorId = await tutor["id"]
        const studentOb = new Student("firstName",
                                        "lastName",
                                        "middleName",
                                        "password",
                                        "Not yet known",
                                        "userName",
                                        ["course 1","course 2"],
                                        "phoneNumber",
                                        "email",
                                        majorId,
                                        5,
                                        "longBio",
                                        "shortBio",
                                        "profile pic")
        const student = await obAdds.addStudent(studentOb)
        const studentId = await student["id"]

        const obReview = new Review(tutorId, studentId, 2, "This way")
        const review = await obAdds.addReview(obReview)
        const reviewId = await review["id"]
        const obAppointment = new Session(tutorId, studentId, dateAvailable,20, true,"location","notes","feedback")
        const appointment = await obAdds.addAppointment(obAppointment)
        // for(i in await searchItem("User","username","deedee")){
        //     deletes.deleteUser(i)
        // }

        res.send({
            // for testing
            data: {
                tutor: tutor,
                student: student,
                major: major,
                // course: course,
                review: review,
                appointment: appointment

            }

            // console.log(await readPath("User"))


        });

    })()
});

app.get("/testPostTemp", (req, res) => {

    (async () => {
        // user = new User(
        //     "Jason",
        //     "Hemroid",
        //     "Stevens",
        //     "Jackintheboxmmm",
        //     "",
        //     "jroid92",
        //     [],
        //     "1233211234",
        //     "jroid92@gmail.com",
        //     "majorId",
        //     5,
        //     "London bridge wouldnt have fallen on my watch. Always hustling",
        //     "short bio",
        //     null
        //     )
        // const reture = await obAdds.addUser(user)
        // user.userId= await reture["id"]
        // res.send({
        //     // for testing
        //     data: {
        //         user: user

        //     }




        // })
    })()



}

)

app.get("/testDelete", (req, res) => {

    (async () => {
        for (i in await reads.getUsers()) {
            console.log("UserID : " + i)
            deletes.deleteUser(i)
        }
        for (i in await reads.getAppointments()) {
            deletes.deleteAppointment(i)
        }
        for (i in await reads.getMajors()) {
            deletes.deleteMajor(i)
        }
        for (i in await reads.getCourses()) {
            deletes.deleteCourse(i)
        }
        for (i in await reads.getReviews()){
            deletes.deleteReview(i)
        }
        // for(i in await searchItem("User","username","deedee")){
        //     deletes.deleteUser(i)
        // }
        res.send(
            "Deleted database"
        );
        // res.send({
        //     // for testing
        //     data: {
        //         tutor: tutor,
        //         student: student,
        //         major: major,
        //         course: course

        //     }

        // console.log(await readPath("User"))


        // });

    })()
});
app.get('/', (req, res) => {
    res.send("Server working");
});
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
});

const tutorRouter = require('./src/routes/tutors')
const studentRouter = require('./src/routes/students')
const sessionRouter = require('./src/routes/sessions')
const reviewRouter = require('./src/routes/reviews')
const availabilityRouter = require('./src/routes/availability')
app.use('/tutor', tutorRouter)
app.use('/student', studentRouter)
app.use('/appointments', sessionRouter)
app.use('/appointments', sessionRouter)
app.use('/session/review', reviewRouter)
app.use('/tutor/availability', availabilityRouter)