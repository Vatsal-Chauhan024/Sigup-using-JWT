import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { toast } from 'react-toastify'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import "../App.css"
import axios from 'axios'

const Login = () => {

    const [fullname, setFullName] = useState("")
    const [password, setPassword] = useState("")
    const [encrypt, setEncrypt] = useState(true)

    const handlefullname = (e) => {
        setFullName(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
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
        else if (password.length === 0) {
            toast.error("Fill Password", {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light"
            })
        }
        else {

try{
               await axios.post("http://localhost:5000/login", {
                    fullname, password
                }).then((response)=>{
                    if(response.data === "Crediationals are not matching"){
                        toast.error("Crediationals are not matching")
                    }
                    else if(response.data.message == "Login Successful"){
                        toast.success("Logged In", {
                            position: "top-right",
                            autoClose: 300,
                            closeOnClick: true,
                            pauseOnHover: false,
                            theme: "light"
                        })
                        setFullName('')
                        setPassword('')
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
                <div className='w-96 h-fit flex flex-col rounded-md shadow-lg py-12 mx-4 border-[1px] border-solid border-gray-200 bg-gray-200'>

                    <div className='flex flex-col float-left pl-4 mb-8'>
                        <h1 className='text-xl font-semibold'>Login</h1>
                        <span>to get started</span>
                    </div>
                    <form action="">
                        <div className='w-full flex flex-col items-center gap-8 px-4'>
                            <InputField
                                type="text"
                                value={fullname}
                                onChange={handlefullname}
                                placeholder="fullname"
                            />
                            <InputField
                                type={encrypt ? "password" : "text"}
                                value={password}
                                onChange={handlePassword}
                                placeholder="Password"
                            />
                            <Button value="Continue" onClick={handleSubmit} />
                        </div>
                        {password.length > 0 ? (
                            encrypt ? (
                                <AiFillEye
                                    className='eyeclass relative bottom-28 left-80  text-xl'
                                    onClick={handleVisible}
                                />
                            ) : (
                                <AiFillEyeInvisible
                                    className='eyeclass relative bottom-28 left-80  text-xl'
                                    onClick={handleVisible}
                                />
                            )
                        ) : ''}
                    </form>

                    <div className='relative w-full text-center text-sm top-6'>
                        <span>New User?{" "}</span><Link to="/register"><span className='font-semibold underline cursor-pointer hover:text-black text-gray-700'>Register</span></Link>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Login
