import Image from 'next/image'
import Router from 'next/router'

const About = () => {

    return (
        <div className="h-screen pb-8 flex flex-column justify-content-center align-items-center">
            <p>Fait par les BGs</p>
            <h2>Tiji et El Iot</h2>
            <Image priority src="/logo_kc.png" alt='logo' width={300} height={300}/>
        </div>
    )
}

export default About;