import React from 'react'
import '@/styles/navbar.css'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className='nav-container'>
            <div className='nav-logo'>
                <Link href='/'>
                <img src='./logo.png' alt='logo'/>
                </Link>
            </div>
            <div className='nav-items'>
                <ul>
                    <li><i className="ri-home-smile-fill"></i> Home</li>
                    <li><i className="ri-server-fill"></i> Product</li>
                    <li><i className="ri-contacts-fill"></i> Contact</li>
                    <li><i className="ri-list-check-2"></i> Policy</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar