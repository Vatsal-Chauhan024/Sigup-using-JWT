const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/form").then(()=>{
    console.log("Connection is Established Successfully")
}).catch((error)=>{
    console.log(error)
})