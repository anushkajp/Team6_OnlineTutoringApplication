// Run the server with npm index.js
//localhost:8000 (basic lol)
const { db, readPath, addUser, addTutor, addStudent } = require("./db");
// const {db, addItem,readPath,swaggerDocument,swaggerUi,fbApp} = require('./db');
const express = require('express');
const app = express();
const PORT = 8000;
//app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

app.get("/testServer", (req, res) => {

    (async () => {
        // addTutor("Bibi","Bamble","Duke","saltedhash","bibi4eva","Computer Science",[],"1233211234","bibi4eva@gmail.com","Long Bio",5,"Short Bio")
        // addStudent("Jason","Hemroid","Stevens","Jackintheboxmmm","jroid92","Mechanical Enginneering",[],"1233211234","jroid92@gmail.com","London bridge wouldnt have fallen on my watch. Always hustling")
        res.send({
            // for testing
            data: (
                // console.log(await readPath("User"))
                await readPath("User"),
                await readPath("Tutor"),
                await readPath("Student")
            )
        });

    })()
});

app.get('/', (req, res) => {
    res.send("Server working");
});
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
});

