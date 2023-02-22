import React from 'react'
import Router from 'next/router'

const AppHeader = () => {

    const handleClick = (e) => {
        console.log(e.target.id)
        console.log("click")
        Router.push('/')
    }

    return (
        <div className="header justify-content-center select-none"> 
            <h1 className="header-title cursor-pointer" onClick={handleClick}>421</h1>
            <p className="header-by mr-2 mt-5">by Kush Crew</p>
        </div>
    );
}

export default AppHeader;