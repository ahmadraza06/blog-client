import React from 'react'
import { Banner } from '../Banner/Banner'
import { Categories } from './Categories'
import { Posts } from '../post/Posts'

export const Homepage = () => {
  return (
    <div className=''>
      <Banner/>
      <div className='flex '>
      <Categories/>
      <Posts/>
      </div>
    </div>
  )
}
