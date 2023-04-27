import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className='flex justify-between p-5 sticky top-0 bg-white z-50 shadow-sm'>
            <div className='flex items-center space-x-2'>
                <Image
                    src="https://links.papareact.com/4t3"
                    alt='logo'
                    height={30}
                    width={30}
                />
                <div>
                    <h1 className='font-bold'>
                        The Alex <span className='text-violet-500'>AI</span> Image
                        Generator
                    </h1>
                    <h2 className='text-xs'>
                        Powered by DALLE 2, Chat GPT & Microsoft Azure!
                    </h2>
                </div>
            </div>
            <div className='flex text-xs md:text-base divide-x items-center text-gray-500'>
                <Link 
                className='px-2 font-light text-right'
                href="https://avektor-portfolio.netlify.app/">
                    Visit my website
                </Link>
                <Link 
                className='px-2 font-light '
                href="https://github.com/SashaVektor">
                    Visit my github
                </Link>
            </div>
        </header>
    )
}

export default Header
