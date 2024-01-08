"use client"
import '@/styles/dashboard.css'
import PostStatus from '@/components/PostStatus'
import PostList from '@/components/PostList'
import { useEffect, useState } from 'react'
import axios from 'axios'
// import { useSession } from 'next-auth/react'


const page = ({ author }) => {
  const [posts, setPosts] = useState([])
  // const { data: session } = useSession()
  // const author = session?.user

  const getPosts = async () => {
    try {
      const res = await axios.get(`/api/posts`).then((response) => (
        console.log('data', response.data),
        setPosts(response.data)
        // console.log(response.data)
      ));
      return res
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (

    // <div className="holy-grail-grid">
    //   <div className="main-content">
    //     <div className='dashboard-content'>
    //       <div className='dashboard-content_post'>
    //         <PostStatus />
    //       </div>
    //       <div className='dashboard-content_post-list'>
    //         <PostList posts={posts} author={author} />
    //         <AppContext/>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="left-sidebar"><Navbar /></div>
    //   <div className="right-sidebar"><UserInfo /></div>
    // </div>

    <div className='dashboard-content'>
        <div className='dashboard-content_post'>
          <PostStatus />
        </div>
        <div className='dashboard-content_post-list'>
          <PostList posts={posts} author={author} />
        </div>
      </div>
  )
}

export default page