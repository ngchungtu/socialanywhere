"use client"
import React, { useEffect, useState } from 'react'
import '@/styles/popup-post-setting.css'
import Modal from 'react-modal';
import useSWR from 'swr';
import axios from 'axios';
import Loading from './common/Loading';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const customStyleLoading = {
  content: {
    ...customStyles.content,
    border: 'none',
    background: 'none',
    inset: 'unset',
  },
};

const PopupSettingPost = ({ handleClosePopupEdit, activePopup, postToUpdate }) => {
  // console.log(postToUpdate);
  const { mutate } = useSWR();
  const [contentNewUpdate, setContentNewUpdate] = useState("")
  const [attachment, setAttachment] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Modal.setAppElement('body');
  }, [])

  const handleUpdatePost = async (id) => {
    try {
      const newPost = {
        content: contentNewUpdate ? contentNewUpdate : postToUpdate?.content,
        image: attachment ? attachment : postToUpdate?.image
      }
      if (id) {
        setLoading(true)
        await axios.put(`/api/posts/${id}`, newPost)
        console.log('post update successfully!');
        setLoading(false)
        window.location.reload()
        mutate()
      } else {
        console.log('error to update post');
        setLoading(false)
      }
    } catch (error) {
      console.log('err', error);
      setLoading(false)
      mutate()
    }
  }

  /* #region select or cancel choose img */
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setAttachment(base64);

    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
    setAttachment("")
  };
  /* #endregion */

  const handleDeletePost = async (id) => {
    try {
      if (id) {
        setLoading(true)
        // await fetch(`/api/posts/${id}`, {
        //   method: "DELETE",
        // })
        await axios.delete(`/api/posts/${id}`)
        setLoading(false)
        mutate()
        window.location.reload()
        console.log('post delete successfully, id:', id);
      }
    } catch (error) {
      setLoading(false)
      console.log('error delete post', error);
    }
  }

  return (
    <Modal
      isOpen={activePopup}
      style={loading ? customStyleLoading : customStyles}
      contentLabel="Example Modal"
    >
      <div className="popup-setting-container">
        <div className="popup-close-action">
          <button onClick={handleClosePopupEdit}>Đóng <i className="ri-close-circle-line"></i></button>
        </div>


        <div className="popup-setting-content">
          {
            loading
              ? <div className="popup-setting-content-loading">
                <Loading />
              </div>
              : <>
                <form className='postToUpdate-container'>
                  <textarea rows="4" cols="50" placeholder={postToUpdate?.content} className='postToUpdate-content' onChange={(e) => setContentNewUpdate(e.target.value)} />
                  <div className='postToUpdate-img'>
                    <img src={postToUpdate?.image} alt={postToUpdate?.username} />
                  </div>

                  <div className='post-choose-img'>
                    <div className='post-choose-img-action'>
                      <label className='label-upload-img' htmlFor="inpfile">Chọn ảnh mới
                        <i className="ri-folder-image-fill"></i>
                      </label>
                    </div>

                    <input
                      id='inpfile'
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        uploadImage(e);
                      }}
                    />
                    {
                      attachment && (
                        <>
                          <img src={attachment} className='post-base-choose-img' alt="profile-img" />
                          {selectedImage && (
                            <div className='imgToUpdate'>
                              <span>Ảnh mới <i className="ri-file-add-line"></i></span>
                              <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Thumb"
                              />
                              <div className='remove-img'>
                                <button onClick={removeSelectedImage}>
                                  Xóa ảnh <i className="ri-close-circle-fill"></i>
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      )
                    }
                  </div>

                  <div className='postToUpdate-action-button'>
                    <input type="button" value="Cập nhật" className='popup-post-update-button' onClick={() => handleUpdatePost(postToUpdate._id)} />
                    <input type="button" value="Xóa bài viết" className='popup-post-delete-button' onClick={() => handleDeletePost(postToUpdate._id)} />
                  </div>
                </form>
              </>
          }

        </div>
      </div>
    </Modal>
  )
}

export default PopupSettingPost