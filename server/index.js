const express = require('express')
const app = express()
const cors = require("cors")
require('dotenv').config({path: './config.env'})
const port = process.env.PORT || 5000;

// use middleware
app.use(cors())
app.use(express.json())

// Monodb connection
const connection = require("./db/connection.js")


app.get('/', function (req, res) {
  res.send('Hello World')
})

// using routes
app.use(require('./Routes/route'))


connection.then(db=>{
    if(!db) return process.exit(1)
    app.listen(port , ()=>{
        console.log(`Server is running on port: http://localhost:${port}`)
    })
    app.on('error', error=>{
        console.log(`Failed to connect with HTTP Server : ${error}`)
    })
})
.catch(err =>{
    console.log("Connection Failed." , err)
})

module.exports = app;