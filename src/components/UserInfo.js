"use client"
import '@/styles/user-info.css'
import React, { useEffect, useState } from 'react'
import useOnlineStatus from '@/components/hook/useOnlineStatus'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import Loading from './common/Loading'

const UserInfo = () => {
    const [loading, setLoading] = useState(false)
    const { status, data: session } = useSession()
    const [statusOnlOff, setStatusOnlOff] = useState(false)
    const checkOnline = useOnlineStatus()
    const author = session?.user

    useEffect(() => {
        if (checkOnline) {
            setStatusOnlOff(true)
        } else {
            setStatusOnlOff(false)
        }
    }, [checkOnline])

    const handleSignOut = () => {
        try {
            setLoading(true)
            signOut()
            setLoading(false)
        } catch (error) {
            console.log('some error here: ', error);
            setLoading(false)
        }
    }
    return (
        <div className='user-info-container'>
            {
                loading
                    ? <div className='user-info-loading'>
                        <Loading />
                    </div>
                    : <>
                        <div className='user-info'>
                            <div className='user-info-img'>
                                <img src={`${author?.image}`} alt="" />
                                <div className='user-status-connection'>
                                    {
                                        statusOnlOff ? <div className='status-connection online'></div> : <div className='status-connection offline'></div>
                                    }
                                </div>
                            </div>
                            <div></div>
                            <div className='user-info-name'>
                                <Link href={'/profile'}>{author?.name}</Link>
                            </div>
                        </div>
                        {
                            status === 'authenticated'
                            && <div className='user-info-action'>
                                <input type="button" value="Đăng xuất" className='button-logout' onClick={() => handleSignOut()} />
                            </div>
                        }
                    </>
            }
        </div>
    )
}

export default UserInfo