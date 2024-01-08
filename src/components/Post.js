"use client"
import React from 'react'
import '@/styles/post.css';

const Post = ({ postContent, author }) => {
  // console.log('item', postContent);
  // console.log('author', author);

  return (
    <div className='post-container'>

      <div className="post-header">
        <div>
          <div className='post-user-img'>
            <img src={postContent.image} alt={postContent.title} />
          </div>
          <div className='post-user-info'>
            <h5 className='post-user-name'>{postContent.username}</h5>
            <small className='post-time'>{postContent.createdAt}</small>
          </div>
        </div>
        {/* <div>
          <i className="ri-more-2-fill"></i>
        </div> */}
      </div>

      <div className='post-content'>
        <div className='post-title'>
          <p>{postContent.content}</p>
        </div>
        <div className='post-img'>
          <img src={postContent.image} alt={postContent.title} />
        </div>
      </div>

    </div>
  )
}

export default Post