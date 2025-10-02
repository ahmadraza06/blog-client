import React from 'react'
import { categories } from '../../constants/data'
import { Link, useSearchParams } from 'react-router-dom'

export const Categories = () => {

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category')?searchParams.get('category') : 'All';

  return (
    <div className='w-1/4 bg-gray-600 flex flex-col items-center'>
        <Link to={`/create/?category=${category}`}> 
        <button type="button" 
        className="text-white   bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
            Create Blog</button>
        </Link>

            <table className="w-full border-collapse border border-gray-500 max-w-xl  mx-auto">
            <thead>
                <tr className="bg-gray-500 text-white">
                <th className="py-2 px-4 text-left"><Link to={'/'}>All Categories</Link></th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category)=>{
                    return <tr key={category.id} className="bg-white border-b border-gray-500">
                    <td className="py-2 px-4"><Link to={`/?category=${category.type}`} >{category.type}</Link></td>
                </tr>
                })}
                
                
            </tbody>
            </table>
        </div>
  )
}
