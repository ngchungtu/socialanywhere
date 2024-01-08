"use client"
import UserInfo from '@/components/UserInfo';
import Navbar from '@/components/header/Navbar';
import React, { createContext } from 'react';
import '@/styles/dashboard.css'

const Context = createContext()

function DashboardContext({ children }) {
    return (
        <Context.Provider value={""}>
            <div className="holy-grail-grid">
                <div className="main-content">
                    {children}
                </div>

                <div className="left-sidebar"><Navbar /></div>
                <div className="right-sidebar"><UserInfo /></div>
            </div>
        </Context.Provider>
    )
}

export {
    Context, DashboardContext
}