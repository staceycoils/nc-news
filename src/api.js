export function fetchApi(extension) {
    return fetch(`https://nc-news-se.herokuapp.com/api/${extension}/`)
        .then(response => {
            return response.json()})

}