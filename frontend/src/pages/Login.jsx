import React, { useContext, useState } from 'react'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext.jsx';
import axios from "axios"

function Login() {


    const [showPassword, setShowPassword] = useState(false)

    let navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)

    const { serverUrl, userData, setUserData } = useContext(userDataContext)

    const handleLogin = async (e) => {
        e.preventDefault()
        setErr("")
        setLoading(true)
        try {
            let result = await axios.post(`${serverUrl}/api/auth/login`, {

                email: email,
                password: password
            }, { withCredentials: true })


            // console.log(result.data)
            setUserData(result.data)
            setLoading(false)
            navigate("/")



        } catch (error) {
            console.log(error)
            setUserData(null)
            setLoading(false)
            setErr(error.response.data.msg)
        }
    }

    return (
        <div className='w-full h-[100vh] bg-[#1e1e2f] flex justify-center items-center' >


            <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col justify-center items-center gap-[20px] px-[20px]' onSubmit={handleLogin}>

                <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Login to <span className='text-blue-400'>Virtual Assitant</span></h1>

                <input type="email" placeholder='Email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white text-[18px] placeholder-gray-300 px-[20px] py-[10px] rounded-full' value={email} onChange={(e) => setEmail(e.target.value)} required />

                <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>

                    <input type={showPassword ? 'text' : 'password'} placeholder='Password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]' value={password} onChange={(e) => setPassword(e.target.value)} required />

                    {!showPassword && <IoEye className='absolute top-[18px] right-[20px] text-white w-[25px] h-[25px] cursor-pointer' onClick={() => setShowPassword(true)} />}

                    {showPassword &&
                        <IoEyeOff className='absolute top-[18px] right-[20px] text-white w-[25px] h-[25px] cursor-pointer' onClick={() => setShowPassword(false)} />}




                </div>

                {err.length > 0 && <p className='text-red-500 text-[18px]'>{err}*</p>}

                <button className='min-w-[150px] mt-[30px] h-[60px] bg-white rounded-full text-black font-semibold text-[19px]' disabled={loading}>{loading ? `Loading...` : `Login`}</button>
                <p className='text-[white] text-[18px] cursor-pointer' onClick={() => navigate("/signup")}>want to create a new account ? <span className='text-blue-400'>Sign Up</span></p>


            </form>

        </div>
    )
}

export default Login
