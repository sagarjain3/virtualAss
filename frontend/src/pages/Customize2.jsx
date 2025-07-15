import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext.jsx'
import axios from 'axios'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


function Customize2() {



    const { userData, backendImage, selectedImage, serverUrl, setUserData } = useContext(userDataContext)

    const [assistantName, setAssistantName] = useState(userData?.AssistantName || "")

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleUpdateAssistant = async () => {
        setLoading(true)
        try {

            let formData = new FormData()
            formData.append("assistantName", assistantName)

            if (backendImage) {
                formData.append("assistantImage", backendImage)
            } else {
                formData.append("imageUrl", selectedImage)
            }

            const result = await axios.post(`${serverUrl}/api/user/update`, formData, { withCredentials: true })
            console.log(result.data)
            setUserData(result.data)
            setLoading(false)
            navigate("/")

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px] relative'>

            <IoMdArrowBack className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={() => navigate("/customize")} />

            <h1 className='text-white text-[30px] text-center mb-[40px]'>Enter your <span className='text-red-400'>Assistant Name</span></h1>

            <input type="text" placeholder='Enter Name...' className='w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white text-[18px] placeholder-gray-300 px-[20px] py-[10px] rounded-full' required onChange={(e) => setAssistantName(e.target.value)} value={assistantName} />

            {assistantName && <button className='min-w-[300px] mt-[30px] h-[60px] bg-blue-500 rounded-full text-black font-semibold text-[19px] cursor-pointer' disabled={loading} onClick={handleUpdateAssistant} >{loading ? 'Loading...' : "Finally Create Your Assistant"}</button>}




        </div>
    )
}

export default Customize2
