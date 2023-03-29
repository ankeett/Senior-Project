import React from 'react'
import Post from './Post'
import {} from '../../actions/postAction'

const Feed = () => {
  return (
    <div className='mt-3 flex flex-col gap-3'>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
    </div>
  )
}

export default Feed