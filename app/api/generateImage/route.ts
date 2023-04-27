import { NextResponse } from "next/server";

export async function POST (req: Request) {
    const response = await req.json();
    const prompt = response.prompt;

    const res = await fetch("https://ai-image-generator-avektor.azurewebsites.net/api/generateimage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({prompt})
    })

    const textData = await res.text();

    return NextResponse.json(textData)
}