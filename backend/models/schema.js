const mongoose = require("mongoose")
const express = require("express")

const LoginSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        min: 3
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: 8
    },
    confirmPassword: {
        type: String,
        required: true
    }
})

const LoginModel = new mongoose.model("Login", LoginSchema)

module.exports = LoginModel;