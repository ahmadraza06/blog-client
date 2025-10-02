import React, { useState } from 'react'
import { API } from '../../service/api'
import { use } from 'react'
import { useNavigate } from 'react-router-dom'


const signUPintialvalue = {
    name:'',
    username:'',
    password:''
}
export const SignUP = ({setLogin}) => {
    
    const [userData, setUserData] = useState({
        name:'',
        username:'',
        password:''
    })
    const navigate = useNavigate()

    const userInputHandler = (e)=>{
        setUserData({...userData ,[e.target.name]:e.target.value})
    }

    
    const submitHandler  = (e)=>{
        e.preventDefault()
        console.log(userData)
    }

    const handleSignUp = async()=>{
        let response = await API.userSignup(userData);
        
        if(response.isSuccess){
            console.log("submitted")
            setUserData(signUPintialvalue);
            setLogin('login')
        }
        else{
            console.log("not")
        }
    }
  return (
    
    <div className='text-gray-200 w-screen h-screen bg-black flex flex-col justify-center items-center '>
        <form onSubmit={(e)=>{submitHandler(e)}}>
             <input 
             name='name'
             value={userData.name}
             onChange={userInputHandler} 
             type="text" 
             placeholder='Enter your Name' />
            <input 
            value={userData.username}
            name='username'
            onChange={userInputHandler} 
            type="text" 
            placeholder='Enter your username' />
            <input 
            value={userData.password}
            name='password'
            onChange={userInputHandler} 
            type="password" 
            placeholder='Enter Password' />

            <button onClick={()=>{handleSignUp()}} type='submit' >Sign Up</button>
            <p>OR</p>
            <button onClick={()=>{navigate('/login')}}>Already  an Account</button>
        </form>
    </div>
  )
}
