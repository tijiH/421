import React from 'react'
import Link from 'next/link'
import Router from 'next/router';

const AppFooter = () => {
    
    return (
        <div className="footer footer-border">
            <p className='underline' onClick={() => Router.push('/about')}>About</p>
        </div>
    );
}

export default AppFooter;