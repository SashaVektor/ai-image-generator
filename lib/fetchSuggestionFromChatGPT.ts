const fetchSuggestionFromChatGPT = () => fetch("/api/suggestions", {
    cache: "no-store"
})
    .then(res => res.json())


export default fetchSuggestionFromChatGPT