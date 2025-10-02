import React, { useState } from 'react'
import { createContext } from 'react'

export const dataContext = createContext();
const DataProvider = ({children}) => {
    const [data,setData]= useState({name:'',username:''})
    const [posts,setPosts] = useState(null)
  return (
    <dataContext.Provider 
    value={{data,setData,posts,setPosts}}
    >
        {children}
    </dataContext.Provider>
  )
}

export default DataProvider;
