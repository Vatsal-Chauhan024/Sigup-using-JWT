import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { toast } from 'react-toastify'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import "../App.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [fullname, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [encrypt, setEncrypt] = useState(true)
    const navigate = useNavigate();

    const handleFullName = (e) => {
        setFullName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }
    const handleVisible = () => {
        setEncrypt(!encrypt)
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        if (fullname.length === 0) {
            toast.error("Fill fullname", {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
            })
        }
        else if (email.length === 0) {
            toast.error("Fill Email", {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
            })
        }
        else if (password.length === 0) {
            toast.error("Fill Password", {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light"
            })
        }
        else if (confirmPassword.length === 0) {
            toast.error("Fill ConfirmPassword", {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light"
            })
        }
        else if (confirmPassword !== password) {
            toast.info("Password and Confirm Password didn't matched", {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light"
            })
        }
        else {

            try{
               await axios.post("http://localhost:5000/", {
                    fullname, email, password, confirmPassword
                }).then((response)=>{
                    if(response.data === "Already Exist"){
                        toast.error("Email Already Exist")
                    }
                    else if(response.data.message == "Added Successfully"){
                        toast.success("Form Submitted", {
                            position: "top-right",
                            autoClose: 300,
                            closeOnClick: true,
                            pauseOnHover: false,
                            theme: "light"
                        })
                        setFullName('')
                        setEmail('')
                        setPassword('')
                        setConfirmPassword('')
                        navigate("/login")
                    }
                })
            }
            catch(error){
                console.log(error)
            }
        }
    }

    return (
        <>

            <div className='w-full h-screen flex justify-center items-center'>
                <div className='w-96 h-fit flex flex-col bg-white rounded-md shadow-lg py-12 mx-4 border-[1px] border-solid border-gray-200'>

                    <div className='flex flex-col float-left pl-4 mb-8'>
                        <h1 className='text-xl font-semibold'>Register</h1>
                        <span>to get started</span>
                    </div>
                    <form action="">
                        <div className='w-full flex flex-col items-center gap-8 px-4'>
                            <InputField
                                type="text"
                                value={fullname}
                                onChange={handleFullName}
                                placeholder="fullname"
                            />
                            <InputField
                                type="email"
                                value={email}
                                onChange={handleEmail}
                                placeholder="Email"
                            />
                            <InputField
                                type={encrypt ? "password" : "text"}
                                value={password}
                                onChange={handlePassword}
                                placeholder="Password"
                            />
                            <InputField
                                type={encrypt ? "password" : "text"}
                                value={confirmPassword}
                                onChange={handleConfirmPassword}
                                placeholder="ConfirmPassword"
                            />
                            <Button value="Continue" onClick={handleSubmit} />
                        </div>
                        {password.length > 0 ? (
                            encrypt ? (
                                <AiFillEye
                                    className='eyeclass relative bottom-48 left-80  text-xl'
                                    onClick={handleVisible}
                                />
                            ) : (
                                <AiFillEyeInvisible
                                    className='eyeclass relative bottom-48 left-80  text-xl'
                                    onClick={handleVisible}
                                />
                            )
                        ) : ''}



                        {confirmPassword.length > 0 ? (
                            encrypt ? (
                                <AiFillEye
                                    className='eyeclass relative bottom-[8.4rem] left-80  text-xl'
                                    onClick={handleVisible}
                                />
                            ) : (
                                <AiFillEyeInvisible
                                    className='eyeclass relative bottom-[8.4rem] left-80  text-xl'
                                    onClick={handleVisible}
                                />
                            )
                        ) : ''}

                    </form>

                    <div className='relative w-full text-center text-sm top-6'>
                        <span>Already registered? {" "}</span><Link to="/login"><span className='font-semibold underline cursor-pointer hover:text-black text-gray-700'>Login</span></Link>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Register
