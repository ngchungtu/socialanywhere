"use client"
import React, { useEffect, useState } from 'react'
import '@/styles/post-status.css'
// import axios from 'axios'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'

const PostStatus = () => {
    const [contentPost, setContentPost] = useState("")
    const [attachment, setAttachment] = useState("");
    const [selectedImage, setSelectedImage] = useState();

    const { data: session } = useSession()
    const { mutate } = useSWR();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // await axios.post("/api/posts", data)
        try {
            if (contentPost) {
                await fetch("/api/posts", {
                    method: "POST",
                    body: JSON.stringify({
                        content: contentPost,
                        image: attachment ? attachment : "",
                        username: session?.user?.name
                    }),
                });
                console.log('success post!');
                mutate()
                setContentPost("")
                setAttachment("")
            } else {
                console.log('error post!');
            }
        } catch (error) {
            console.log('err when posted!');
            mutate()
        }
    }

    // useEffect(()=>{
    //     console.log('attachment', attachment);
    // },[attachment])

    return (
        <div>
            <div className='post-status-container'>
                <form onSubmit={handleSubmit}>
                    <textarea className='post-content' rows="5" cols="50" placeholder='Bạn đang nghĩ gì...' onChange={(e) => setContentPost(e.target.value)} />
                    <div className='post-form-action'>

                        <button>Đăng <i className="ri-send-plane-fill"></i></button>

                        <div className='post-choose-img'>
                            <label className='label-upload-img' htmlFor="inpfile">Chọn ảnh
                                <i className="ri-folder-image-fill"></i>
                            </label>

                            <input
                                id='inpfile'
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    uploadImage(e);
                                }}
                            />
                        </div>
                    </div>

                    {
                        attachment && (
                            <>
                                <img src={attachment} className='post-base-choose-img' alt="profile-img" />
                                {selectedImage && (
                                    <div className='post-base-choose-img_item'>
                                        <img
                                            src={URL.createObjectURL(selectedImage)}
                                            alt="Thumb"
                                        />
                                        <button onClick={() => removeSelectedImage()}>
                                            Xóa ảnh <i className="ri-close-circle-fill"></i>
                                        </button>
                                    </div>
                                )}
                            </>
                        )
                    }
                </form>
            </div>
        </div>
    )
}

export default PostStatus