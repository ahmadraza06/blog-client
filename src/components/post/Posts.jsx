import React from 'react'
import { useEffect } from 'react'
import { API } from '../../service/api'
import { useState } from 'react'
import { Post } from './Post'
import {  Link, useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { dataContext } from '../../context/dataProvider'

export const Posts = () => {
    //const [posts,setPosts] = useState(null)
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category');
    const {posts,setPosts} = useContext(dataContext)
    useEffect(()=>{
        const getPosts = async()=>{
            try{
                const response = await API.getPosts({category:category?category:''});
                setPosts(response.data);

            }
            catch(error){
                console.log("Error in fetching Posts")
            }
            

        }
        getPosts()
    },[category])
  return (
    <div className='p-2 flex gap-2  overflow-x-auto  w-3/4'>
        
        {posts && posts.length>0 ? posts.map((post)=>
        <Link key={post._id} to={`/details/${post._id}`}>
            <Post  post={post}/>
        </Link>
        ):<div>No Blog Available</div>}
        
    </div>
  )
}
