const fetchImage = async () => {
    
    const res = await fetch("/api/getImages", {
        cache: "no-store"
    })
    const data = await res.json();
    return data
}

export default fetchImage