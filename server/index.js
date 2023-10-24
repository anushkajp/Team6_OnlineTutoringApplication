// Run the server with npm index.js
//localhost:8000 (basic lol)
const { searchItem } = require("./src/db/db");

const reads = require("./src/db/read")
const updates = require("./src/db/update")
const adds = require("./src/db/add")
const deletes=require("./src/db/delete")

// const {db, addItem,readPath,swaggerDocument,swaggerUi,fbApp} = require('./db');
const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors'); 
//app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the actual URL of your frontend
    methods: 'GET,PATCH,POST,DELETE',
    optionsSuccessStatus: 204, // Some legacy browsers (e.g., IE11) may not understand a 204 status
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
        // const search = await searchItem("User","username","bibilivesagain")
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
                appointment:appointment,
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
        const major = await adds.addMajor("Computer Science")
        const majorId =await major["id"]
        // const course = await adds.loadJSONFile("./2023_CS_Courses.json",majorId)
        const availability =
        {
            "monday":[
                {
                "start_time":"10:00",
                "end_time":"14:00"
                },
                {
                "start_time":"17:00",
                "end_time":"18:00"
                }
            ],
            "tuesday":[
                {
                "start_time":"10:00",
                "end_time":"14:00"
                },
                {
                "start_time":"17:00",
                "end_time":"18:00"
                }
            ]
        }

        


        const dateAvailable = new Date().toTimeString()
        const tutor = await adds.addTutor("Bibi",
                                            "Bamble",
                                            "Duke",
                                            "saltedhash",
                                            "bibi4eva",
                                            majorId,
                                            [],
                                            "1233211234",
                                            "bibi4eva@gmail.com",
                                            "Long Bio",
                                            "short bio",
                                            availability,
                                            [],
                                            null,
                                            5,
                                            true,
                                            5
                                            )
        const tutorId = await tutor["id"]
        const student = await adds.addStudent("Jason",
                                                "Hemroid",
                                                "Stevens",
                                                "Jackintheboxmmm",
                                                "jroid92",
                                                majorId,
                                                [],
                                                "1233211234",
                                                "jroid92@gmail.com",
                                                "London bridge wouldnt have fallen on my watch. Always hustling",
                                                "short bio",
                                                null
                                                )
        const studentId =await student["id"]
        const review = await adds.addReview(tutorId,
                                            studentId,
                                            0,
                                            "description"
                                            )
        const reviewId =await review["id"]
        const appointment = await adds.addAppointment(tutorId,
                                                        studentId,
                                                        dateAvailable,
                                                        10,
                                                        true,
                                                        "www.google.com",
                                                        [],
                                                        "Student Notes",
                                                        "Tutor Notes",
                                                        0,
                                                        "feedback"
                                                        )
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
                appointment:appointment

            }

            // console.log(await readPath("User"))


        });

    })()
});
app.get("/testDelete", (req, res) => {

    (async () => {
        for (i in await reads.getUsers()){
            console.log("UserID : " + i)
            deletes.deleteUser(i)
        }
        for(i in await reads.getAppointments()){
            deletes.deleteAppointment(i)
        }
        for(i in await reads.getMajors()){
            deletes.deleteMajor(i)
        }
        for(i in await reads.getCourses()){
            deletes.deleteCourse(i)
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
app.use('/session', sessionRouter)
app.use('/session/review', reviewRouter)
app.use('/tutor/availability', availabilityRouter)