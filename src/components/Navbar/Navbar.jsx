import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  
  const navigate = useNavigate();
  // setTimeout(() => {
    
  //   navigate('/login')
  // },1000 * 60 * 15);
  
  const handleLogOut = ()=>{
    sessionStorage.setItem('accessToken','')
    sessionStorage.setItem('refreshToken','')
    navigate('/login')
  }

  return (
    <div>

<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className=" flex  items-center justify-between mx-auto p-4">
    
    
    <div className="  w-full  " id="navbar-default">
      <div className='flex   w-full justify-between items-conter'>

         <ul className="  h-full font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 flex flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <Link  to="/" 
          className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
            Home
            </Link>
        </li>
        <li>
          <Link to="/about" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
          About</Link>
        </li>
        <li>
          <Link to="/services" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
          Services</Link>
        </li>
        <li>
          <Link to="Pricing" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
          Pricing</Link>
        </li>
        <li>
          <Link to="Contact" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
          Contact</Link>
        </li>

      </ul>

        <div className=''>
      <button onClick={()=>{handleLogOut()}} type="button" className=" py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Log Out</button>

      </div>
      </div>
     
      

    </div>
  </div>
</nav>
</div>
  )
}
