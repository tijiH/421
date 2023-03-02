import Image from 'next/image'

const About = () => {

    return (
        // <div className="flex flex-column align-items-center">
        <div className="text-center mt-8">
            <p>Fait par les BGs</p>
            <h2>Tiji et El Iot</h2>
            <Image className='mt-8' priority src="/logo_kc.png" alt='logo' width={200} height={200}/>
            <p>Partenaire principale</p>
        </div>
    )
}

export default About;