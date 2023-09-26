// Run the server with npm index.js
//localhost:8000 (basic lol)
const {db, addItem,readPath} = require('./db');
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
    
        const postData={
            username:"janmorgen",
            major: "Computer Science",
            courses: [],
            phone: "1233211234",
            email:"jcm191123@utdallas.edu",
            longBio:"why would i need tutoring if all my grades are Ws",
            firstName:"Jan",
            lastName:"Morgenstern",
            middleName:"Christian",
            password:"plaintextpasswordtobehashed",
            rating:5
        }
        addItem("test/User",postData);
});

app.get('/', (req, res)=>{
    res.send("Server working");
});
app.listen(PORT, ()=>{
    console.log("Server is running on port " + PORT)
});

