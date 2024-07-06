
// const fileUploadModel = require("../models/fileUpload")
const LoginModel = require("../models/schema")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "KEY"


const signup = async(req, res) =>{
    
        const {fullname, email, password, confirmPassword} = req.body
    
        const data = {
            fullname:fullname,
            email:email,
            password:password,
            confirmPassword:confirmPassword
        }
    
        try{
            const validation = await LoginModel.findOne({email:email})
    
            if(validation){
                res.json("Already Exist")
            }
            else{
                const result = await LoginModel.insertMany([data])
                const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEY)
                res.json({token:token, message:"Added Successfully"})
            }
    
        }
        catch(error){
            console.log(error)
        }
}

const login = async(req, res) =>{
    const {fullname, password} = req.body

    try{
        const validation = await LoginModel.findOne({
            fullname:fullname,
            password:password
        }
        )
        if(validation){
            const token = jwt.sign({email: validation.email, id: validation._id}, SECRET_KEY)
            res.json({token:token, message:"Login Successful"})
            
        }
        else{
            res.json("Crediationals are not matching")
        }
    }
    catch(error){
        res.json(error)
    }

} 

const upload = async (req, res) => {
    const data = req.body;

    const dbdata = await fileUploadModel.insertMany([data])
    if(dbdata){
        res.send({message: "Uploaded", status: 200})
    }
}

module.exports= {login, signup, upload}