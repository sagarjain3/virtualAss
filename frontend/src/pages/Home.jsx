import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ai from "../assets/ai.gif"
import userImg from '../assets/user.gif'
import { HiMenuAlt3 } from "react-icons/hi";
import { ImCross } from "react-icons/im";

function Home() {

    const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext)
    const navigate = useNavigate()
    const [listening, setListening] = useState(false)
    const [userText, setUserText] = useState("")
    const [aiText, setAiText] = useState("")
    const [assistantStarted, setAssistantStarted] = useState(false)
    const [ham, setHam] = useState(false)

    const isSpeakingRef = useRef(false)
    const recognitionRef = useRef(null)
    const isRecognizingRef = useRef(false)
    const synth = window.speechSynthesis

    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            setUserData(null)
        } catch (error) {
            setUserData(null)
            console.log(error)
        }
    }

    const speak = (text) => {
        try {
            const utterence = new SpeechSynthesisUtterance(text)
            const voices = speechSynthesis.getVoices()
            utterence.voice = voices.find(v => v.lang === 'en-US') || null

            isSpeakingRef.current = true
            utterence.onend = () => {
                setAiText("")
                isSpeakingRef.current = false
                startRecognition()
            }

            window.speechSynthesis.cancel()
            synth.speak(utterence)
        } catch (err) {
            console.error("Speech synthesis error", err)
        }
    }

    const handleCommand = (data) => {
        const { type, userInput, response } = data
        speak(response)

        if (type === 'google_search') {
            const query = encodeURIComponent(userInput)
            window.open(`https://www.google.com/search?q=${query}`, '_blank')
        }

        if (type === 'calculator_open') {

            window.open(`https://www.google.com/search?q=calculator`, '_blank')
        }

        if (type === 'instagram_open') {

            window.open(`https://www.instagram.com/`, '_blank')
        }

        if (type === 'facebook_open') {

            window.open(`https://www.facebook.com/`, '_blank')
        }

        if (type === 'weather-show') {

            window.open(`https://www.google.com/search?q=weather`, '_blank')
        }

        if (type === 'youtube_search' || type === 'youtube_play') {
            const query = encodeURIComponent(userInput)
            window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank')
        }





    }

    const startRecognition = () => {
        try {
            recognitionRef.current?.start()
            isRecognizingRef.current = true
            setListening(true)
        } catch (error) {
            if (!error.message.includes("start")) {
                console.log("Recognition error", error)
            }
        }
    }

    const stopRecognition = () => {
        recognitionRef.current?.stop()
        isRecognizingRef.current = false
        setListening(false)
    }

    const initRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.lang = "en-US"
        recognitionRef.current = recognition

        recognition.onstart = () => {
            isRecognizingRef.current = true
            setListening(true)
        }

        recognition.onend = () => {
            isRecognizingRef.current = false
            setListening(false)
        }

        recognition.onerror = (event) => {
            console.warn("Recognition error", event.error)
            isRecognizingRef.current = false
            setListening(false)

            if (event.error !== "aborted" && !isSpeakingRef.current) {
                setTimeout(() => startRecognition(), 1000)
            }
        }

        recognition.onresult = async (e) => {
            const transcript = e.results[e.results.length - 1][0].transcript.trim()
            console.log("heard:", transcript)

            if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
                setAiText("")
                setUserText(transcript)

                stopRecognition()

                const data = await getGeminiResponse(transcript)
                console.log("Gemini Response:", data)

                handleCommand(data)
                setAiText(data.response)
                setUserText("")
            }
        }
    }

    const handleStartAssistant = () => {
        initRecognition()
        setAssistantStarted(true)
        startRecognition()
    }

    useEffect(() => {
        window.speechSynthesis.onvoiceschanged = () => {
            // Pre-load voices if needed
        }

        return () => {
            stopRecognition()
            clearInterval() // optional
        }
    }, [])

    return (
        <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col gap-[15px] overflow-hidden'>

            {/* sid bar small device k lye */}
            <HiMenuAlt3 className=' cursor-pointer lg:hidden text-white w-[25px] h-[25px] absolute top-[20px] right-[25px]' onClick={() => setHam(true)} />

            <div className={`absolute top-0 bg-[#00000053] lg:hidden w-full h-full backdrop-blur-lg p-[20px] flex flex-col gap-[20px] items-start transition-transform ${ham ? "translate-x-0" : "translate-x-full"}`}>

                <ImCross className='cursor-pointer text-white w-[25px] h-[25px] absolute top-[20px] right-[25px]' onClick={() => setHam(false)} />


                <button className='min-w-[150px]  h-[60px] bg-white rounded-full text-black font-semibold text-[19px]  cursor-pointer ' onClick={handleLogOut}>Log Out</button>

                <button className='min-w-[150px]  h-[60px] bg-white rounded-full text-black font-semibold text-[19px]  px-[20px] py-[10px] cursor-pointer ' onClick={() => navigate("/customize")}>Customize Your Assistant</button>

                <div className='w-full h-[2px] bg-gray-500'></div>

                <h1 className='text-white text-[19px] font-semibold'>History</h1>


                {/* History div side bar me*/}

                <div className='w-full h-[400px] overflow-y-auto flex flex-col gap-[20px]'>
                    {userData.history?.map((his) => (

                        <span className='text-white text-[18px]'>{his}</span>

                    ))}

                </div>



            </div>

            <button className='min-w-[150px] mt-[30px] h-[60px] bg-white rounded-full text-black font-semibold text-[19px] absolute top-[20px] right-[20px] cursor-pointer hidden lg:block' onClick={handleLogOut}>Log Out</button>

            <button className='min-w-[150px] mt-[30px] h-[60px] bg-white rounded-full text-black font-semibold text-[19px] absolute top-[100px] right-[20px] px-[20px] py-[10px] cursor-pointer hidden lg:block' onClick={() => navigate("/customize")}>Customize Your Assistant</button>

            <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl'>
                <img src={userData?.assistantImage} alt="" className='h-full object-cover' />
            </div>

            <h1 className='text-blue-500 text-[18px] font-semibold'>I'm {userData.assistantName}</h1>
            {!aiText && <img src={userImg} className='w-[200px]' />}
            {aiText && <img src={ai} className='w-[200px]' />}

            <h1 className='text-white text-[18px] font-semibold text-wrap'>{userText ? userText : aiText ? aiText : null}</h1>

            {!listening && !isSpeakingRef.current && !userText &&
                <button
                    className='min-w-[150px] ml-[25px] h-[60px] bg-white rounded-full text-black font-semibold text-[19px]'
                    onClick={handleStartAssistant}
                >
                    Start Assistant
                </button>
            }

        </div>
    )
}

export default Home
