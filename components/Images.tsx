"use client"
import fetchImage from '@/lib/fetchImages'
import Image from 'next/image'
import React from 'react'
import useSWR from "swr"

interface ImageInterface {
    name: string
    url: string
}

const Images = () => {
    const { data: images, isLoading, mutate: refreshImages, isValidating } = useSWR(
        "api/getImages",
        fetchImage,
        {
            revalidateOnFocus: false
        }
    )

    return (
        <div>
            <button onClick={() => refreshImages(images)}
            className='fixed bottom-10 right-10 bg-violet-400/90 text-white px-5 y-3 rounded-md hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 font-bold z-20'
            >
                {!isLoading && isValidating ? "Refreshing..." : "Refresh Images"}
            </button>
            {isLoading && <p className='animate-pulse text-center pb-7 font-extralight'>
                Loading <span className='text-violet-400'>AI</span>{" "}
                Generated Images...
            </p>}
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-5 md:px-10'>
                {images?.imageUrls?.map((image: ImageInterface, i: number) => (
                    <div key={image.name}
                        className={`relative cursor-help 
                    hover:scale-[103%] transition-transform duration-200 ease-in-out
                    ${i === 0 ? "md:col-span-2 md:row-span-2" : ""
                            }`}
                    >
                        <div className='absolute w-full h-full flex justify-center items-center bg-white opacity-0 hover:opacity-80 transition-opacity duration-200 z-10'>
                            <p className='text-center font-light text-lg p-5'>
                                {image.name.split("_").shift()?.toString().split(".").shift()}
                            </p>
                        </div>
                        <Image
                            alt={image.name}
                            src={image.url}
                            height={800}
                            width={800}
                            className='w-full rounded-sm shadow-2xl drop-shadow-lg -z-10'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Images
