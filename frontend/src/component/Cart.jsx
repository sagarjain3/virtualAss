import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext.jsx'

function Cart({ image }) {

    const { serverUrl, userData, setUserData, frontendImage, setFrontendImage, backendImage, setBackendImage,
        selectedImage, setSelectedImage
    } = useContext(userDataContext)

    return (
        <div className={` w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[blue] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-2 hover:border-white ${selectedImage == image ? "border-4 border-white" : null} `} onClick={() => {

            setSelectedImage(image)
            setBackendImage(null)
            setFrontendImage(null)

        }}>
            <img src={image} className='h-full object-cover' />
        </div>
    )
}

export default Cart
