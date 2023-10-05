// Run the server with npm index.js
//localhost:8000 (basic lol)
const { readPath } = require("./src/db/db");

const reads = require("./src/db/read")
const updates = require("./src/db/update")
const adds = require("./src/db/add")

// const {db, addItem,readPath,swaggerDocument,swaggerUi,fbApp} = require('./db');
const express = require('express');
const app = express();
const PORT = 8000;
//app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

app.get("/testInfo", (req, res) => {

    (async () => {
        const user = await readPath("User")
        const tutor = await readPath("Tutor")
        const student = await readPath("Student")
        const major = await readPath("Major")
        const course = await readPath("Course")
        // addTutor("Bibi","Bamble","Duke","saltedhash","bibi4eva","Computer Science",[],"1233211234","bibi4eva@gmail.com","Long Bio",5,"Short Bio")
        // addStudent("Jason","Hemroid","Stevens","Jackintheboxmmm","jroid92","Mechanical Enginneering",[],"1233211234","jroid92@gmail.com","London bridge wouldnt have fallen on my watch. Always hustling")
        // const major = await addMajor("Computer Science")
        // majorId = major["id"]
        // const course = await addCourse(majorId,"Computer Networks","CS4370",3)
        res.send({
            // for testing
            data: {
                user:user,
                tutor:tutor,
                student:student,
                major:major,
                course:course

            }

                // console.log(await readPath("User"))

            
        });

    })()
});
app.get("/testPost", (req, res) => {

    (async () => {
        
        updates.updateUsername("-NfS5TKXiLFSPaj5cJPq","bibilivesagain")
        // adds.addTutor("Bibi","Bamble","Duke","saltedhash","bibi4eva","Computer Science",[],"1233211234","bibi4eva@gmail.com","Long Bio",5,"Short Bio")
        // adds.addStudent("Jason","Hemroid","Stevens","Jackintheboxmmm","jroid92","Mechanical Enginneering",[],"1233211234","jroid92@gmail.com","London bridge wouldnt have fallen on my watch. Always hustling")
        // const major = await adds.addMajor("Computer Science")
        // majorId = major["id"]
        // const course = await adds.addCourse(majorId,"Computer Networks","CS4370",3)
        res.send({
            // for testing
            data: {
                user:user,
                tutor:tutor,
                student:student,
                major:major,
                course:course

            }

                // console.log(await readPath("User"))

            
        });

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