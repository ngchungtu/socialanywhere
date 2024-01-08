"use client"
import React, { useState } from 'react'
import '@/styles/user-profile.css'
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import PopupSettingPost from '@/components/PopupSettingPost';
import { DashboardContext } from '@/components/hook/context/Dashboard'
import Loading from '@/components/common/Loading';

const page = () => {
  const [postToUpdate, setPostToUpdate] = useState()
  const [activePopup, setActivePopup] = useState(false)
  const [loading, setLoading] = useState(false)

  const { data: session } = useSession()
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.user?.name}`,
    fetcher
  );
  const author = session?.user

  // console.log('data', data);
  // console.log('status', status);
  // console.log('author', author);

  const handleEditPost = (data) => {
    // console.log('post', data);
    setLoading(true)
    setPostToUpdate(data)
    setActivePopup(true)
  }

  const handleClosePopupEdit = () => {
    setLoading(false)
    setActivePopup(false)
  }

  return (
    <DashboardContext>
      <div className={activePopup ? "c-user-postList_container-hidden" : "c-user-postList_container"}>
        <div>
          <PopupSettingPost
            activePopup={activePopup}
            handleClosePopupEdit={handleClosePopupEdit}
            postToUpdate={postToUpdate} />
        </div>
        <div className='c-user-container'>
          <div className='c-user-header'>
            <div className='c-user_img'>
              <img src={author?.image} alt={author?.name} />
            </div>
            <div className='c-user_name'>
              <h5>{author?.name}</h5>
              <small>{author?.email}</small>
            </div>
          </div>
          {
            loading
              ? <Loading />
              : <>
                {
                  data?.map((item) => (
                    <div className='c-user_post-container' key={item._id}>
                      <div className='c-user_post-header'>
                        <div className='c-user_post-img'>
                          <img src={author?.image} alt={author?.name} />
                        </div>
                        <div className='c-user_post-title'>
                          <h5 className='c-user_post-name'>{author?.name}</h5>
                          <small className='c-user_post-time'>{item.createdAt}</small>
                        </div>
                        <div className='c-user-post-setting'>
                          <i className="ri-more-2-fill" onClick={() => handleEditPost(item)}></i>
                        </div>
                      </div>

                      <div className='c-user_post-content'>
                        <div className='c-user_post-content-detail'>
                          <h5>{item.title}</h5>
                          <p>{item.content}</p>
                        </div>
                        <div className='c-user_post-content-img'>
                          <img src={item.image} alt={item.username} />
                        </div>
                      </div>
                    </div>
                  ))
                }
              </>
          }
        </div>
      </div>
    </DashboardContext>
  )
}

export default page