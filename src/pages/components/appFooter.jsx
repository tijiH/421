import React from 'react'
import Link from 'next/link'

const AppFooter = () => {
    
    return (
        <div className="footer footer-border">
            <Link href='/about' className=''>About</Link>
        </div>
    );
}

export default AppFooter;