import React, { useContext, useRef, useState } from 'react'
import Cart from '../component/Cart.jsx'
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/authBg.png'
import image4 from '../assets/image4.png'
import image5 from '../assets/image5.png'
import image6 from '../assets/image6.jpeg'
import image7 from '../assets/image7.jpeg'
import { IoDuplicateOutline } from "react-icons/io5";
import { userDataContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";



function Customize() {

    const { serverUrl, userData, setUserData, frontendImage, setFrontendImage, backendImage, setBackendImage,
        selectedImage, setSelectedImage
    } = useContext(userDataContext)

    const inputImage = useRef()
    const navigate = useNavigate()

    const handleImage = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)

        setFrontendImage(URL.createObjectURL(file))
    }

    return (
        <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px] '>

            <IoMdArrowBack className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={() => navigate("/")} />

            <h1 className='text-white text-[30px] text-center mb-[40px]'>Select your <span className='text-red-400'>Assistant Image</span></h1>

            <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>
                <Cart image={image1} />
                <Cart image={image2} />
                <Cart image={image3} />
                <Cart image={image4} />
                <Cart image={image5} />
                <Cart image={image6} />
                <Cart image={image7} />

                {/* khud se image upload k lye */}
                <div className={` w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[blue] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-2 hover:border-white flex items-center justify-center ${selectedImage == "input" ? "border-4 border-white" : null} `} onClick={() => {


                    inputImage.current.click()
                    setSelectedImage("input")

                }}>

                    {!frontendImage && <IoDuplicateOutline className='text-white w-[25px] h-[25px]' />}

                    {frontendImage && <img src={frontendImage} className='h-full object-cover' />}

                    <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage} />

                </div>


            </div>
            {selectedImage && <button className='min-w-[150px] mt-[30px] h-[60px] bg-white rounded-full text-black font-semibold text-[19px] cursor-pointer' onClick={() => navigate("/customize2")}>Next</button>}

        </div>
    )
}

export default Customize

