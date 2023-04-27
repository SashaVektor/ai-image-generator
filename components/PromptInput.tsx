"use client"
import fetchImage from '@/lib/fetchImages'
import fetchSuggestionFromChatGPT from '@/lib/fetchSuggestionFromChatGPT'
import React, { useState } from 'react'
import useSWR from "swr"
import toast from "react-hot-toast"

const PromptInput = () => {
    const [input, setInput] = useState<string>("")

    const { data: suggestions, isLoading, mutate, isValidating } = useSWR(
        "/api/suggestions",
        fetchSuggestionFromChatGPT, {
        revalidateOnFocus: false
    })

    const {mutate: updateImages} = useSWR("api/getImages", fetchImage, {
        revalidateOnFocus: false
    })

    const submitPropmp = async (useSuggestion?: boolean) => {
        const inputPrompt = input;
        setInput("")

        const p = useSuggestion ? suggestions : inputPrompt

        const notificationPrompt = p
        const notificationPromptShort = `${notificationPrompt.slice(0,17)}...`

        const notification = toast.loading(`DallE is creating: ${notificationPromptShort}`)

        const res = await fetch("/api/generateImage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: p })
        })

        const data = await res.json();

        if(data.error) {
            toast.error(data.error, {
                id: notification
            })
        } else {
            toast.success(`Your AI Art has been Generated!`, {
                id: notification
            })
        }

        updateImages();
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await submitPropmp()
    }



    const loading = isLoading || isValidating

    return (
        <div className='m-10'>
            <form className='flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x'
                onSubmit={handleSubmit}>
                <textarea
                    className='resize-none flex-1 p-4 outline-none rounded-md'
                    placeholder={(loading && "Chat GPT is thinking of a suggestion...") || suggestions || 'Enter a prompt...'}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type='submit'
                    className={`p-4 ${input ? "bg-violet-500 text-white transition-colors duration-200"
                        : "text-gray-300 cursor-not-allowed"}`}
                    disabled={!input}

                >
                    Generate
                </button>
                <button
                    className='p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400'
                    type='button'
                    onClick={() => submitPropmp(true)}
                >
                    Use Suggestion
                </button>
                <button
                    className='p-4 text-violet-400 bg-white border-none transition-colors duration-200 rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold'
                    type='button'
                    onClick={mutate}
                >
                    New Suggestion
                </button>
            </form>
            {input && (
                <p className='italic pt-2 pl-2 font-light'>
                    Suggestion: {" "}
                    <span className='text-violet-500'>
                        {loading ? 'Chat GPT is thinking' : suggestions}
                    </span>
                </p>
            )}
        </div>
    )
}

export default PromptInput
