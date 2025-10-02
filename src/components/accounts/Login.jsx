import React, { useContext } from 'react'
import { API } from '../../service/api'
import { useState } from 'react'
import { dataContext } from '../../context/dataProvider'
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const loginInitialValue = {
  username:'',
  password:''
}
export const Login = ({isUserAuthenticated}) => {
  
  const [userData,setUserData] = useState(loginInitialValue)
  const [Error,setError] = useState('');
  const navigate = useNavigate();

  const {setData} = useContext(dataContext)
  
  useEffect(()=>{
    sessionStorage.setItem('accessToken','');
    sessionStorage.setItem('refreshToken','');
  },[])


  const handleChange = (e)=>{
    setUserData({...userData,[e.target.name]:e.target.value})
  }

  const handleLogin = async(e)=>{
    e.preventDefault();
    try{
      let response = await API.userLogin(userData);
      if(response.isSuccess){
        sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`)
        sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`)
        setData({name:response.data.name,username:response.data.username})
        
        setError('')
        navigate('/')
        isUserAuthenticated(true)
      }
      else{
        
      }
      
    }
    catch(error){
      setError("Something went wrong . Try Again")
    }
    
    
  }

  return (
    <div className='text-gray-200 w-screen h-screen bg-black flex flex-col justify-center items-center '>
        <form className=' flex flex-col items-center p-4 justify-center  gap-4  bg-gray-900 rounded-md w-96'  onSubmit={(e)=>{submitHandler(e)}}>
            <input onChange={(e)=>{handleChange(e)}} value={userData.username} name='username' type="text" placeholder='Enter your username' />
            <input onChange={(e)=>{handleChange(e)}} value={userData.password} name='password'  type="password" placeholder='Enter Password' />
            <p className='text-red-500 text-xs '>{Error}</p>
            <button onClick={(e)=>{handleLogin(e)}}>Login</button>
            <p>OR</p>
            <button onClick={()=>{navigate('/signup')}}>Create an Account</button>
        </form>
    </div>
  )
}
