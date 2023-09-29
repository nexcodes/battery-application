const mongoose = require("mongoose")
const connection = mongoose.connect(process.env.ATLAS_URI)
    .then(db =>{
        console.log("Database Connected")
        return db
    })
    .catch(err =>{
        console.log("connection Error")
    })

module.exports = connection