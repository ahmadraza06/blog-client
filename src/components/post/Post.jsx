import React from 'react'
import { shortString } from '../../utils/common-utils'

export const Post = ({post}) => {
    
    return (

    <div className='min-w-60 w-70 h-90 border rounded-2xl '>

        <img className='border w-full h-40  rounded-2xl' src={post.picture} alt="post" />
        <div className='p-2 flex flex-col justify-center w-full items-center gap-2'>
            <h2 className='font-bold text-2xl text-gray-500 text-center'>{shortString(post.title,10) }</h2>
            <h3 className='text-gray-700 text-sm'>{post.category}</h3>
            <p className='text-gray-600 '>{shortString(post.description,50)}</p>
        </div>
    </div>
  )
}
