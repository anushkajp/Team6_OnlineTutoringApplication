// Run the server with npm index.js
//localhost:8000 (basic lol)
const {db,readPath,addUser} = require("./db");
// const {db, addItem,readPath,swaggerDocument,swaggerUi,fbApp} = require('./db');
const express = require('express');
const app = express();
const PORT = 8000;
//app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
app.get("/testServer", (req, res)=>{
    res.send({
        // for testing
        data:{
            studentName: "Tasnim Mahi",
            major: "Computer Science",
            grade: "junior"
        }
    });

        // addUser("Jan","Christian","Morgenstern","plaintextpasswordtobehashed","janmorgen","Computer Science",[],"1233211234","jcm18283@utdallas.edu","tutoring bc all my grades are ws",5)
        // console.log(readPath("User/-NfIvDEOwFTfjyAr9c73"))
        (async () => {
            console.log(await readPath("User"))
          })() 
            

    });

app.get('/', (req, res)=>{
    res.send("Server working");
});
app.listen(PORT, ()=>{
    console.log("Server is running on port " + PORT)
});

