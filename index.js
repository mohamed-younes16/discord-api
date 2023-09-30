require("dotenv").config()
const path = require("path")
const Port = process.env.PORT || 5000
const express = require('express')
const cors = require("cors")
const allowedHeaders = require("./config/corsOptions")
const verifyJWT = require("./middleware/verifyJWT")
const cookies = require("cookie-parser");
const credentials = require("./middleware/credentials")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const connectToDB = require("./config/dbconfig")


const server = express()

connectToDB()

server.use(cookies());

server.use(credentials)

server.use(cors({origin:allowedHeaders,optionsSuccessStatus:200}))

server.use(express.urlencoded({ extended: false }));

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
server.use(bodyParser.json())

// routes _____________________________________________

server.use("/",require("./routes/root"))

server.use("/subdir",require("./routes/subdir"))

server.use("/register", require("./routes/register") )

server.use("/login", require("./routes/login") )

server.use("/refresh", require("./routes/refresh") )

server.use("/logout", require("./routes/logout") )



server.use("/emp", require("./routes/api/employees") )


// __________________________________________________________

server.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});


mongoose.connection.once('open', ()=> {
    console.log("connected #############################")
    server.listen(Port,()=>console.log(`listening on port ${Port}`)) 
})

process.on('uncaughtException',(e)=>console.error(e,"___________________________________"))    