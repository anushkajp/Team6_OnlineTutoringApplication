// Run the server with npm index.js
//localhost:8000 (basic lol)
const express = require('express');
const app = express();
const PORT = 8000;

app.get("/testServer", (req, res)=>{
    res.send({
        // for testing
        data:{
            studentName: "Tasnim Mahi",
            major: "Computer Science",
            grade: "junior"
        }
    });
});

app.get('/', (req, res)=>{
    res.send("Server working");
});
app.listen(PORT, ()=>{
    console.log("Server is running on port " + PORT)
});

const tutorRouter = require('./src/routes/tutors')
const studentRouter = require('./src/routes/students')
const sessionRouter = require('./src/routes/sessions')
app.use('/tutor', tutorRouter)
app.use('/student', studentRouter)
app.use('/session', sessionRouter)