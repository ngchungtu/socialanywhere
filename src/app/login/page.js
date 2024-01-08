"use client"
import React, { useState } from 'react'
import '@/styles/login.css'
import Image from 'next/image'
import Loading from '@/components/common/Loading'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import GoogleLoginButton from '@/components/GoogleLoginButton'
import Dashboard from '@/app/dashboard/page'
import { DashboardContext } from '@/components/hook/context/Dashboard'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const { status, data: session } = useSession()
    const author = session?.user

    const router = useRouter()

    const onSubmitLogin = () => {
        if (userName === 'a' && password === '1') {
            router.replace(`/dashboard`)
        } else {
            setLoading(false)
            console.log('error to login');
        }
    }

    if (status === 'authenticated') {
        return (
            <DashboardContext>
                <Dashboard author={author} />
            </DashboardContext>
        )
    } else {
        return (
            <div className='login-container'>
                <div className='login-bg'>
                    <Image src='/bg-login.jpg' alt='' className={loading ? 'login-img-bg_loading' : 'login-img-bg'} fill />
                </div>
                <div className='form'>
                    {
                        loading
                            ? <div className='login-loading'><Loading /></div>
                            : <>
                                {/* <form className='login-form' onSubmit={(e) => {
                                    e.preventDefault();
                                    onSubmitLogin();
                                }}>
                                    <input type='text' placeholder='Name...' onChange={(e) => setUserName(e.target.value)} value={userName} />
                                    <input type='text' placeholder='Password...' onChange={(e) => setPassword(e.target.value)} value={password} />
                                    <button type='submit' >Đăng nhập <i className="ri-login-box-fill"></i></button>
                                    <span>
                                        <Link href='/dashboard'>Dashboard</Link>
                                        <Link href='/contact'>Contact</Link>                                     
                                    </span>
                                </form> */}
                                <GoogleLoginButton />
                            </>
                    }
                </div>
            </div>
        )
    }
}

export default Login