export async function GET (req: Request) {
    const res = await fetch("https://ai-image-generator-avektor.azurewebsites.net/api/getchatgptsuggestion", {
        cache: "no-store"
    })

    const textData = await res.text();

    return new Response(JSON.stringify(textData.trim()), {
        status: 200
    })
}