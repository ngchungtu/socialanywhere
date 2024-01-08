import React from 'react'
import Post from './Post'

const PostList = ({ posts, author }) => {
  // console.log('posts', posts);

  return (
    <div className="post-list-container">
      {
        posts?.map((item, index) => (
          <Post key={index} postContent={item} author={author}/>
        ))
      }
    </div>
  )
}

export default PostList