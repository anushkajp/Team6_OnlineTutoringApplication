const express = require('express');
const app = express();
const PORT = 8000;

app.get("/testServer", (req, res)=>{
    res.send({
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

