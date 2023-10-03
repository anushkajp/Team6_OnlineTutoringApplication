const express = require('express');
const app = express();

const admin = require("firebase-admin");
const serviceAcc = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tutortopia-7d536-default-rtdb.firebaseio.com"
  });

const PORT = process.env.PORT || 8000;

const bodyParser = require("body-parser"); // parse as json objects

// security 
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const csrfMiddleWare = csrf({cookies: true});

app.engine("html", require("ejs").renderFile);


app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleWare);

// Creating express.js middlewares
// takes any request and sets a cookie 
app.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
  });

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

//routing
const tutorRouter = require('./src/routes/tutors')
const studentRouter = require('./src/routes/students')
const sessionRouter = require('./src/routes/sessions')
const reviewRouter = require('./src/routes/reviews')
const availabilityRouter = require('./src/routes/availability')

app.get(tutorRouter, (req, res)=>{
    app.use('/tutor', tutorRouter)
});

app.get(studentRouter, (req, res)=>{
    app.use('/student', studentRouter)
});

app.get(sessionRouter, (req, res)=>{
    app.use('/session', sessionRouter)
});

app.get(reviewRouter, (req, res)=>{
    app.use('/session/review', reviewRouter)
});

app.get(availabilityRouter, (req, res)=>{
    app.use('/tutor/availability', availabilityRouter) 
});

app.listen(PORT, ()=>{
    console.log(`Listening on http://localhost:${PORT}`);
});

