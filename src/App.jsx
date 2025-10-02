import { useState } from 'react'
import { Login } from './components/accounts/Login'
import { SignUP } from './components/accounts/Signup'
import DataProvider from './context/dataProvider'
import { Homepage } from './components/home/Homepage'
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { CreatePost } from './components/create/CreatePost'
import { BlogDetails } from './components/details/BlogDetails'
import { UpdateDetails } from './components/create/UpdateDetails'

const PrivateRoute = ({isAuthenticated,...props})=>{
  return isAuthenticated
  ?
  <>
  <Navbar/>
  <Outlet/>
  </>
  :
  <>
  <Navigate replace to='/login'/>
  </>
}

function App() {
  const [login,setLogin] = useState('login')
  const [isAuthenticated,isUserAuthenticated] =useState(false)

  return (
    <DataProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>}/>
        <Route path='/signup' element={<SignUP/>}/>
        <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/' element={<Homepage/>}/>
        </Route>
        <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/create' element={<CreatePost/>} />
        </Route>
        <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/details/:id' element={<BlogDetails/>} />
        </Route>
        <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/update/:id' element={<UpdateDetails/>} />
        </Route>
        
      </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
