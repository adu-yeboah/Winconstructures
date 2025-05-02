import React from 'react'
import Sidebar from '../components/sidebar';
export default function Homelayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Sidebar />
            <div className='ml-52'>
                {children}
            </div>
        </div>
    )
}
