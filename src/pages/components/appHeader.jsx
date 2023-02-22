import React from 'react'
import Router from 'next/router'

const AppHeader = () => {
    const handleClick = () => {
        Router.push('/')
    }

    return (
        <div className="header justify-content-between select-none">
            <i className='pi pi-arrow-left' onClick={handleClick}/>
            <div className='flex'>
                <h1 className="header-title cursor-pointer">421</h1>
                <p className="header-by mr-2 mt-6">by Kush Crew</p>
            </div>
            <div className=''></div>
        </div>
    );
}

export default AppHeader;