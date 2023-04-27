export async function GET(req: Request) {
    const res = await fetch("https://ai-image-generator-avektor.azurewebsites.net/api/getimages", {
        cache: "no-store"
    })

    const blob = await res.blob();
    
    const textData = await blob.text();

    const data = JSON.parse(textData);

    return new Response(JSON.stringify(data), {
        status: 200,
    });
}