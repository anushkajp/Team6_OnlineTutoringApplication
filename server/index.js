// Run the server with npm index.js
//localhost:8000 (basic lol)
const { db, readPath, addUser } = require("./db");
// const {db, addItem,readPath,swaggerDocument,swaggerUi,fbApp} = require('./db');
const express = require('express');
const app = express();
const PORT = 8000;
//app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

app.get("/testServer", (req, res) => {
    (async () => {
        res.send({
            // for testing
            data: (
                // console.log(await readPath("User"))
                await readPath("User")
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

