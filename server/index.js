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
const loginRouter = require('./src/routes/login')
const tutorRouter = require('./src/routes/tutors')
const studentRouter = require('./src/routes/students')
const sessionRouter = require('./src/routes/sessions')
const reviewRouter = require('./src/routes/reviews')
const availabilityRouter = require('./src/routes/availability')
const logout = require('./src/routes/logout')

app.get(loginRouter, (req, res)=>{
    app.use('/login', tutorRouter)
});

// Assuming there is a login page
// POST handler 
app.post("/login", (req, res) => {
    const idToken = req.body.idToken.toString();
    // cookie will stay for 5 days before it gets destroyed
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
  
    admin
      .auth()
      .createSessionCookie(idToken, { expiresIn })
      .then(
        (sessionCookie) => {
          const options = { maxAge: expiresIn, httpOnly: true };// onlu backend can acces the cookie 
          res.cookie("session", sessionCookie, options);
          res.end(JSON.stringify({ status: "success" }));
        },
        (error) => {
          res.status(401).send("UNAUTHORIZED REQUEST!");
        }
      );
  });

  

  app.get("/logout", (req, res) => {
    res.clearCookie("session");
    res.redirect("/login");
  });

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

