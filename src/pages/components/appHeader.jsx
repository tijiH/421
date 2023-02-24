import React from 'react'
import Router from 'next/router'

const AppHeader = () => {
    return (
        <div className="header justify-content-between select-none">
            <i className='pi pi-arrow-left cursor-pointer' onClick={() => Router.back()}/>
            <div className='flex'>
                <h1 className="header-title cursor-pointer" onClick={() => Router.push('/')}>421</h1>
                <p className="header-by mr-2 mt-6">by Kush Crew</p>
            </div>
            <div className=''></div>
        </div>
    );
}

export default AppHeader;