"use client"
import React, { useEffect, useState } from 'react'

const useOnlineStatus = () => {
    const [online, setOnline] = useState(
        typeof window !== "undefined" ? window.navigator.onLine : true
    );

    useEffect(() => {
        // create event handler
        const handleStatusChange = () => {
            setOnline(navigator.onLine);
        };

        // listen for online and ofline event
        window.addEventListener("online", handleStatusChange);
        window.addEventListener("offline", handleStatusChange);

        // clean up to avoid memory-leak
        return () => {
            window.removeEventListener("online", handleStatusChange);
            window.removeEventListener("offline", handleStatusChange);
        };
    }, []);

    return online;
}

export default useOnlineStatus