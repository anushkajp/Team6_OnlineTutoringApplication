const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

const bodyParser = require("body-parser"); // parse as json objects

// security 
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const csrfMiddleWare = csrf({cookies: true});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleWare);





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

