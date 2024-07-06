const express = require("express")
const app  = express();
const cors = require("cors")
require("./db/conn")
const { signup, login, upload } = require("./controllers/control");


const port = process.env.PORT || 5000

app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(express.json())


app.post("/", signup)

app.post("/login", login)

app.post("/upload", upload)

app.listen(port, ()=>{
    console.log(`Listening to ${port}`)
})