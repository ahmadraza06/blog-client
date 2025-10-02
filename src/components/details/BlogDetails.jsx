import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useContext  } from 'react';
import { dataContext } from '../../context/dataProvider';
import { useEffect } from 'react';
import {FaEdit} from 'react-icons/fa'
import {MdDelete } from 'react-icons/md'
import { API } from '../../service/api';
import { useNavigate } from 'react-router-dom';

export const BlogDetails = () => {
    const {id} = useParams('id');
    const {posts} = useContext(dataContext)

    const post = posts.filter((post)=>post._id===id);
    const navigate = useNavigate();

    const handleDelete = async()=>{
        try{
            await API.deletePost({id:id});
            alert("Post Deleted")
            navigate('/')
        }
        catch(error){
            console.log("error : ",error.message)
        }
    }

    return (
        
        <div className='flex flex-col  items-center p-3'>
            <div className='image w-200 border rounded-2xl'>
                <img className='w-full h-100 border rounded-2xl' src={post[0].picture} alt="" />
            </div>
            <div className='flex p-5 w-full  justify-between'>
                <div className='flex flex-col  gap-2'>
                    <h1 className='text-gray-500 text-4xl font-bold'>{post[0].title}</h1>
                    <p className='text-gray-500 text-xl font-semibold'>Writer: {post[0].username}</p>
                    <p className='text-gray-500 text-xl font-semibold'>Category: {post[0].category} </p>
                    <p className='text-gray-500 text-md '>{post[0].description}</p>
                    <p className='text-gray-500 text-md '>
                        <span>Created On : </span> {post[0].date} </p>
                
            
                </div>
                <div className='flex flex-col gap-3 text-2xl'>
                    <Link to={`/update/${id}`}>
                        <FaEdit  />
                    </Link>
                    
                        <MdDelete onClick={()=>{handleDelete()}} className='text-red-500 '/>
                    
                </div>
            </div>
            
            
            
        </div>
    )
}
