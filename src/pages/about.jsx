import Image from 'next/image'
import { useRouter } from 'next/router'

const About = () => {
    const router = useRouter()

    return (
        <div className="h-screen pb-8 flex flex-column justify-content-center align-items-center">
            <p>Fait par les BGs</p>
            <h2>Tiji et El Iot</h2>
            <Image className='' src="/logo_kc.png" alt='logo' width={300} height={300}/>
            <button className="p-button btn btn-primary btn-lg mt-8" onClick={(e) => {router.push("/")}}>Go to main menu</button>
        </div>
    )
}

export default About;